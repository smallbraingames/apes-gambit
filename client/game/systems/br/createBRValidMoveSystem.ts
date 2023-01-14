import { EntityIndex, getComponentValueStrict } from "@latticexyz/recs";
import { Network, PieceType } from "../../../network/types";

import { Coord } from "@latticexyz/utils";
import { Game } from "../../types";
import { Subscription } from "rxjs";
import addTileOverlay from "../../utils/addTileOverlay";
import { defineComponentSystemUnsubscribable } from "../../utils/defineComponentSystemUnsubscribable";
import getValidMoves from "../../utils/getValidMoves";

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
    gameObjectRegistry,
    scenes: {
      Main: {
        phaserScene,
        maps: {
          Main: { tileWidth, tileHeight },
        },
      },
    },
    components: { ActivePiece },
  } = game;

  const setValidMoveOverlays = (pieceType: PieceType, piecePosition: Coord) => {
    let validMoveGroup = gameObjectRegistry.get(BR_VALID_MOVE_GROUP);
    if (!validMoveGroup) validMoveGroup = phaserScene.add.group();

    // Clear the valid move group
    validMoveGroup.clear(true, true);

    const validMoves = getValidMoves(pieceType, piecePosition);
    validMoves.forEach((potentialMove) => {
      validMoveGroup!.add(
        addTileOverlay(potentialMove, phaserScene, tileWidth, tileHeight)
      );
    });
    gameObjectRegistry.set(BR_VALID_MOVE_GROUP, validMoveGroup);
  };

  const piecePositionSubscription = defineComponentSystemUnsubscribable(
    world,
    PiecePosition,
    (update) => {
      const position = update.value[0];
      const activePieceEntityIndex = getComponentValueStrict(
        ActivePiece,
        godEntityIndex
      ).value as EntityIndex;
      if (!position || update.entity !== activePieceEntityIndex) return;
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
      const activePieceEntityIndex = getComponentValueStrict(
        ActivePiece,
        godEntityIndex
      ).value as EntityIndex;
      if (!pieceType || update.entity !== activePieceEntityIndex) return;
      const position = getComponentValueStrict(PiecePosition, update.entity);
      setValidMoveOverlays(pieceType, position);
    },
    { runOnInit: true }
  );

  return [piecePositionSubscription, pieceTypeSubscription];
};

export default createBRValidMoveSystem;
