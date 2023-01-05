import { createGame } from "./createGame";

export type Game = Awaited<ReturnType<typeof createGame>>;

export enum GameStatus {
  NOT_STARTED = 0,
  IN_PROGRESS = 1,
  OVER = 2,
}

export enum EntityType {
  GAME_CONFIG,
  BR_PIECE,
  NON_BR_PIECE,
}

export type GameConfig = {
  startTime: number;
  status: GameStatus;
};
