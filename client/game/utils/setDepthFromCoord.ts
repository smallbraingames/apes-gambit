import { TILE_HEIGHT } from "../constants";

const MAX_GRID_SIZE = 1000;

const setDepthFromCoord = (sprite: Phaser.GameObjects.Sprite) => {
  const depth = sprite.y / TILE_HEIGHT + MAX_GRID_SIZE;
  console.log("depth", depth);
  sprite.setDepth(depth);
};

export default setDepthFromCoord;
