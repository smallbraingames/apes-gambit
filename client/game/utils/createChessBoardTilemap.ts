import { Assets, TILE_HEIGHT, TILE_WIDTH } from "../constants";

const createChessBoardTilemap = (
  scene: Phaser.Scene,
  tileWidth: number,
  tileHeight: number,
  tilesetAssetKey: Assets,
  gridSize: number
): Phaser.Tilemaps.Tilemap => {
  const tilemap = scene.make.tilemap({
    tileWidth,
    tileHeight,
    width: gridSize,
    height: gridSize,
  });

  const startX = -gridSize / 2;
  const startY = -gridSize / 2;

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
    gridSize,
    gridSize
  )!;

  const tileIndices: number[][] = [];
  for (let i = 0; i < gridSize; i++) {
    const row = [];
    for (let j = 0; j < gridSize; j++) {
      row.push((i + j) % 2);
    }
    tileIndices.push(row);
  }
  layer.putTilesAt(tileIndices, 0, 0);

  return tilemap;
};

export default createChessBoardTilemap;
