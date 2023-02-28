import { EntityIndex } from "@latticexyz/recs";
import { PieceSpriteManager } from "../../types";
import { tween } from "@latticexyz/phaserx";

const loopPieceIdleAnimation = (
  pieceSpriteManager: PieceSpriteManager,
  piece: EntityIndex,
  height: number,
  duration: number,
  ease = Phaser.Math.Easing.Sine.Out
) => {
  const sprite = pieceSpriteManager.getSprite(piece);
  tween(
    {
      targets: sprite,
      duration: duration,
      props: { x: sprite.x, y: sprite.y - height },
      yoyo: true,
      ease: Phaser.Math.Easing.Sine.Out,
      repeat: -1,
    },
    { keepExistingTweens: false }
  );
};

export default loopPieceIdleAnimation;
