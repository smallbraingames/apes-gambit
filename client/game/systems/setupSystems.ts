import { BR, Game, Lobby } from "../types";

import { Network } from "../../network/types";
import { Subscription } from "rxjs";
import createBRChatSystem from "./br/createBRChatSystem";
import createBRGridShrinkSystem from "./br/createBRGridShrinkSystem";
import createBRMovementInputSystem from "./br/input/createBRMovementInputSystem";
import createBRPiecePositionSystem from "./br/createBRPiecePositionSystem";
import createBRPieceTypeSystem from "./br/createBRPieceTypeSystem";
import createBRValidMoveOverlaySystem from "./br/createBRValidMoveOverlaySystem";
import createChatSystem from "./lobby/createChatSystem";
import createMovementInputSystem from "./lobby/input/createMovementInputSystem";
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
      createBRPiecePositionSystem,
      createBRPieceTypeSystem,
      // createBRValidMoveOverlaySystem,
      createBRGridShrinkSystem,
      createBRChatSystem,
    ],
    br
  );
};
