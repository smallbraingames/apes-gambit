import { EntityID } from "@latticexyz/recs";
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

  // Setup chessboard
  renderBoard(context);
  //console.log("texture keys", context.game.textures.get("MainPawnSprite")!.s);

  // Setup system manager
  createSystemManagerSystem(network, context);

  network.startSync();

  return context;
}
