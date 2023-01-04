import { GameConfig, getNetworkConfig } from "./config";
import {
  createActionSystem,
  defineCoordComponent,
  setupMUDNetwork,
} from "@latticexyz/std-client";

import { Coord } from "@latticexyz/utils";
import { SystemAbis } from "../contracts/types/SystemAbis.mjs";
import { SystemTypes } from "../contracts/types/SystemTypes";
import { createWorld } from "@latticexyz/recs";
import { defineLoadingStateComponent } from "./components/loadingStateComponent";

export async function createNetwork(config: GameConfig) {
  console.log("Network config", config);

  const world = createWorld();

  const components = {
    LoadingState: defineLoadingStateComponent(world),
    PiecePosition: defineCoordComponent(world, {
      id: "PiecePosition",
      metadata: { contractId: "component.PiecePosition" },
    }),
  };

  console.log("Setup network");
  const networkConfig = getNetworkConfig(config);
  const { txQueue, systems, txReduced$, network, startSync, encoders } =
    await setupMUDNetwork<typeof components, SystemTypes>(
      networkConfig,
      world,
      components,
      SystemAbis
    );

  const actions = createActionSystem(world, txReduced$);

  const spawnPiece = () => {
    systems["system.Spawn"].executeTyped();
  };

  const movePiece = (entity: string, position: Coord) => {
    systems["system.MovePiece"].executeTyped(entity, position);
  };

  const context = {
    world,
    components,
    txQueue,
    systems,
    txReduced$,
    startSync,
    network,
    actions,
    api: { spawnPiece, movePiece },
  };

  (window as any).network = context;

  return context;
}
