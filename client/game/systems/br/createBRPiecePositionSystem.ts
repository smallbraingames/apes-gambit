import { EntityIndex, getComponentValueStrict } from "@latticexyz/recs";
import {
  MOVE_ANIMATION_DURATION,
  PIECE_X_OFFSET,
  PIECE_Y_OFFSET,
} from "../../constants";
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

      object.setComponent({
        id: PiecePosition.id,
        now: async (gameObject) => {
          await Promise.all([
            tween({
              targets: gameObject,
              duration: MOVE_ANIMATION_DURATION,
              props: { x: pieceX, y: pieceY },
              ease: Phaser.Math.Easing.Sine.InOut,
            }),
            activePiece === update.entity
              ? tweenCamera(camera, Main, pieceX, pieceY)
              : async () => true,
          ]);
        },
        once: (gameObject) => {
          gameObject.setPosition(pieceX, pieceY);
        },
      });
    },
    { runOnInit: true }
  );

  return [subscription];
};

export default createBRPiecePositionSystem;
