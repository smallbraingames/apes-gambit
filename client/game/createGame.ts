import { EntityID, namespaceWorld } from "@latticexyz/recs";
import { GAME_WORLD_NAMESPACE, INITIAL_ZOOM } from "./constants";

import { Network } from "../network/types";
import { Subscription } from "rxjs";
import { createPhaserEngine } from "@latticexyz/phaserx";
import createSystemManagerSystem from "./systems/createSystemManagerSystem";
import { defineNumberComponent } from "@latticexyz/std-client";
import { phaserConfig } from "./config";
import renderBoard from "./utils/renderBoard";
import setupActivePieceComponent from "./components/setupActivePieceComponent";
import setupHoveredPieceComponent from "./components/setupHoveredPieceComponent";

export async function createGame(network: Network, gameEntity?: EntityID) {
  const {
    game,
    scenes,
    dispose: disposePhaser,
  } = await createPhaserEngine(phaserConfig);

  const gameWorld = namespaceWorld(network.world, GAME_WORLD_NAMESPACE);

  // A registry for non-entity game objects
  const gameObjectRegistry = new Map<string, Phaser.GameObjects.Group>();

  const components = {
    HoveredPiece: defineNumberComponent(gameWorld, { id: "HoveredPiece" }),
    ActivePiece: defineNumberComponent(gameWorld, { id: "ActivePiece" }),
  };

  const context = {
    gameEntity,
    gameWorld,
    gameObjectRegistry,
    components,
    subscribedSystems: [] as Subscription[],
    game,
    scenes,
    disposePhaser,
  };

  // Setup game components
  setupHoveredPieceComponent(network, context);
  setupActivePieceComponent(network, context);

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
