import { BR, Game } from "../../types";
import {
  EntityIndex,
  Has,
  HasValue,
  defineEnterSystem,
  defineExitSystem,
  defineUpdateSystem,
  getComponentValueStrict,
} from "@latticexyz/recs";
import { Network, PieceType } from "../../../network/types";
import { PIECE_SPRITE_ID, TILE_HEIGHT, TILE_WIDTH } from "../../constants";
import {
  loopPieceIdleAnimation,
  playMovePieceAnimation,
  playPieceAttackAnimation,
} from "../../utils/pieceAnimations";

import { Subscription } from "rxjs";
import getPieceSpriteGameObject from "../../utils/getPieceSpriteGameObject";
import isLiveGamePiece from "../../utils/isLiveGamePiece";
import { tileCoordToPixelCoord } from "@latticexyz/phaserx";

const createBRPiecePositionSystem = (
  network: Network,
  game: Game,
  br: BR
): Subscription[] => {
  const {
    world,
    godEntityIndex,
    components: { PieceType, BRInGame, BRIsAlive },
  } = network;

  const {
    gameEntity,
    components: { ActivePiece, PiecePositionContext },
    scenes: {
      BR: { objectRegistry, scene },
    },
  } = game;

  defineEnterSystem(
    world,
    [
      Has(PiecePositionContext),
      // @ts-ignore
      HasValue(BRInGame, { value: gameEntity }),
      Has(BRIsAlive),
    ],
    async (update) => {
      const positionContext = getComponentValueStrict(
        PiecePositionContext,
        update.entity
      );
      const sprite = getPieceSpriteGameObject(
        update.entity,
        objectRegistry,
        scene
      );
      const { x, y } = tileCoordToPixelCoord(
        positionContext,
        TILE_WIDTH,
        TILE_HEIGHT
      );
      sprite.setPosition(x, y);
      loopPieceIdleAnimation(sprite, x, y);
    }
  );

  defineUpdateSystem(
    world,
    [
      Has(PiecePositionContext),
      // @ts-ignore
      HasValue(BRInGame, { value: gameEntity }),
      Has(BRIsAlive),
    ],
    async (update) => {
      if (!isLiveGamePiece(update.entity, network, gameEntity!)) return;
      const positionContext = getComponentValueStrict(
        PiecePositionContext,
        update.entity
      );

      const sprite = getPieceSpriteGameObject(
        update.entity,
        objectRegistry,
        scene
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
      if (!isEnemy) {
        br!.tileOverlayManager.clearValidMoveOverlays();
      }

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
          scene,
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

      sprite.setPosition(x, y);
      sprite.setAngle(0);
      loopPieceIdleAnimation(sprite, x, y);

      // Banana test
      if (positionContext.bananaPickedUp) {
        br!.bananaManager.removeBananaAtPosition({
          x: positionContext.x,
          y: positionContext.y,
        });
      }
      if (br!.tileOverlayManager.hasValidMoveOverlays()) {
        br!.tileOverlayManager.setValidMoveOverlays();
      }
      // Take other piece
      if (positionContext.pieceTaken !== undefined) {
        objectRegistry.gameObjectRegistry.remove(
          positionContext.pieceTaken,
          PIECE_SPRITE_ID
        );
      }
    }
  );

  defineExitSystem(world, [Has(PiecePositionContext)], (update) => {
    objectRegistry.gameObjectRegistry
      .get(update.entity, PIECE_SPRITE_ID)
      .destroy();
    objectRegistry.gameObjectRegistry.remove(update.entity, PIECE_SPRITE_ID);
  });

  return [];
};

export default createBRPiecePositionSystem;
