import { EntityIndex, getComponentValueStrict } from "@latticexyz/recs";
import { Game, Scene } from "../types";
import { TILE_HEIGHT, TILE_WIDTH } from "../constants";
import { tileCoordToPixelCoord, tween } from "@latticexyz/phaserx";

import { Network } from "../../network/types";

const createRechargeOverlayManager = (
  network: Network,
  game: Game,
  scene: Scene
) => {
  let rechargeOverlay: Phaser.GameObjects.GameObject | undefined;

  const animateRechargeOverlay = async (time: number) => {
    if (rechargeOverlay) return;
    const { scene: phaserScene } = scene;
    const {
      components: { ActivePiece },
    } = game;
    const {
      godEntityIndex,
      components: { PiecePosition },
    } = network;

    const activePiece = getComponentValueStrict(ActivePiece, godEntityIndex);
    const activePiecePosition = getComponentValueStrict(
      PiecePosition,
      activePiece.value as EntityIndex
    );
    const { x, y } = tileCoordToPixelCoord(
      activePiecePosition,
      TILE_WIDTH,
      TILE_HEIGHT
    );
    const overlay = phaserScene.add.rectangle(
      x + TILE_WIDTH / 2,
      y + TILE_HEIGHT / 2,
      TILE_WIDTH,
      TILE_HEIGHT,
      0xffffff,
      0.3
    );
    rechargeOverlay = overlay;

    await tween(
      {
        // @ts-ignore
        targets: overlay,
        duration: time * 1000,
        props: {
          height: 0,
        },
        ease: Phaser.Math.Easing.Linear,
      },
      { keepExistingTweens: true }
    );
    rechargeOverlay.destroy();
    rechargeOverlay = undefined;
  };

  return { animateRechargeOverlay };
};

export default createRechargeOverlayManager;
