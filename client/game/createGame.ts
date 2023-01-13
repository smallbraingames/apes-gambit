import { EntityID } from "@latticexyz/recs";
import { INITIAL_ZOOM } from "./constants";
import { Network } from "../network/types";
import { Subscription } from "rxjs";
import { createPhaserEngine } from "@latticexyz/phaserx";
import createSystemManagerSystem from "./systems/createSystemManagerSystem";
import { phaserConfig } from "./config";
import renderBoard from "./utils/renderBoard";

export async function createGame(network: Network, gameEntity?: EntityID) {
  const {
    game,
    scenes,
    dispose: disposePhaser,
  } = await createPhaserEngine(phaserConfig);

  const context = {
    gameEntity,
    subscribedSystems: [] as Subscription[],
    game,
    scenes,
    disposePhaser,
  };

  // Set zoom
  scenes.Main.camera.setZoom(INITIAL_ZOOM);

  // Setup chessboard
  renderBoard(context);
  scenes.Main.camera.centerOn(0, 1);

  // Setup system manager
  createSystemManagerSystem(network, context);

  network.startSync();

  return context;
}
