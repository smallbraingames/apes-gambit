import { createGame } from "./createGame";

export type Game = Awaited<ReturnType<typeof createGame>>;

export enum GameStatus {
  NOT_STARTED = 0,
  IN_PROGRESS = 1,
  OVER = 2,
}

export enum EntityType {
  GAME_CONFIG, // Not a piece, but rather a game configuration entity
  BR_PIECE, // A piece in the given game
  NON_BR_PIECE, // A piece, but not in the given game
}

export enum PieceState {
  IDLE = "idle",
  MOVE = "move",
}

export type GameConfig = {
  startTime: number;
  status: GameStatus;
};
