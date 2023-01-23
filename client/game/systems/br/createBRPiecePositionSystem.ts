import { EntityIndex, getComponentValueStrict } from "@latticexyz/recs";
import {
  MOVE_ANIMATION_DURATION,
  PIECE_X_OFFSET,
  PIECE_Y_OFFSET,
} from "../../constants";
import {
  movePieceAnimation,
  repeatIdleAnimation,
} from "../../utils/pieceAnimations";
import { tileCoordToPixelCoord, tween } from "@latticexyz/phaserx";

import { Game } from "../../types";
import { Network } from "../../../network/types";
import { Subscription } from "rxjs";
import { defineComponentSystemUnsubscribable } from "../../utils/defineComponentSystemUnsubscribable";
import isActiveGamePiece from "../../utils/isActiveGamePiece";
import tweenCamera from "../../utils/tweenCamera";

const createBRPiecePositionSystem = (
  network: Network,
  game: Game
): Subscription[] => {
  const {
    world,
    godEntityIndex,
    components: { PiecePosition },
  } = network;

  const {
    gameEntity,
    components: { ActivePiece },
    scenes: {
      Main: {
        objectPool,
        camera,
        maps: { Main },
      },
    },
  } = game;

  const subscription = defineComponentSystemUnsubscribable(
    world,
    PiecePosition,
    (update) => {
      if (!isActiveGamePiece(update.entity, network, gameEntity!)) return;

      const position = update.value[0];
      const previousPosition = tileCoordToPixelCoord(
        update.value[1] ? update.value[1] : { x: 0, y: 0 },
        Main.tileWidth,
        Main.tileHeight
      );

      if (!position) {
        objectPool.remove(update.entity);
        return;
      }
      const object = objectPool.get(update.entity, "Sprite");
      const { x, y } = tileCoordToPixelCoord(
        position,
        Main.tileWidth,
        Main.tileHeight
      );

      const activePiece = getComponentValueStrict(ActivePiece, godEntityIndex)
        .value as EntityIndex;

      const pieceX = x + PIECE_X_OFFSET;
      const pieceY = y + PIECE_Y_OFFSET;
      console.log("SETTING THE THING");
      object.setComponent({
        id: PiecePosition.id,
        now: async (gameObject) => {
          await Promise.all([
            movePieceAnimation(
              gameObject,
              { x: pieceX, y: pieceY },
              {
                x: previousPosition.x + PIECE_X_OFFSET,
                y: previousPosition.y + PIECE_Y_OFFSET,
              }
            ),
            activePiece === update.entity
              ? tweenCamera(camera, Main, pieceX, pieceY)
              : async () => true,
          ]);
        },
        once: (gameObject) => {
          gameObject.setPosition(pieceX, pieceY);
          gameObject.setAngle(0);
          repeatIdleAnimation(gameObject, pieceX, pieceY);
        },
      });
    },
    { runOnInit: true }
  );

  return [subscription];
};

export default createBRPiecePositionSystem;
