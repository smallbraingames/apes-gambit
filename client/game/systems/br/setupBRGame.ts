import {
  Assets,
  CHESS_TILEMAP_ID,
  DEFAULT_MOVE_VALIDATOR_CONFIG,
  TILE_HEIGHT,
  TILE_WIDTH,
} from "../../constants";
import { Game, Scene } from "../../types";

import { Network } from "../../../network/types";
import createBananaMananger from "../../utils/tilemap/createBananaManager";
import createChessBoardTilemap from "../../utils/tilemap/createChessBoardTilemap";
import createMoveValidator from "../../utils/validation/createMoveValidator";
import createRechargeOverlayManager from "../../utils/createRechargeOverlayManager";
import createSpeechBubbleManager from "../../utils/chat/createSpeechBubbleManager";
import createValidMoveTileOverlayManager from "../../utils/validation/createValidMoveTileOverlayManager";
import { getComponentValueStrict } from "@latticexyz/recs";
import { getEntityIndexFromEntity } from "../../utils/resolveEntity";
import { setupBRSystems } from "../setupSystems";

const setupBRGame = async (network: Network, scene: Scene, game: Game) => {
  const { gameEntity } = game;

  const {
    godEntityIndex,
    world,
    components: { BRGame },
  } = network;

  if (!gameEntity) {
    console.error("Cannot setup BR game without game entity");
    return;
  }

  const gameConfig = getComponentValueStrict(
    BRGame,
    getEntityIndexFromEntity(gameEntity, world)
  );
  // Grid dim is half of the length of the grid
  const gridSize = gameConfig.initialGridDim * 2;

  // Setup chessboard
  const tilemap = createChessBoardTilemap(
    scene.scene,
    TILE_WIDTH,
    TILE_HEIGHT,
    Assets.ChessTileset,
    gridSize
  );

  scene.objectRegistry.tilemapRegistry.set(
    godEntityIndex,
    CHESS_TILEMAP_ID,
    tilemap
  );

  // Setup banana manager
  const bananaManager = createBananaMananger();
  await bananaManager.setup(network, game, gameConfig, scene);
  bananaManager.placeBananas(tilemap);

  const moveValidator = createMoveValidator(DEFAULT_MOVE_VALIDATOR_CONFIG);
  const speechBubbleManager = createSpeechBubbleManager(scene);

  const brContext = {
    bananaManager,
    moveValidator: createMoveValidator(DEFAULT_MOVE_VALIDATOR_CONFIG),
    rechargeOverlayManager: createRechargeOverlayManager(network, game, scene),
    tileOverlayManager: createValidMoveTileOverlayManager(
      network,
      game,
      scene,
      moveValidator,
      gameEntity
    ),
    speechBubbleManager,
  };

  setupBRSystems(network, game, brContext);

  return brContext;
};

export default setupBRGame;
