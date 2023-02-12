import {
  Assets,
  CHESS_TILEMAP_ID,
  TILE_HEIGHT,
  TILE_WIDTH,
} from "../../constants";
import { Game, Scene } from "../../types";

import { Network } from "../../../network/types";
import createBananaMananger from "../../utils/createBananaManager";
import createChessBoardTilemap from "../../utils/createChessBoardTilemap";
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

  const brContext = {
    bananaManager,
  };

  setupBRSystems(network, game, brContext);

  return brContext;
};

export default setupBRGame;