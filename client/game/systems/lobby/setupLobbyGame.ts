import {
  Assets,
  CHESS_TILEMAP_ID,
  LOBBY_DISPLAY_GRID_SIZE,
  TILE_HEIGHT,
  TILE_WIDTH,
} from "../../constants";

import { Network } from "../../../network/types";
import { Scene } from "../../types";
import createChessBoardTilemap from "../../utils/createChessBoardTilemap";

const setupLobbyGame = (network: Network, scene: Scene) => {
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
};

export default setupLobbyGame;
