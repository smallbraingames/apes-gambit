export const TILE_WIDTH = 800;
export const TILE_HEIGHT = 800;
export const PIECE_SPRITE_SCALE = 0.8;
export const PIECE_X_OFFSET = -80;
export const PIECE_Y_OFFSET = -130;
export const INITIAL_ZOOM = 0.08;
export const GAME_WORLD_NAMESPACE = "game";

export const TILE_OVERLAY_COLOR = 0x86efac;
export const TILE_OVERLAY_TAKE_COLOR = 0xfca5a5;

export enum Scenes {
  Main = "Main",
}

export enum Maps {
  Main = "Main",
}

export enum RenderDepth {
  TILE_OVERLAY = 1,
  PIECE = 2,
}

export enum Assets {
  ChessTileset = "OverworldTileset",
  MainPawnSprite = "MainPawnSprite",
  MainBishopSprite = "MainBishopSprite",
  MainKnightSprite = "MainKnightSprite",
  MainRookSprite = "MainRookSprite",
  MainQueenSprite = "MainQueenSprite",
  MainKingSprite = "MainKingSprite",
  // EnemyPawnSprite = "MainPawnSprite",
  // EnemyBishopSprite = "MainBishopSprite",
  // EnemyKnightSprite = "MainKnightSprite",
  // EnemyRookSprite = "MainRookSprite",
  // EnemyQueenSprite = "MainQueenSprite",
  // EnemyKingSprite = "MainKingSprite",
}

export enum Sprites {
  MainPawn = 0,
  MainBishop = 1,
  MainKnight = 2,
  MainRook = 3,
  MainQueen = 4,
  MainKing = 5,
  // EnemyPawn,
  // EnemyBishop,
  // EnemyKnight,
  // EnemyRook,
  // EnemyQueen,
  // EnemyKing,
}
