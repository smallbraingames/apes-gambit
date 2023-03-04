import { PieceType } from "../network/types";

export const TILE_WIDTH = 800;
export const TILE_HEIGHT = 800;
export const TILESET_VARIATIONS = 6;
export const PIECE_SPRITE_SCALE = 1;
export const PIECE_X_OFFSET = 400;
export const PIECE_Y_OFFSET = 400;
export const INITIAL_ZOOM = 0.15;
export const GAME_WORLD_NAMESPACE = "game";
export const MOVE_ANIMATION_DURATION = 200;
export const TILE_OVERLAY_COLOR = 0x86efac;
export const TILE_OVERLAY_TAKE_COLOR = 0xfca5a5;
export const TILE_OVERLAY_RENDER_MULTIPLE = 1.5;
export const LOBBY_DISPLAY_GRID_SIZE = 200;
export const CHESS_TILEMAP_ID = "chesstilemap";
export const PIECE_SPRITE_ID = "piece-sprite";
export const BANANA_SPRITE_ID = "banana-sprite";
export const BOUNDARY_SPRITE_ID = "boundary-sprite";
export const BR_VALID_MOVE_GROUP_ID = "br-valid-moves";

export const DEFAULT_MOVE_VALIDATOR_CONFIG = {
  [PieceType.BISHOP]: 4,
  [PieceType.QUEEN]: 3,
  [PieceType.ROOK]: 4,
  [PieceType.KING]: 1,
  [PieceType.PAWN]: 1,
  [PieceType.KNIGHT]: 1,
};

export enum Scenes {
  Lobby = "Lobby",
  BR = "BR",
}

export enum Maps {
  Main = "Main",
}

export enum RenderDepth {
  TILE = 0,
  TILE_OVERLAY = 1,
  PIECE = 2,
  SPEECH = 1000,
  BOUNDARY = 10000,
}

export enum Animations {
  MainPawnIdle = "MainPawnIdle",
}

export enum Assets {
  ChessTileset = "ChessTileset",
  Shadow = "Shadow",
  Boundary = "Boundary",
  Banana = "Banana",
  UnderBanana = "UnderBanana",
  TempleFull = "TempleFull",
  ParticleTrail = "ParticleTrail",
}

export enum Sprites {}
