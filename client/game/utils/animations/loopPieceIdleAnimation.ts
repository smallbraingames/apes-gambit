import { tween } from "@latticexyz/phaserx";

const loopPieceIdleAnimation = async (
  gameObject: Phaser.GameObjects.Sprite,
  x: number,
  y: number
): Promise<void> => {
  tween(
    {
      targets: gameObject,
      duration: 300,
      props: { x: x, y: y - 150 },
      yoyo: true,
      ease: Phaser.Math.Easing.Sine.Out,
      repeat: -1,
    },
    { keepExistingTweens: false }
  );
};

export default loopPieceIdleAnimation;
