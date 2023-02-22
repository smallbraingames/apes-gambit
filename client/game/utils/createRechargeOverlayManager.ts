import { TILE_HEIGHT, TILE_WIDTH } from "../constants";
import { tileCoordToPixelCoord, tween } from "@latticexyz/phaserx";

import { Coord } from "@latticexyz/utils";
import { Scene } from "../types";

type RechargeOverlayConfig = {
  overlay: Phaser.GameObjects.GameObject;
  percentage: number;
};

const createRechargeOverlayManager = async (scene: Scene) => {
  let rechargeOverlay: RechargeOverlayConfig;

  const animateRechargeOverlay = async (tileCoord: Coord) => {
    const { scene: phaserScene } = scene;
    const { x, y } = tileCoordToPixelCoord(tileCoord, TILE_WIDTH, TILE_HEIGHT);
    const overlay = phaserScene.add.rectangle(
      x + TILE_WIDTH / 2,
      y + TILE_HEIGHT / 2,
      TILE_WIDTH,
      TILE_HEIGHT,
      0xffffff,
      0.3
    );
    await tween(
      {
        // @ts-ignore
        targets: overlay,
        duration: 5000,
        props: {
          height: 0,
        },
        ease: Phaser.Math.Easing.Linear,
      },
      { keepExistingTweens: true }
    );
    console.log("setting overlay");
    overlay.setInteractive();
  };

  return { animateRechargeOverlay };
};

export default createRechargeOverlayManager;
