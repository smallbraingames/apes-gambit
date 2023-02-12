import { BR, Game } from "../types";

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

const createSystems = <A extends any[]>(
  network: Network,
  game: Game,
  systems: ((network: Network, game: Game, br?: BR) => Subscription[])[],
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

export const setupLobbySystems = (network: Network, game: Game) => {
  console.log("Setting up lobby systems");
  createSystems(network, game, [
    createMovementInputSystem,
    createPiecePositionSystem,
    createPieceTypeSystem,
  ]);
};

export const setupBRSystems = (network: Network, game: Game, br: BR) => {
  console.log("Setting up BR systems");
  createSystems(
    network,
    game,
    [
      createBRMovementInputSystem,
      createBRPieceDeathSystem,
      createBRPiecePositionSystem,
      createBRPieceTypeSystem,
      createBRValidMoveOverlaySystem,
      createBRGridShrinkSystem,
    ],
    br
  );
};
