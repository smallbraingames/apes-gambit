import {
  Asset,
  defineCameraConfig,
  defineMapConfig,
  defineScaleConfig,
  defineSceneConfig,
} from "@latticexyz/phaserx";
import {
  Assets,
  INITIAL_ZOOM,
  Maps,
  Scenes,
  TILE_HEIGHT,
  TILE_WIDTH,
} from "./constants";

import assets from "./utils/config/assets";
import sprites from "./utils/config/sprites";

const ANIMATION_INTERVAL = 200;
export const phaserConfig = {
  sceneConfig: {
    [Scenes.Main]: defineSceneConfig({
      assets: assets as { [key: string]: Asset },
      maps: {
        [Maps.Main]: defineMapConfig({
          chunkSize: TILE_WIDTH * 64, // tile size * tile amount
          tileWidth: TILE_WIDTH,
          tileHeight: TILE_HEIGHT,
          backgroundTile: [1],
          animationInterval: ANIMATION_INTERVAL,
          layers: {
            layers: {
              Background: { tilesets: ["Default"], hasHueTintShader: true },
              Foreground: { tilesets: ["Default"], hasHueTintShader: true },
            },
            defaultLayer: "Background",
          },
        }),
      },
      sprites,
      animations: [],
      tilesets: {
        Default: {
          assetKey: Assets.ChessTileset,
          tileWidth: TILE_WIDTH,
          tileHeight: TILE_HEIGHT,
        },
      },
    }),
  },
  scale: defineScaleConfig({
    parent: "phaser-game",
    zoom: 1,
    mode: Phaser.Scale.NONE,
  }),
  cameraConfig: defineCameraConfig({
    pinchSpeed: 1,
    wheelSpeed: 1,
    maxZoom: INITIAL_ZOOM,
    minZoom: INITIAL_ZOOM,
  }),
  cullingChunkSize: TILE_HEIGHT * 16,
};
