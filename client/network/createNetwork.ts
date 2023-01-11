import { EntityID, createWorld } from "@latticexyz/recs";
import { GameConfig, getNetworkConfig } from "./config";
import {
  createActionSystem,
  defineBoolComponent,
  defineCoordComponent,
  defineNumberComponent,
  defineStringComponent,
  setupMUDNetwork,
} from "@latticexyz/std-client";

import { ContractTransaction } from "ethers";
import { Coord } from "@latticexyz/utils";
import { PieceType } from "./types";
import { SystemAbis } from "../contracts/types/SystemAbis.mjs";
import { SystemTypes } from "../contracts/types/SystemTypes";
import { defineBRGameComponent } from "./components/brGameComponent";
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
    PieceType: defineNumberComponent(world, {
      id: "PieceType",
      metadata: { contractId: "component.PieceType" },
    }),
    BRGame: defineBRGameComponent(world),
    BRInGame: defineNumberComponent(world, {
      id: "BRInGame",
      metadata: { contractId: "component.BRInGame" },
    }),
    BRIsAlive: defineBoolComponent(world, {
      id: "BRIsAlive",
      metadata: { contractId: "component.BRIsAlive" },
    }),
    BRPoints: defineNumberComponent(world, {
      id: "BRPoints",
      metadata: { contractId: "component.BRPoints" },
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
    entity: EntityID,
    position: Coord
  ): Promise<ContractTransaction> => {
    return systems["system.MovePiece"].executeTyped(entity, position);
  };

  // Battle Royale

  const moveBRPiece = (
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

  const createBRGame = (startTime: number): Promise<ContractTransaction> => {
    return systems["system.BRCreateGameSystem"].executeTyped(startTime);
  };

  const setBRControllers = (entity: EntityID): Promise<ContractTransaction> => {
    const controllers = [
      systems["system.BRMovePieceSystem"].address as string,
      systems["system.BRSetPieceTypeSystem"].address as string,
    ];
    return systems["system.SetController"].executeTyped(entity, controllers);
  };

  const joinBRGame = (
    pieceEntity: EntityID,
    gameEntity: EntityID
  ): Promise<ContractTransaction> => {
    return systems["system.BRJoinGameSystem"].executeTyped(
      pieceEntity,
      gameEntity
    );
  };

  const startBRGame = (gameEntity: EntityID): Promise<ContractTransaction> => {
    return systems["system.BRStartGameSystem"].executeTyped(gameEntity);
  };

  const setBRPieceType = (
    pieceEntity: EntityID,
    gameEntity: EntityID,
    pieceType: PieceType
  ): Promise<ContractTransaction> => {
    return systems["system.BRSetPieceTypeSystem"].executeTyped(
      pieceEntity,
      gameEntity,
      pieceType
    );
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
      br: {
        moveBRPiece,
        createBRGame,
        setBRControllers,
        joinBRGame,
        startBRGame,
        setBRPieceType,
      },
    },
  };

  (window as any).network = context;

  return context;
}
