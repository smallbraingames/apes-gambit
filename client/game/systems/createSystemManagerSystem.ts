import { Game, GameConfig, GameStatus } from "../types";

import { Network } from "../../network/types";
import { Subscription } from "rxjs";
import createBRMovementInputSystem from "./br/input/createBRMovementInputSystem";
import createBRPieceDeathSystem from "./br/createBRPieceDeathSystem";
import createBRPiecePositionSystem from "./br/createBRPiecePositionSystem";
import createBRPieceTypeSystem from "./br/createBRPieceTypeSystem";
import createHoveredPieceSystem from "./lobby/createHoveredPieceSystem";
import createMovementInputSystem from "./lobby/input/createMovementInputSystem";
import createPiecePositionSystem from "./lobby/createPiecePositionSystem";
import createPieceTypeSystem from "./lobby/createPieceTypeSystem";
import { defineComponentSystem } from "@latticexyz/recs";

const setupSystems = (
  network: Network,
  game: Game,
  systems: ((network: Network, game: Game) => Subscription)[]
) => {
  systems.forEach((system) => {
    game.subscribedSystems.push(system(network, game));
  });
};

const clearSystems = (game: Game) => {
  console.log("Clearing game systems");
  game.subscribedSystems.map((sub) => sub.unsubscribe());
};

const setupLobbySystems = (network: Network, game: Game) => {
  console.log("Setting up lobby systems");
  setupSystems(network, game, [
    createMovementInputSystem,
    createPiecePositionSystem,
    createPieceTypeSystem,
    createHoveredPieceSystem,
  ]);
};

const setupBRSystems = (network: Network, game: Game) => {
  console.log("Setting up BR systems");
  setupSystems(network, game, [
    createBRMovementInputSystem,
    createBRPieceDeathSystem,
    createBRPiecePositionSystem,
    createBRPieceTypeSystem,
  ]);
};

const createSystemManagerSystem = (network: Network, game: Game) => {
  const {
    world,
    components: { BRGame: Game },
  } = network;

  const { gameEntity } = game;
  const gameEntityIndex = gameEntity
    ? world.entityToIndex.get(gameEntity)
    : undefined;

  if (!gameEntityIndex) {
    console.warn(`Game entity ${gameEntity} could not be resolved to index`);
  }

  defineComponentSystem(
    world,
    Game,
    (update) => {
      let gameConfig: GameConfig | undefined = undefined;
      if (update.entity === gameEntityIndex) gameConfig = update.value[0];

      if (!gameConfig) {
        console.warn(
          `Game config is undefined: ${JSON.stringify(
            gameConfig
          )}, setting up lobby`
        );
        clearSystems(game);
        setupLobbySystems(network, game);
        return;
      }

      switch (gameConfig.status) {
        case GameStatus.NOT_STARTED:
          console.log("Game status not started, switching to lobby systems");
          clearSystems(game);
          setupLobbySystems(network, game);
          break;
        case GameStatus.IN_PROGRESS:
          console.log("Game status in progress, switching to BR systems");
          clearSystems(game);
          setupBRSystems(network, game);
          break;
        case GameStatus.OVER:
          console.log("Game status over, switching to lobby systems");
          clearSystems(game);
          setupLobbySystems(network, game);
          break;
      }
    },
    { runOnInit: true }
  );
};

export default createSystemManagerSystem;
