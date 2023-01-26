import {
  Assets,
  GAME_WORLD_NAMESPACE,
  Scenes,
  TILE_HEIGHT,
  TILE_WIDTH,
} from "./constants";
import { EntityID, namespaceWorld } from "@latticexyz/recs";
import setupPiecePositionContextComponent, {
  definePiecePositionContextComponent,
} from "./components/setupPiecePositionContextComponent";

import { Network } from "../network/types";
import { Subscription } from "rxjs";
import { config } from "./config";
import { createCamera } from "@latticexyz/phaserx";
import createChessBoardTilemap from "./utils/createChessBoardTilemap";
import createPhaserGame from "../phaser/createPhaserGame";
import createScene from "../phaser/createScene";
import { defineNumberComponent } from "@latticexyz/std-client";
import load from "../phaser/load";
import setupActivePieceComponent from "./components/setupActivePieceComponent";
import setupHoveredPieceComponent from "./components/setupHoveredPieceComponent";
import setupSystems from "./systems/setupSystems";

export async function createGame(network: Network, gameEntity?: EntityID) {
  const sceneConstructors = Object.keys(config.scenes).map((key) => {
    return createScene({ key });
  });

  const phaserConfig = {
    type: Phaser.WEBGL,
    scale: {
      parent: "phaser-game",
      zoom: 1,
      mode: Phaser.Scale.RESIZE,
    },
    pixelArt: false,
    autoFocus: true,
    physics: {
      default: "arcade",
      arcade: {
        debug: true,
      },
    },
    render: {
      antialiasGL: false,
      pixelArt: false,
    },
    scene: sceneConstructors,
  };

  const game = await createPhaserGame(phaserConfig);

  // Load scene assets and setup scene object
  const scenes: { [key: string]: Phaser.Scene } = {};
  await Promise.all(
    game.game.scene.getScenes(false).map(async (scene) => {
      const key = scene.scene.key;
      scenes[scene.scene.key] = scene;

      const assets = [];
      for (const [_, asset] of Object.entries(config.scenes[key].assets)) {
        assets.push(load(scene, asset));
      }
      await Promise.all(assets);
    })
  );

  createCamera(scenes[Scenes.Main].cameras.main, {
    pinchSpeed: 1,
    wheelSpeed: 1,
    maxZoom: 2,
    minZoom: 0.1,
  });

  const gameWorld = namespaceWorld(network.world, GAME_WORLD_NAMESPACE);

  const components = {
    HoveredPiece: defineNumberComponent(gameWorld, { id: "HoveredPiece" }),
    ActivePiece: defineNumberComponent(gameWorld, { id: "ActivePiece" }),
    // Updates Piece Positions through a system call
    // In order to associate piece positions with point additions or other piece deaths
    // (this is done for animation purposes)
    PiecePositionContext: definePiecePositionContextComponent(gameWorld),
  };

  const context = {
    gameEntity,
    gameWorld,
    components,
    subscribedSystems: [] as Subscription[],
    game: game.game,
    objectRegistry: game.objectRegistry,
    scenes,
  };

  // Setup game components
  setupHoveredPieceComponent(network, context);
  setupActivePieceComponent(network, context);
  setupPiecePositionContextComponent(network, context);

  // Setup chessboard
  createChessBoardTilemap(
    scenes[Scenes.Main],
    TILE_WIDTH,
    TILE_HEIGHT,
    Assets.ChessTileset
  );

  // Set input passes down from top
  scenes[Scenes.Main].input.setTopOnly(false);

  // Setup correct systems
  setupSystems(network, context);

  network.startSync();

  return context;
}
