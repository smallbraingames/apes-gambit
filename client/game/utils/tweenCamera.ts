import { AnimatedTilemap, Camera, tween } from "@latticexyz/phaserx";
import {
  MOVE_ANIMATION_DURATION,
  TILE_OVERLAY_RENDER_MULTIPLE,
} from "../constants";

import { renderBoardInView } from "./renderBoard";

const tweenCamera = async (
  camera: Camera,
  tilemap: AnimatedTilemap<number, string, string>,
  x: number,
  y: number
) => {
  return tween({
    // @ts-ignore
    targets: camera.phaserCamera,
    props: {
      scrollX: x,
      scrollY: y,
    },
    duration: MOVE_ANIMATION_DURATION,
    ease: "Sine.easeInOut",
    onStart: () => {
      const width = camera.phaserCamera.worldView.width;
      const height = camera.phaserCamera.worldView.height;
      renderBoardInView(
        x - width,
        y - height,
        width * TILE_OVERLAY_RENDER_MULTIPLE,
        height * TILE_OVERLAY_RENDER_MULTIPLE,
        tilemap
      );
    },
    onComplete: () => {
      // @ts-ignore
      camera.worldView$.next(camera.phaserCamera.worldView);
    },
  });
};

export default tweenCamera;
