import {
  Assets,
  CHESS_TILEMAP_ID,
  GAME_WORLD_NAMESPACE,
  INITIAL_ZOOM,
  LOBBY_DISPLAY_GRID_SIZE,
  Scenes,
  TILE_HEIGHT,
  TILE_WIDTH,
} from "./constants";
import {
  EntityID,
  getComponentValueStrict,
  namespaceWorld,
} from "@latticexyz/recs";
import { createCamera, tileCoordToPixelCoord } from "@latticexyz/phaserx";
import setupPiecePositionContextComponent, {
  definePiecePositionContextComponent,
} from "./components/setupPiecePositionContextComponent";

import { Network } from "../network/types";
import { Subscription } from "rxjs";
import { config } from "./config";
import createChessBoardTilemap from "./utils/createChessBoardTilemap";
import createPhaserGame from "../phaser/createPhaserGame";
import createScene from "../phaser/createScene";
import { defineNumberComponent } from "@latticexyz/std-client";
import { getEntityIndexFromEntity } from "./utils/resolveEntity";
import load from "../phaser/load";
import setupActivePieceComponent from "./components/setupActivePieceComponent";
import setupBRGridDimComponent from "./components/setupBRGridDimComponent";
import setupBRRechargeTimerComponent from "./components/setupBRRechargeTimerComponent";
import setupSystems from "./systems/setupSystems";

export async function createGame(network: Network, gameEntity?: EntityID) {
  const {
    world,
    godEntityIndex,
    components: { BRGame },
  } = network;

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
    autoFocus: true,
    physics: {
      default: "arcade",
      arcade: {
        debug: false,
      },
    },
    render: {
      antialiasGL: true,
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

  const camera = createCamera(scenes[Scenes.Main].cameras.main, {
    pinchSpeed: 1,
    wheelSpeed: 1,
    maxZoom: 2,
    minZoom: 0.01,
  });

  const gameWorld = namespaceWorld(network.world, GAME_WORLD_NAMESPACE);

  const components = {
    HoveredPiece: defineNumberComponent(gameWorld, { id: "HoveredPiece" }),
    ActivePiece: defineNumberComponent(gameWorld, { id: "ActivePiece" }),
    // Updates Piece Positions through a system call
    // In order to associate piece positions with point additions or other piece deaths
    // (this is done for animation purposes)
    PiecePositionContext: definePiecePositionContextComponent(gameWorld),
    BRRechargeTimerComponent: defineNumberComponent(gameWorld, {
      id: "BRRechargeTimer",
    }),
    BRGridDimComponent: defineNumberComponent(gameWorld, {
      id: "BRGridDim",
    }),
  };

  const context = {
    gameEntity,
    gameWorld,
    components,
    camera,
    subscribedSystems: [] as Subscription[],
    game: game.game,
    objectRegistry: game.objectRegistry,
    scenes,
  };

  let gridSize = LOBBY_DISPLAY_GRID_SIZE;
  if (gameEntity) {
    const gameConfig = getComponentValueStrict(
      BRGame,
      getEntityIndexFromEntity(gameEntity, world)
    );
    // Grid dim is half of the length of the grid
    gridSize = gameConfig.initialGridDim * 2;
  }
  // Setup chessboard
  const tilemap = createChessBoardTilemap(
    scenes[Scenes.Main],
    TILE_WIDTH,
    TILE_HEIGHT,
    Assets.ChessTileset,
    gridSize
  );

  game.objectRegistry.tilemapRegistry.set(
    godEntityIndex,
    CHESS_TILEMAP_ID,
    tilemap
  );

  // Setup game components
  // setupHoveredPieceComponent(network, context);
  setupActivePieceComponent(network, context);
  setupPiecePositionContextComponent(network, context);
  setupBRRechargeTimerComponent(network, context);
  setupBRGridDimComponent(network, context);

  // Set input passes down from top
  scenes[Scenes.Main].input.setTopOnly(false);

  // Setup correct systems
  setupSystems(network, context);

  // Set zoom
  camera.setZoom(INITIAL_ZOOM);

  return context;
}
