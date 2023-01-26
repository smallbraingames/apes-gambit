import { Game } from "../types";
import { Network } from "../../network/types";
import { Subscription } from "rxjs";
import createBRMovementInputSystem from "./br/input/createBRMovementInputSystem";
import createBRPieceDeathSystem from "./br/createBRPieceDeathSystem";
import createBRPiecePositionSystem from "./br/createBRPiecePositionSystem";
import createBRPieceTypeSystem from "./br/createBRPieceTypeSystem";
import createBRValidMoveSystem from "./br/createBRValidMoveSystem";
import createHoveredPieceSystem from "./lobby/createHoveredPieceSystem";
import createMovementInputSystem from "./lobby/input/createMovementInputSystem";
import createPiecePositionSystem from "./lobby/createPiecePositionSystem";
import createPieceTypeSystem from "./lobby/createPieceTypeSystem";
import createValidMoveSystem from "./lobby/createValidMoveSystem";

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
    createHoveredPieceSystem,
    createValidMoveSystem,
  ]);
};

const setupBRSystems = (network: Network, game: Game) => {
  console.log("Setting up BR systems");
  createSystems(network, game, [
    createBRMovementInputSystem,
    createBRPieceDeathSystem,
    createBRPiecePositionSystem,
    createBRPieceTypeSystem,
    createBRValidMoveSystem,
  ]);
};

const setupSystems = (network: Network, game: Game) => {
  const { world } = network;

  const { gameEntity } = game;

  const gameEntityIndex = gameEntity
    ? world.entityToIndex.get(gameEntity)
    : undefined;

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
