import {
  EntityIndex,
  getComponentValueStrict,
  getEntitiesWithValue,
} from "@latticexyz/recs";
import { Network, PieceType } from "../../../network/types";
import { TILE_OVERLAY_COLOR, TILE_OVERLAY_TAKE_COLOR } from "../../constants";

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
      const pieceAtPosition = getEntitiesWithValue(
        PiecePosition,
        potentialMove
      );
      let color = TILE_OVERLAY_COLOR;
      if (pieceAtPosition.size > 0) color = TILE_OVERLAY_TAKE_COLOR;
      validMoveGroup!.add(
        addTileOverlay(potentialMove, phaserScene, tileWidth, tileHeight, color)
      );
    });
    gameObjectRegistry.set(BR_VALID_MOVE_GROUP, validMoveGroup);
  };

  const piecePositionSubscription = defineComponentSystemUnsubscribable(
    world,
    PiecePosition,
    () => {
      // On every piece position update, reset overlays for active piece
      // This is necessary since another piece might move into range
      const activePieceEntityIndex = getComponentValueStrict(
        ActivePiece,
        godEntityIndex
      ).value as EntityIndex;
      const piecePosition = getComponentValueStrict(
        PiecePosition,
        activePieceEntityIndex
      );
      const pieceType: PieceType = getComponentValueStrict(
        PieceType,
        activePieceEntityIndex
      ).value;
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
      setValidMoveOverlays(pieceType, position);
    },
    { runOnInit: true }
  );

  return [piecePositionSubscription, pieceTypeSubscription];
};

export default createBRValidMoveSystem;
