import {
  Assets,
  MOVE_ANIMATION_DURATION,
  RenderDepth,
  TILE_HEIGHT,
  TILE_WIDTH,
} from "../../constants";
import { Coord, tileCoordToPixelCoord, tween } from "@latticexyz/phaserx";
import { PieceSpriteManager, PieceState, Scene } from "../../types";

import { EntityIndex } from "@latticexyz/recs";
import { PieceType } from "../../../network/types";
import { getAssetKeyForPiece } from "../config/assets";

export const getMoveAnimationDuration = (
  position: Coord,
  previousPosition: Coord
): number =>
  (Math.hypot(
    previousPosition.x - position.x,
    previousPosition.y - position.y
  ) /
    TILE_HEIGHT) *
  MOVE_ANIMATION_DURATION;

export const playPieceMoveAnimation = async (
  pieceSpriteManager: PieceSpriteManager,
  entityIndex: EntityIndex,
  tileCoord: Coord,
  scene: Scene
) => {
  // Don't emit trails for now
  const { scene: phaserScene } = scene;
  const sprite = pieceSpriteManager.getSprite(entityIndex);
  const position = tileCoordToPixelCoord(tileCoord, TILE_WIDTH, TILE_HEIGHT);
  const animationDuration = getMoveAnimationDuration(
    { x: sprite.x, y: sprite.y },
    position
  );

  const particles = phaserScene.add.particles(Assets.ParticleTrail, undefined, {
    speed: { min: 10, max: 100 },
    angle: { min: 0, max: 0 },
    scale: { start: 2, end: 0 },
    alpha: { start: 1, end: 0 },
    lifespan: animationDuration,
  });

  const emitter = particles.emitters.first;
  emitter.startFollow(sprite, sprite.width / 2, sprite.height / 2);
  particles.setDepth(RenderDepth.TILE_OVERLAY + 1);

  pieceSpriteManager.switchState(entityIndex, PieceState.MOVE);

  await Promise.all([
    tween(
      {
        targets: sprite,
        duration: animationDuration / 2,
        props: {
          angle: 5,
        },
        ease: Phaser.Math.Easing.Sine.InOut,
        yoyo: true,
      },
      { keepExistingTweens: true }
    ),
    tween(
      {
        targets: sprite,
        duration: animationDuration,
        props: { x: position.x, y: position.y },
        ease: Phaser.Math.Easing.Sine.InOut,
      },
      { keepExistingTweens: true }
    ),
  ]);
  pieceSpriteManager.switchState(entityIndex, PieceState.IDLE);
  pieceSpriteManager.moveTo(entityIndex, tileCoord);
  emitter.stopFollow();
  emitter.stop();
};

export const playPieceAttackAnimation = async (
  gameObject: Phaser.GameObjects.Sprite,
  position: Coord,
  pieceType: PieceType,
  isEnemy: boolean
) => {
  gameObject.setTexture(
    getAssetKeyForPiece(pieceType, PieceState.ATTACK, isEnemy)
  );
  const animationDuration = getMoveAnimationDuration(
    { x: gameObject.x, y: gameObject.y },
    position
  );
  await Promise.all([
    tween(
      {
        targets: gameObject,
        duration: animationDuration / 2,
        props: {
          angle: 40,
        },
        ease: Phaser.Math.Easing.Sine.InOut,
        yoyo: true,
      },
      { keepExistingTweens: true }
    ),
    tween(
      {
        targets: gameObject,
        duration: animationDuration,
        props: { x: position.x, y: position.y },
        ease: Phaser.Math.Easing.Sine.InOut,
      },
      { keepExistingTweens: true }
    ),
  ]);
  gameObject.setTexture(
    getAssetKeyForPiece(pieceType, PieceState.IDLE, isEnemy)
  );
  gameObject.setPosition(position.x, position.y);
};
