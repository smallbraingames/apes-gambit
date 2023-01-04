import {
  AssetType,
  defineCameraConfig,
  defineMapConfig,
  defineScaleConfig,
  defineSceneConfig,
} from "@latticexyz/phaserx";
import { Maps, Scenes, TILE_HEIGHT, TILE_WIDTH } from "./constants";

const ANIMATION_INTERVAL = 200;

export const phaserConfig = {
  sceneConfig: {
    [Scenes.Main]: defineSceneConfig({
      assets: {
        chess: {
          type: AssetType.Image,
          key: "chess",
          path: "./assets/tilesets/chess-basic-tileset.png",
        },
      },
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
      sprites: {},
      animations: [],
      tilesets: {
        Default: {
          assetKey: "chess",
          tileWidth: TILE_WIDTH,
          tileHeight: TILE_HEIGHT,
        },
      },
    }),
  },
  scale: defineScaleConfig({
    parent: "phaser-game",
    zoom: 2,
    mode: Phaser.Scale.NONE,
  }),
  cameraConfig: defineCameraConfig({
    pinchSpeed: 1,
    wheelSpeed: 1,
    maxZoom: 0.5,
    minZoom: 0.5,
  }),
  cullingChunkSize: TILE_HEIGHT * 16,
};
