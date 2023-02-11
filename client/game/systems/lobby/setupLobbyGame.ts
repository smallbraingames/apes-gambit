import {
  Assets,
  CHESS_TILEMAP_ID,
  LOBBY_DISPLAY_GRID_SIZE,
  TILE_HEIGHT,
  TILE_WIDTH,
} from "../../constants";
import { Game, Scene } from "../../types";

import { Network } from "../../../network/types";
import createChessBoardTilemap from "../../utils/createChessBoardTilemap";
import { setupLobbySystems } from "../setupSystems";

const setupLobbyGame = (network: Network, scene: Scene, game: Game) => {
  const { godEntityIndex } = network;

  // Setup chessboard
  const tilemap = createChessBoardTilemap(
    scene.scene,
    TILE_WIDTH,
    TILE_HEIGHT,
    Assets.ChessTileset,
    LOBBY_DISPLAY_GRID_SIZE
  );

  scene.objectRegistry.tilemapRegistry.set(
    godEntityIndex,
    CHESS_TILEMAP_ID,
    tilemap
  );

  setupLobbySystems(network, game);
};

export default setupLobbyGame;
