import { EntityIndex, getComponentValueStrict } from "@latticexyz/recs";
import { Network, PieceType } from "../../../network/types";
import { PIECE_X_OFFSET, PIECE_Y_OFFSET } from "../../constants";
import {
  movePieceAnimation,
  repeatIdleAnimation,
} from "../../utils/pieceAnimations";
import { tileCoordToPixelCoord, tween } from "@latticexyz/phaserx";

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
    components: { PiecePosition, PieceType },
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

      const pieceType: PieceType = getComponentValueStrict(
        PieceType,
        update.entity
      ).value;

      const isEnemy = activePiece != update.entity;

      const pieceX = x + PIECE_X_OFFSET;
      const pieceY = y + PIECE_Y_OFFSET;
      object.setComponent({
        id: PiecePosition.id,
        now: async (gameObject) => {
          await Promise.all([
            movePieceAnimation(
              gameObject,
              { x: pieceX, y: pieceY },
              pieceType,
              isEnemy
            ),
            !isEnemy
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
