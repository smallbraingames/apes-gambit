import { AnimatedTilemap, pixelCoordToTileCoord } from "@latticexyz/phaserx";
import { Assets, TILE_HEIGHT, TILE_WIDTH } from "../constants";

const MAP_WIDTH_TILES = 1000;
const MAP_HEIGHT_TILES = 1000;

const createChessBoardTilemap = (
  scene: Phaser.Scene,
  tileWidth: number,
  tileHeight: number,
  tilesetAssetKey: Assets
) => {
  const tilemap = scene.make.tilemap({
    tileWidth,
    tileHeight,
  });

  const startX = -MAP_WIDTH_TILES / 2;
  const startY = -MAP_HEIGHT_TILES / 2;

  const layer = tilemap.createBlankLayer(
    tilesetAssetKey,
    tilemap.addTilesetImage(
      tilesetAssetKey,
      tilesetAssetKey,
      tileWidth,
      tileHeight
    )!,
    startX * TILE_WIDTH,
    startY * TILE_HEIGHT,
    MAP_WIDTH_TILES,
    MAP_HEIGHT_TILES
  )!;

  const tileIndices: number[][] = [];
  for (let i = 0; i < MAP_HEIGHT_TILES; i++) {
    const row = [];
    for (let j = 0; j < MAP_WIDTH_TILES; j++) {
      row.push((i + j) % 2);
    }
    tileIndices.push(row);
  }

  const tiles = layer.putTilesAt(tileIndices, 0, 0);
};

export default createChessBoardTilemap;
