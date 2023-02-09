import { Component, World } from "@latticexyz/recs";

import { Camera } from "@latticexyz/phaserx";
import { ObjectRegistry } from "../phaser/types";
import { createGame } from "./createGame";

export type Game = Awaited<ReturnType<typeof createGame>>;

export type Scene = {
  scene: Phaser.Scene;
  camera: Camera;
  objectRegistry: ObjectRegistry;
};

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
  ATTACK = "attack",
}

export type GameConfig = {
  startTime: number;
  rechargeTime: number;
  initialGridDim: number;
  secondsPerGridShrink: number;
  perlinDenom: number;
  perlinThresholdBanana: number;
  perlinSeed: number;
  perlinPrecision: number;
  status: GameStatus;
};
