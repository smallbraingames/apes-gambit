import { EntityID, EntityIndex, createWorld } from "@latticexyz/recs";
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
import { GodID } from "@latticexyz/network";
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
    BRPreviousMoveTimestamp: defineNumberComponent(world, {
      id: "BRPreviousMoveTimestamp",
      metadata: { contractId: "component.BRPreviousMoveTimestamp" },
    }),
  };

  console.log("Setup network");
  const networkConfig = getNetworkConfig(config);
  const {
    txQueue,
    systems,
    txReduced$,
    network,
    startSync,
    systemCallStreams,
  } = await setupMUDNetwork<typeof components, SystemTypes>(
    networkConfig,
    world,
    components,
    SystemAbis,
    {
      fetchSystemCalls: true,
    }
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

  const createBRGame = (
    startTime: number,
    rechargeTime: number
  ): Promise<ContractTransaction> => {
    return systems["system.BRCreateGameSystem"].executeTyped(
      startTime,
      rechargeTime
    );
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

  const revokeBRControllers = (
    pieceEntity: EntityID
  ): Promise<ContractTransaction> => {
    return systems["system.BRRevokeControllerSystem"].executeTyped(pieceEntity);
  };

  const context = {
    config,
    world,
    godEntityIndex: world.entityToIndex.get(GodID) || (0 as EntityIndex),
    components,
    txQueue,
    systems,
    txReduced$,
    startSync,
    network,
    systemCallStreams,
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
        revokeBRControllers,
      },
    },
  };

  (window as any).network = context;

  return context;
}
