import { BigNumber, ContractTransaction } from "ethers";
import { EntityID, createWorld } from "@latticexyz/recs";
import { GameConfig, getNetworkConfig } from "./config";
import {
  createActionSystem,
  defineBoolComponent,
  defineCoordComponent,
  defineStringComponent,
  setupMUDNetwork,
} from "@latticexyz/std-client";

import { Coord } from "@latticexyz/utils";
import { SystemAbis } from "../contracts/types/SystemAbis.mjs";
import { SystemTypes } from "../contracts/types/SystemTypes";
import { defineGameComponent } from "./components/gameComponent";
import { defineLoadingStateComponent } from "./components/loadingStateComponent";

export async function createNetwork(config: GameConfig) {
  console.log("Network config", config);

  const world = createWorld();

  const components = {
    LoadingState: defineLoadingStateComponent(world),
    Owner: defineStringComponent(world, {
      id: "Owner",
      metadata: { contractId: "component.Owner" },
    }),
    PiecePosition: defineCoordComponent(world, {
      id: "PiecePosition",
      metadata: { contractId: "component.PiecePosition" },
    }),
    Game: defineGameComponent(world),
    InGame: defineBoolComponent(world, {
      id: "InGame",
      metadata: { contractId: "component.BRInGame" },
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

  const spawnPiece = (): Promise<ContractTransaction> => {
    return systems["system.Spawn"].executeTyped();
  };

  const movePiece = (
    pieceEntity: EntityID,
    gameEntity: EntityID,
    position: Coord
  ): Promise<ContractTransaction> => {
    return systems["system.BRMovePieceSystem"].executeTyped(
      pieceEntity,
      gameEntity,
      position
    );
  };

  const createGame = (startTime: number): Promise<ContractTransaction> => {
    return systems["system.BRCreateGameSystem"].executeTyped(startTime);
  };

  const setControllers = (entity: EntityID): Promise<ContractTransaction> => {
    const controllers = [systems["system.BRMovePieceSystem"].address as string];
    console.log("setting controllers");
    console.log(controllers, entity);
    return systems["system.SetController"].executeTyped(entity, controllers);
  };

  const joinGame = (
    pieceEntity: EntityID,
    gameEntity: EntityID
  ): Promise<ContractTransaction> => {
    return systems["system.BRJoinGameSystem"].executeTyped(
      pieceEntity,
      gameEntity
    );
  };

  const startGame = (gameEntity: EntityID): Promise<ContractTransaction> => {
    return systems["system.BRStartGameSystem"].executeTyped(gameEntity);
  };

  const context = {
    config,
    world,
    components,
    txQueue,
    systems,
    txReduced$,
    startSync,
    network,
    actions,
    api: {
      spawnPiece,
      movePiece,
      createGame,
      setControllers,
      joinGame,
      startGame,
    },
  };

  (window as any).network = context;

  return context;
}
