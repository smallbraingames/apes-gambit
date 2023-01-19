import { Coord, tween } from "@latticexyz/phaserx";
import { MOVE_ANIMATION_DURATION, TILE_HEIGHT } from "../constants";

import { PieceState } from "../types";
import { PieceType } from "../../network/types";
import { getAssetKeyForPiece } from "./config/assets";

export const loopPieceIdleAnimation = async (
  gameObject: Phaser.GameObjects.Sprite,
  x: number,
  y: number
): Promise<void> => {
  tween({
    targets: gameObject,
    duration: 300,
    props: { x: x, y: y - 150 },
    yoyo: true,
    ease: Phaser.Math.Easing.Sine.Out,
    repeat: -1,
  });
};

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

export const playMovePieceAnimation = async (
  gameObject: Phaser.GameObjects.Sprite,
  position: Coord,
  pieceType: PieceType,
  isEnemy: boolean
) => {
  gameObject.setTexture(
    getAssetKeyForPiece(pieceType, PieceState.MOVE, isEnemy)
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
};
