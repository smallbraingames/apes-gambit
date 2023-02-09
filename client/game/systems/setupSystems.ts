import { Game } from "../types";
import { Network } from "../../network/types";
import { Subscription } from "rxjs";
import createBRGridShrinkSystem from "./br/createBRGridShrinkSystem";
import createBRMovementInputSystem from "./br/input/createBRMovementInputSystem";
import createBRPieceDeathSystem from "./br/createBRPieceDeathSystem";
import createBRPiecePositionSystem from "./br/createBRPiecePositionSystem";
import createBRPieceTypeSystem from "./br/createBRPieceTypeSystem";
import createBRValidMoveOverlaySystem from "./br/createBRValidMoveOverlaySystem";
import createMovementInputSystem from "./lobby/input/createMovementInputSystem";
import createPiecePositionSystem from "./lobby/createPiecePositionSystem";
import createPieceTypeSystem from "./lobby/createPieceTypeSystem";
import { getEntityIndexFromEntity } from "../utils/resolveEntity";

const createSystems = (
  network: Network,
  game: Game,
  systems: ((network: Network, game: Game) => Subscription[])[]
) => {
  systems.forEach((system) => {
    game.subscribedSystems.push(...system(network, game));
  });
};

const clearSystems = (game: Game) => {
  console.log("Clearing game systems");
  game.subscribedSystems.map((sub) => sub.unsubscribe());
};

const setupLobbySystems = (network: Network, game: Game) => {
  console.log("Setting up lobby systems");
  createSystems(network, game, [
    createMovementInputSystem,
    createPiecePositionSystem,
    createPieceTypeSystem,
  ]);
};

const setupBRSystems = (network: Network, game: Game) => {
  console.log("Setting up BR systems");
  createSystems(network, game, [
    createBRMovementInputSystem,
    createBRPieceDeathSystem,
    createBRPiecePositionSystem,
    createBRPieceTypeSystem,
    createBRValidMoveOverlaySystem,
    createBRGridShrinkSystem,
  ]);
};

const setupSystems = (network: Network, game: Game) => {
  const { world } = network;

  const { gameEntity } = game;

  let gameEntityIndex = undefined;
  if (gameEntity) {
    gameEntityIndex = getEntityIndexFromEntity(gameEntity, world);
  }

  if (!gameEntityIndex) {
    console.warn(`Game entity ${gameEntity} could not be resolved to index`);
  }

  if (gameEntityIndex) {
    // Set up a battle royale world
    clearSystems(game);
    setupBRSystems(network, game);
  } else {
    clearSystems(game);
    setupLobbySystems(network, game);
  }
};

export default setupSystems;
