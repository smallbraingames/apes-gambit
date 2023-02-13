import {
  Assets,
  CHESS_TILEMAP_ID,
  DEFAULT_MOVE_VALIDATOR_CONFIG,
  TILE_HEIGHT,
  TILE_WIDTH,
} from "../../constants";
import { Game, Scene } from "../../types";

import { Network } from "../../../network/types";
import createBananaMananger from "../../utils/createBananaManager";
import createChessBoardTilemap from "../../utils/createChessBoardTilemap";
import createMoveValidator from "../../utils/createMoveValidator";
import createTileOverlayManager from "../../utils/createTileOverlayManager";
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
  const brContext = {
    bananaManager,
    moveValidator: createMoveValidator(DEFAULT_MOVE_VALIDATOR_CONFIG),
    tileOverlayManager: createTileOverlayManager(
      network,
      game,
      scene,
      moveValidator,
      gameEntity
    ),
  };

  setupBRSystems(network, game, brContext);

  return brContext;
};

export default setupBRGame;
