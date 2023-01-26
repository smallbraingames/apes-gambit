import { EntityIndex, getComponentValueStrict } from "@latticexyz/recs";
import { Network, PieceType } from "../../../network/types";
import { PIECE_SPRITE_ID, TILE_HEIGHT, TILE_WIDTH } from "../../constants";
import {
  loopPieceIdleAnimation,
  playMovePieceAnimation,
  playPieceAttackAnimation,
} from "../../utils/pieceAnimations";

import { Game } from "../../types";
import { Subscription } from "rxjs";
import { defineComponentSystemUnsubscribable } from "../../utils/defineComponentSystemUnsubscribable";
import getPieceSpriteGameObject from "../../utils/getPieceSpriteGameObject";
import isLiveGamePiece from "../../utils/isLiveGamePiece";
import { tileCoordToPixelCoord } from "@latticexyz/phaserx";

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
    objectRegistry,
    gameEntity,
    components: { ActivePiece, PiecePositionContext },
    scenes: { Main },
  } = game;

  const subscription = defineComponentSystemUnsubscribable(
    world,
    PiecePositionContext,
    async (update) => {
      if (!isLiveGamePiece(update.entity, network, gameEntity!)) return;
      const positionContext = update.value[0];

      if (!positionContext) {
        objectRegistry.remove(update.entity, PIECE_SPRITE_ID);
        return;
      }
      const sprite = getPieceSpriteGameObject(
        update.entity,
        objectRegistry,
        Main
      );
      const { x, y } = tileCoordToPixelCoord(
        positionContext,
        TILE_WIDTH,
        TILE_HEIGHT
      );

      const activePiece = getComponentValueStrict(ActivePiece, godEntityIndex)
        .value as EntityIndex;

      const pieceType: PieceType = getComponentValueStrict(
        PieceType,
        update.entity
      ).value;

      const isEnemy = activePiece !== update.entity;

      let moveAnimation;
      if (positionContext.pieceTaken !== undefined) {
        moveAnimation = playPieceAttackAnimation(
          sprite,
          { x, y },
          pieceType,
          isEnemy
        );
      } else {
        moveAnimation = playMovePieceAnimation(
          sprite,
          { x, y },
          pieceType,
          isEnemy
        );
      }
      // const cameraAnimation = !isEnemy
      //   ? tweenCamera(
      //       camera,
      //       Main,
      //       pieceX,
      //       pieceY,
      //       getMoveAnimationDuration(
      //         { x: pieceX, y: pieceY },
      //         { x: gameObject.x, y: gameObject.y }
      //       )
      //     )
      //   : async () => true;
      await Promise.all([moveAnimation]);

      //console.log("setting position", pieceX, pieceY);
      sprite.setPosition(x, y);
      sprite.setAngle(0);
      loopPieceIdleAnimation(sprite, x, y);
    },
    { runOnInit: true }
  );

  return [subscription];
};

export default createBRPiecePositionSystem;
