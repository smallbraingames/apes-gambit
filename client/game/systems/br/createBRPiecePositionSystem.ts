import {
  EntityIndex,
  getComponentValueStrict,
  getEntitiesWithValue,
} from "@latticexyz/recs";
import { Network, PieceType } from "../../../network/types";
import { PIECE_X_OFFSET, PIECE_Y_OFFSET } from "../../constants";
import {
  getMoveAnimationDuration,
  loopPieceIdleAnimation,
  playMovePieceAnimation,
  playPieceAttackAnimation,
} from "../../utils/pieceAnimations";
import { tileCoordToPixelCoord, tween } from "@latticexyz/phaserx";

import { Coord } from "@latticexyz/utils";
import { Game } from "../../types";
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
    components: { PieceType },
  } = network;

  const {
    gameEntity,
    components: { ActivePiece, PiecePositionContext },
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
    PiecePositionContext,
    (update) => {
      if (!isActiveGamePiece(update.entity, network, gameEntity!)) return;
      const positionContext = update.value[0];

      if (!positionContext) {
        objectPool.remove(update.entity);
        return;
      }
      const object = objectPool.get(update.entity, "Sprite");
      const { x, y } = tileCoordToPixelCoord(
        positionContext,
        Main.tileWidth,
        Main.tileHeight
      );

      const activePiece = getComponentValueStrict(ActivePiece, godEntityIndex)
        .value as EntityIndex;

      const pieceType: PieceType = getComponentValueStrict(
        PieceType,
        update.entity
      ).value;

      const isEnemy = activePiece != update.entity;

      const pieceX = x + PIECE_X_OFFSET;
      const pieceY = y + PIECE_Y_OFFSET;

      object.setComponent({
        id: PiecePositionContext.id,
        now: async (gameObject) => {
          let moveAnimation;
          if (positionContext.pieceTaken !== undefined) {
            moveAnimation = playPieceAttackAnimation(
              gameObject,
              { x: pieceX, y: pieceY },
              pieceType,
              isEnemy
            );
          } else {
            moveAnimation = playMovePieceAnimation(
              gameObject,
              { x: pieceX, y: pieceY },
              pieceType,
              isEnemy
            );
          }
          const cameraAnimation = !isEnemy
            ? tweenCamera(
                camera,
                Main,
                pieceX,
                pieceY,
                getMoveAnimationDuration(
                  { x: pieceX, y: pieceY },
                  { x: gameObject.x, y: gameObject.y }
                )
              )
            : async () => true;
          await Promise.all([moveAnimation, cameraAnimation]);
        },
        once: (gameObject) => {
          gameObject.setPosition(pieceX, pieceY);
          gameObject.setAngle(0);
          loopPieceIdleAnimation(gameObject, pieceX, pieceY);
        },
      });
    },
    { runOnInit: true }
  );

  return [subscription];
};

export default createBRPiecePositionSystem;
