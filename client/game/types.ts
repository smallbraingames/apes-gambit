import { Component, World } from "@latticexyz/recs";

import { Camera } from "@latticexyz/phaserx";
import { ObjectRegistry } from "../phaser/types";
import createBananaMananger from "./utils/tilemap/createBananaManager";
import { createGame } from "./createGame";
import createMoveValidator from "./utils/validation/createMoveValidator";
import createPieceSpriteManager from "./utils/pieces/createPieceSpriteManager";
import createRechargeOverlayManager from "./utils/createRechargeOverlayManager";
import createSpeechBubbleManager from "./utils/chat/createSpeechBubbleManager";
import createValidMoveTileOverlayManager from "./utils/validation/createValidMoveTileOverlayManager";
import setupBRGame from "./systems/br/setupBRGame";
import setupLobbyGame from "./systems/lobby/setupLobbyGame";

export type Game = Awaited<ReturnType<typeof createGame>>;
export type BR = Awaited<ReturnType<typeof setupBRGame>>;
export type Lobby = Awaited<ReturnType<typeof setupLobbyGame>>;
export type MoveValidator = Awaited<ReturnType<typeof createMoveValidator>>;
export type ValidMoveTileOverlayManager = Awaited<
  ReturnType<typeof createValidMoveTileOverlayManager>
>;
export type RechargeOverlayManager = Awaited<
  ReturnType<typeof createRechargeOverlayManager>
>;
export type BananaManager = Awaited<ReturnType<typeof createBananaMananger>>;
export type SpeechBubbleManager = Awaited<
  ReturnType<typeof createSpeechBubbleManager>
>;
export type PieceSpriteManager = Awaited<
  ReturnType<typeof createPieceSpriteManager>
>;

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
