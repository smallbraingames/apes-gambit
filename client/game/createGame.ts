import {
  DEFAULT_MOVE_VALIDATOR_CONFIG,
  GAME_WORLD_NAMESPACE,
  INITIAL_ZOOM,
} from "./constants";
import { EntityID, namespaceWorld } from "@latticexyz/recs";
import {
  defineCoordComponent,
  defineNumberComponent,
} from "@latticexyz/std-client";
import setupPiecePositionContextComponent, {
  definePiecePositionContextComponent,
} from "./components/setupPiecePositionContextComponent";

import { Network } from "../network/types";
import { Scene } from "./types";
import { Subscription } from "rxjs";
import assets from "./utils/config/assets";
import { config } from "./config";
import createBananaMananger from "./utils/createBananaManager";
import { createCamera } from "@latticexyz/phaserx";
import createMoveValidator from "./utils/createMoveValidator";
import createPhaserGame from "../phaser/createPhaserGame";
import createPhaserObjectRegistry from "../phaser/createPhaserObjectRegistry";
import createScene from "../phaser/createScene";
import load from "../phaser/load";
import setupActivePieceComponent from "./components/setupActivePieceComponent";
import setupBRGame from "./systems/br/setupBRGame";
import setupBRGridDimComponent from "./components/setupBRGridDimComponent";
import setupBRRechargeTimerComponent from "./components/setupBRRechargeTimerComponent";
import setupLobbyGame from "./systems/lobby/setupLobbyGame";

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
    mipmapFilter: "LINEAR_MIPMAP_LINEAR",
    autoFocus: true,
    autoResize: true,
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

  // Load all assets
  const gameAssets = [];
  const firstScene: Phaser.Scene = game.scene.getScenes(false)[0];
  for (const [_, asset] of Object.entries(assets)) {
    gameAssets.push(load(firstScene, asset));
  }
  await Promise.all(gameAssets);

  const scenes: { [key: string]: Scene } = {};
  await Promise.all(
    game.scene.getScenes(false).map(async (scene) => {
      const key = scene.scene.key;

      // Disable clickthroughs
      scene.input.setTopOnly(false);

      // Create camera
      const camera = createCamera(scene.cameras.main, {
        pinchSpeed: 1,
        wheelSpeed: 1,
        maxZoom: 2,
        minZoom: 0.01,
      });

      // Set zoom
      camera.setZoom(INITIAL_ZOOM);
      // Add scene
      scenes[key] = {
        scene,
        camera,
        objectRegistry: createPhaserObjectRegistry(),
      };
    })
  );

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
    BRBananaComponent: defineCoordComponent(gameWorld, {
      id: "BRBananaComponent",
    }),
  };

  const context = {
    gameEntity,
    gameWorld,
    components,
    subscribedSystems: [] as Subscription[],
    game,
    scenes,
  };

  // Setup scenes
  setupLobbyGame(network, scenes.Lobby, context);
  setupBRGame(network, scenes.BR, context);

  // Setup game components
  setupActivePieceComponent(network, context);
  setupPiecePositionContextComponent(network, context);
  setupBRRechargeTimerComponent(network, context);
  setupBRGridDimComponent(network, context);

  (window as any).game = context;

  return context;
}
