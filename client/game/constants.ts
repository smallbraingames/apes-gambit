export const TILE_WIDTH = 800;
export const TILE_HEIGHT = 800;
export const PIECE_SPRITE_SCALE = 1;
export const PIECE_X_OFFSET = 400;
export const PIECE_Y_OFFSET = 400;
export const INITIAL_ZOOM = 0.13;
export const GAME_WORLD_NAMESPACE = "game";
export const MOVE_ANIMATION_DURATION = 200;
export const TILE_OVERLAY_COLOR = 0x86efac;
export const TILE_OVERLAY_TAKE_COLOR = 0xfca5a5;
export const TILE_OVERLAY_RENDER_MULTIPLE = 1.5;
export const PIECE_SPRITE_ID = "piece-sprite";
export const LOBBY_DISPLAY_GRID_SIZE = 200;
export const CHESS_TILEMAP_ID = "chesstilemap";

export enum Scenes {
  Lobby = "Lobby",
  BR = "BR",
}

export enum Maps {
  Main = "Main",
}

export enum RenderDepth {
  TILE_OVERLAY = 1,
  PIECE = 2,
}

export enum Animations {
  MainPawnIdle = "MainPawnIdle",
}

export enum Assets {
  ChessTileset = "ChessTileset",
  Shadow = "Shadow",
  Boundary = "Boundary",
}

export enum Sprites {}
