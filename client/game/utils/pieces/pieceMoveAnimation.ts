import {
  Assets,
  MOVE_ANIMATION_DURATION,
  TILE_HEIGHT,
  TILE_WIDTH,
} from "../../constants";
import { Coord, tileCoordToPixelCoord, tween } from "@latticexyz/phaserx";
import { PieceSpriteManager, PieceState } from "../../types";

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
  tileCoord: Coord
) => {
  // Don't emit trails for now
  // const particles = scene.add.particles(Assets.ChessTileset, undefined, {
  //   speed: { min: 20, max: 100 },
  //   angle: { min: 0, max: 360 },
  //   scale: { start: 1, end: 0 },
  //   alpha: { start: 0, end: 0.1 },
  //   lifespan: 2000,
  // });

  // const emitter = particles.emitters.first;
  // emitter.startFollow(gameObject);

  const sprite = pieceSpriteManager.getSprite(entityIndex);
  const position = tileCoordToPixelCoord(tileCoord, TILE_WIDTH, TILE_HEIGHT);
  pieceSpriteManager.switchState(entityIndex, PieceState.MOVE);
  const animationDuration = getMoveAnimationDuration(
    { x: sprite.x, y: sprite.y },
    position
  );
  await Promise.all([
    tween(
      {
        targets: sprite,
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
  // emitter.stopFollow();
  // emitter.stop();
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
