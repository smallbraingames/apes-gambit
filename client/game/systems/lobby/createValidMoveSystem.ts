import {
  EntityIndex,
  getComponentValue,
  getComponentValueStrict,
} from "@latticexyz/recs";
import { Network, PieceType } from "../../../network/types";
import { TILE_HEIGHT, TILE_OVERLAY_COLOR, TILE_WIDTH } from "../../constants";

import { Coord } from "@latticexyz/utils";
import { Game } from "../../types";
import { Subscription } from "rxjs";
import addTileOverlay from "../../utils/addTileOverlay";
import { defineComponentSystemUnsubscribable } from "../../utils/defineComponentSystemUnsubscribable";
import getValidMoves from "../../utils/getValidMoves";

const VALID_MOVE_GROUP = "valid-moves";

const createValidMoveSystem = (
  network: Network,
  game: Game
): Subscription[] => {
  const {
    world,
    godEntityIndex,
    components: { PiecePosition, PieceType },
  } = network;

  const {
    objectRegistry,
    scenes: { Main },
    components: { ActivePiece },
  } = game;

  const setValidMoveOverlays = (pieceType: PieceType, piecePosition: Coord) => {
    let validMoveGroup: Phaser.GameObjects.Group;
    if (!objectRegistry.has(godEntityIndex, VALID_MOVE_GROUP)) {
      validMoveGroup = Main.add.group();
    } else {
      validMoveGroup = objectRegistry.get(
        godEntityIndex,
        VALID_MOVE_GROUP
      ) as Phaser.GameObjects.Group;
    }

    // Clear the valid move group
    validMoveGroup.clear(true, true);

    const validMoves = getValidMoves(pieceType, piecePosition);
    validMoves.forEach((potentialMove) => {
      validMoveGroup!.add(
        addTileOverlay(
          potentialMove,
          Main,
          TILE_WIDTH,
          TILE_HEIGHT,
          TILE_OVERLAY_COLOR
        )
      );
    });
    objectRegistry.set(godEntityIndex, VALID_MOVE_GROUP, validMoveGroup);
  };

  const piecePositionSubscription = defineComponentSystemUnsubscribable(
    world,
    PiecePosition,
    (update) => {
      const position = update.value[0];
      const activePiece = getComponentValue(ActivePiece, godEntityIndex)
        ?.value as EntityIndex | undefined;
      if (!position || update.entity !== activePiece) return;
      const pieceType: PieceType = getComponentValueStrict(
        PieceType,
        update.entity
      ).value;
      setValidMoveOverlays(pieceType, position);
    },
    { runOnInit: true }
  );

  const pieceTypeSubscription = defineComponentSystemUnsubscribable(
    world,
    PieceType,
    (update) => {
      const pieceType: PieceType | undefined = update.value[0]?.value;
      const activePiece = getComponentValue(ActivePiece, godEntityIndex)
        ?.value as EntityIndex | undefined;
      if (pieceType === undefined || update.entity !== activePiece) return;
      const position = getComponentValueStrict(PiecePosition, update.entity);
      setValidMoveOverlays(pieceType, position);
    },
    { runOnInit: true }
  );

  return [piecePositionSubscription, pieceTypeSubscription];
};

export default createValidMoveSystem;
