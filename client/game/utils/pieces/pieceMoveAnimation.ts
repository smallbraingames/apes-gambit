import { Assets, MOVE_ANIMATION_DURATION, TILE_HEIGHT } from "../../constants";
import { Coord, tween } from "@latticexyz/phaserx";

import { PieceState } from "../../types";
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
  scene: Phaser.Scene,
  gameObject: Phaser.GameObjects.Sprite,
  position: Coord,
  pieceType: PieceType,
  isActivePiece: boolean
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

  gameObject.setTexture(
    getAssetKeyForPiece(pieceType, PieceState.MOVE, isActivePiece)
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
    getAssetKeyForPiece(pieceType, PieceState.IDLE, isActivePiece)
  );
  gameObject.setPosition(position.x, position.y);

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
