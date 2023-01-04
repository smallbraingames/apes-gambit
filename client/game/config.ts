import {
  AssetType,
  defineCameraConfig,
  defineMapConfig,
  defineScaleConfig,
  defineSceneConfig,
} from "@latticexyz/phaserx";
import {
  Assets,
  Maps,
  Scenes,
  Sprites,
  TILE_HEIGHT,
  TILE_WIDTH,
} from "./constants";

const ANIMATION_INTERVAL = 200;

export const phaserConfig = {
  sceneConfig: {
    [Scenes.Main]: defineSceneConfig({
      assets: {
        [Assets.ChessTileset]: {
          type: AssetType.Image,
          key: Assets.ChessTileset,
          path: "assets/tilesets/chess-basic-tileset.png",
        },
        [Assets.PawnSprite]: {
          type: AssetType.Image,
          key: Assets.PawnSprite,
          path: "assets/sprites/pawn.png",
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
      sprites: {
        [Sprites.Pawn]: {
          assetKey: Assets.PawnSprite,
        },
      },
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
    zoom: 2,
    mode: Phaser.Scale.NONE,
  }),
  cameraConfig: defineCameraConfig({
    pinchSpeed: 1,
    wheelSpeed: 1,
    maxZoom: 3,
    minZoom: 0.3,
  }),
  cullingChunkSize: TILE_HEIGHT * 16,
};
