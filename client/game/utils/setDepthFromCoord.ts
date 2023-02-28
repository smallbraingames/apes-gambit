import { TILE_HEIGHT } from "../constants";

const MAX_GRID_SIZE = 1000;

const setDepthFromCoord = (sprite: Phaser.GameObjects.Sprite, offset = 0) => {
  const depth = sprite.y / TILE_HEIGHT + MAX_GRID_SIZE + offset;
  sprite.setDepth(depth);
};

export default setDepthFromCoord;
