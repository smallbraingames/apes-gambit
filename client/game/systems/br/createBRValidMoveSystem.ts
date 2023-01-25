import {
  EntityIndex,
  getComponentValueStrict,
  getEntitiesWithValue,
} from "@latticexyz/recs";
import { Network, PieceType } from "../../../network/types";
import {
  TILE_HEIGHT,
  TILE_OVERLAY_COLOR,
  TILE_OVERLAY_TAKE_COLOR,
  TILE_WIDTH,
} from "../../constants";

import { Coord } from "@latticexyz/utils";
import { Game } from "../../types";
import { Subscription } from "rxjs";
import addTileOverlay from "../../utils/addTileOverlay";
import { defineComponentSystemUnsubscribable } from "../../utils/defineComponentSystemUnsubscribable";
import getValidMoves from "../../utils/getValidMoves";
import isActiveGamePiece from "../../utils/isActiveGamePiece";

const BR_VALID_MOVE_GROUP = "br-valid-moves";

const createBRValidMoveSystem = (
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
    gameEntity,
    scenes: { Main },
    components: { ActivePiece },
  } = game;

  const setValidMoveOverlays = (pieceType: PieceType, piecePosition: Coord) => {
    let validMoveGroup: Phaser.GameObjects.Group;
    if (!objectRegistry.has(godEntityIndex, BR_VALID_MOVE_GROUP)) {
      validMoveGroup = Main.add.group();
    } else {
      validMoveGroup = objectRegistry.get(
        godEntityIndex,
        BR_VALID_MOVE_GROUP
      ) as Phaser.GameObjects.Group;
    }

    // Clear the valid move group
    validMoveGroup.clear(true, true);

    const validMoves = getValidMoves(pieceType, piecePosition);
    validMoves.forEach((potentialMove) => {
      const pieceAtPosition = getEntitiesWithValue(
        PiecePosition,
        potentialMove
      );
      let color = TILE_OVERLAY_COLOR;
      if (!gameEntity)
        throw Error("Cannot set valid move overlays without a game entity ID");
      const pieceAtPositionInGame = [...pieceAtPosition].filter((piece) =>
        isActiveGamePiece(piece, network, gameEntity)
      );
      if (pieceAtPositionInGame.length > 0) color = TILE_OVERLAY_TAKE_COLOR;
      validMoveGroup!.add(
        addTileOverlay(potentialMove, Main, TILE_WIDTH, TILE_HEIGHT, color)
      );
    });
    objectRegistry.set(godEntityIndex, BR_VALID_MOVE_GROUP, validMoveGroup);
  };

  const piecePositionSubscription = defineComponentSystemUnsubscribable(
    world,
    PiecePosition,
    async () => {
      // On every piece position update, reset overlays for active piece
      // This is necessary since another piece might move into range
      const activePieceEntityIndex = getComponentValueStrict(
        ActivePiece,
        godEntityIndex
      ).value as EntityIndex;

      // If piece was just taken, remove overlays
      if (!gameEntity)
        throw Error("Cannot set valid move overlays without a game entity ID");
      if (!isActiveGamePiece(activePieceEntityIndex, network, gameEntity)) {
        objectRegistry.remove(godEntityIndex, BR_VALID_MOVE_GROUP);
        return;
      }
      const piecePosition = getComponentValueStrict(
        PiecePosition,
        activePieceEntityIndex
      );
      const pieceType: PieceType = getComponentValueStrict(
        PieceType,
        activePieceEntityIndex
      ).value;
      await new Promise((r) => setTimeout(r, 200));

      setValidMoveOverlays(pieceType, piecePosition);
    },
    { runOnInit: true }
  );

  const pieceTypeSubscription = defineComponentSystemUnsubscribable(
    world,
    PieceType,
    (update) => {
      const pieceType: PieceType | undefined = update.value[0]?.value;
      const activePieceEntityIndex = getComponentValueStrict(
        ActivePiece,
        godEntityIndex
      ).value as EntityIndex;
      if (!pieceType || update.entity !== activePieceEntityIndex) return;
      const position = getComponentValueStrict(PiecePosition, update.entity);
      // Only show after move appears
      setValidMoveOverlays(pieceType, position);
    },
    { runOnInit: true }
  );

  return [piecePositionSubscription, pieceTypeSubscription];
};

export default createBRValidMoveSystem;
