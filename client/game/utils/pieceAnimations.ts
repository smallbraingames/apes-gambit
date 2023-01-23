import { Coord, tween } from "@latticexyz/phaserx";
import { Game, PieceState } from "../types";
import { MOVE_ANIMATION_DURATION, TILE_HEIGHT } from "../constants";
import { Network, PieceType } from "../../network/types";

import { EntityIndex } from "@latticexyz/recs";
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
  mainGameObject: Phaser.GameObjects.Sprite,
  mainPosition: Coord,
  mainPieceType: PieceType,
  isMainEnemy: boolean,
  game: Game,
  network: Network,
  takenEntity: EntityIndex
) => {
  // 1. Move Main Piece
  mainGameObject.setTexture(
    getAssetKeyForPiece(mainPieceType, PieceState.ATTACK, isMainEnemy)
  );
  const animationDuration = getMoveAnimationDuration(
    { x: mainGameObject.x, y: mainGameObject.y },
    mainPosition
  );
  await Promise.all([
    tween(
      {
        targets: mainGameObject,
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
        targets: mainGameObject,
        duration: animationDuration,
        props: { x: mainPosition.x, y: mainPosition.y },
        ease: Phaser.Math.Easing.Sine.InOut,
      },
      { keepExistingTweens: true }
    ),
  ]);
  mainGameObject.setTexture(
    getAssetKeyForPiece(mainPieceType, PieceState.IDLE, isMainEnemy)
  );
  // Switch expression of other piece
  console.log(game.scenes.Main);

  game.scenes.Main.phaserScene.physics.collide(mainGameObject, mainGameObject);
};
