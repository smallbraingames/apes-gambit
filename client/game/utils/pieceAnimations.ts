import { Assets, MOVE_ANIMATION_DURATION, Sprites } from "../constants";
import { Coord, tween } from "@latticexyz/phaserx";

export const repeatIdleAnimation = async (
  gameObject: Phaser.GameObjects.Sprite,
  x: number,
  y: number
): Promise<void> => {
  tween({
    targets: gameObject,
    duration: 500,
    props: { x: x, y: y - 100 },
    yoyo: true,
    ease: Phaser.Math.Easing.Sine.Out,
    repeat: -1,
  });
};

export const movePieceAnimation = async (
  gameObject: Phaser.GameObjects.Sprite,
  position: Coord
) => {
  //gameObject.setTexture(Assets.MainPawnMoveSprite);
  await Promise.all([
    tween(
      {
        targets: gameObject,
        duration: MOVE_ANIMATION_DURATION / 2,
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
        duration: MOVE_ANIMATION_DURATION,
        props: { x: position.x, y: position.y },
        ease: Phaser.Math.Easing.Sine.InOut,
      },
      { keepExistingTweens: true }
    ),
  ]);
  //gameObject.setTexture(Assets.MainPawnSprite);
};
