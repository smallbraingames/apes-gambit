import { Assets, TILE_HEIGHT, TILE_WIDTH } from "../../constants";

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

  // "Randomly" place tiles
  let state = 1;
  const getTileIndex = (n: number): number => {
    state += Math.abs(n * Math.sin(n) + n) ** 2;
    const fac = Math.floor(Math.abs((n * state) % 20));
    if (fac < 6) {
      return 0;
    } else if (fac < 10) {
      return 1;
    } else if (fac < 12) {
      return 2;
    } else if (fac < 14) {
      return 3;
    }
    return 4;
  };

  for (let i = 0; i < gridSize; i++) {
    const row = [];
    for (let j = 0; j < gridSize; j++) {
      //console.log(getTileIndex(i + j));
      //console.log(((i + j) % 2) * 6);
      row.push(((i + j) % 2) * 5 + getTileIndex(i * j + i + j));
    }
    tileIndices.push(row);
  }
  layer.putTilesAt(tileIndices, 0, 0);

  return tilemap;
};

export default createChessBoardTilemap;
