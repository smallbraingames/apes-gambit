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
  playPieceAttackAnimation,
  playPieceMoveAnimation,
} from "../../utils/animations/pieceMoveAnimation";
import { removeAllTweens, tileCoordToPixelCoord } from "@latticexyz/phaserx";

import { Subscription } from "rxjs";
import getPieceSpriteGameObject from "../../utils/getPieceSpriteGameObject";
import isLiveGamePiece from "../../utils/isLiveGamePiece";
import loopPieceIdleAnimation from "../../utils/animations/loopPieceIdleAnimation";

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
    components: { BRRechargeTimerComponent },
  } = game;

  const runRechargeAnimation = async () => {
    const time = getComponentValueStrict(
      BRRechargeTimerComponent,
      godEntityIndex
    ).value;
    await br!.rechargeOverlayManager.animateRechargeOverlay(time);
    br!.tileOverlayManager.setValidMoveOverlays();
  };

  const runPiecePositionContextChangedAnimation = async (
    piece: EntityIndex
  ) => {
    const positionContext = getComponentValueStrict(
      PiecePositionContext,
      piece
    );
    const sprite = getPieceSpriteGameObject(piece, objectRegistry, scene);
    const { x, y } = tileCoordToPixelCoord(
      positionContext,
      TILE_WIDTH,
      TILE_HEIGHT
    );
    const pieceType: PieceType = getComponentValueStrict(
      PieceType,
      piece
    ).value;
    const activePiece = getComponentValueStrict(ActivePiece, godEntityIndex)
      .value as EntityIndex;
    const isActivePiece = activePiece === piece;

    // 1. If necessary, clear overlays before move
    if (isActivePiece) {
      br!.tileOverlayManager.clearValidMoveOverlays();
    }

    // 2. Make the move / attack movement depending on if a piece was taken
    removeAllTweens(sprite);
    let moveAnimation;
    if (positionContext.pieceTaken !== undefined) {
      moveAnimation = playPieceAttackAnimation(
        sprite,
        { x, y },
        pieceType,
        !isActivePiece
      );
    } else {
      moveAnimation = playPieceMoveAnimation(
        scene,
        sprite,
        { x, y },
        pieceType,
        !isActivePiece
      );
    }
    await moveAnimation;

    // HACK: Take the opponents piece or a banana
    if (positionContext.bananaPickedUp) {
      br!.bananaManager.removeBananaAtPosition({
        x: positionContext.x,
        y: positionContext.y,
      });
    } else if (positionContext.pieceTaken !== undefined) {
      objectRegistry.gameObjectRegistry.remove(
        positionContext.pieceTaken as EntityIndex,
        PIECE_SPRITE_ID
      );
    }

    // 3. Run the recharge and piece overlay animation if this piece is active
    // If not, just set them to idle
    if (isActivePiece) {
      sprite.setX(x);
      sprite.setY(y);
      await runRechargeAnimation();
    }

    // 4. End with idle piece
    loopPieceIdleAnimation(sprite, x, y);
  };

  defineEnterSystem(
    world,
    [
      Has(PiecePositionContext),
      // @ts-ignore
      HasValue(BRInGame, { value: gameEntity }),
      HasValue(BRIsAlive, { value: true }),
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
      const activePiece = getComponentValueStrict(ActivePiece, godEntityIndex)
        .value as EntityIndex;
      const isActivePiece = activePiece === update.entity;
      if (isActivePiece) {
        await runRechargeAnimation();
      }
      loopPieceIdleAnimation(sprite, x, y);
    }
  );

  defineUpdateSystem(
    world,
    [
      Has(PiecePositionContext),
      // @ts-ignore
      HasValue(BRInGame, { value: gameEntity }),
      HasValue(BRIsAlive, { value: true }),
    ],
    async (update) => {
      await runPiecePositionContextChangedAnimation(update.entity);
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
