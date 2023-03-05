import { BR, Game, Lobby } from "../types";

import { Network } from "../../network/types";
import { Subscription } from "rxjs";
import createBRCameraSystem from "./br/input/createBRCameraSystem";
import createBRChatSystem from "./br/createBRChatSystem";
import createBRGridShrinkSystem from "./br/createBRGridShrinkSystem";
import createBRMovementInputSystem from "./br/input/createBRMovementInputSystem";
import createBRPieceEnterExitSystem from "./br/createBRPieceEnterExitSystem";
import createBRPiecePositionContextSystem from "./br/createBRPiecePositionContextSystem";
import createBRPieceTypeSystem from "./br/createBRPieceTypeSystem";
import createChatSystem from "./lobby/createChatSystem";
import createMovementInputSystem from "./lobby/input/createMovementInputSystem";
import createPieceEnterExitSystem from "./lobby/createPieceEnterExitSystem";
import createPiecePositionSystem from "./lobby/createPiecePositionSystem";
import createPieceTypeSystem from "./lobby/createPieceTypeSystem";

const createSystems = <A extends any[]>(
  network: Network,
  game: Game,
  systems: ((network: Network, game: Game, ...args: A) => Subscription[])[],
  ...args: A
) => {
  systems.forEach((system) => {
    game.subscribedSystems.push(...system(network, game, ...args));
  });
};

const clearSystems = (game: Game) => {
  console.log("Clearing game systems");
  game.subscribedSystems.map((sub) => sub.unsubscribe());
};

export const setupLobbySystems = (
  network: Network,
  game: Game,
  lobby: Lobby
) => {
  console.log("Setting up lobby systems");
  createSystems(
    network,
    game,
    [
      createMovementInputSystem,
      createPieceEnterExitSystem,
      createPiecePositionSystem,
      createPieceTypeSystem,
      createChatSystem,
    ],
    lobby
  );
};

export const setupBRSystems = (network: Network, game: Game, br: BR) => {
  console.log("Setting up BR systems");
  createSystems(
    network,
    game,
    [
      createBRMovementInputSystem,
      createBRPiecePositionContextSystem,
      createBRPieceTypeSystem,
      createBRPieceEnterExitSystem,
      createBRGridShrinkSystem,
      createBRChatSystem,
      createBRCameraSystem,
    ],
    br
  );
};
