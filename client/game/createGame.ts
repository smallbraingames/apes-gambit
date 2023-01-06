import { EntityID } from "@latticexyz/recs";
import { Network } from "../network/types";
import createMovementInputSystem from "./systems/input/createMovementInputSystem";
import { createPhaserEngine } from "@latticexyz/phaserx";
import createPieceDeathSystem from "./systems/createPieceDeathSystem";
import createPiecePositionSystem from "./systems/createPiecePositionSystem";
import { phaserConfig } from "./config";
import renderBoard from "./renderBoard";

export async function createGame(network: Network, gameEntity: EntityID) {
  const {
    game,
    scenes,
    dispose: disposePhaser,
  } = await createPhaserEngine(phaserConfig);

  const context = {
    gameEntity,
    game,
    scenes,
    disposePhaser,
  };

  // Setup chessboard
  renderBoard(context);

  // Setup systems
  createPiecePositionSystem(network, context);
  createPieceDeathSystem(network, context);
  createMovementInputSystem(network, context);

  network.startSync();

  return context;
}
