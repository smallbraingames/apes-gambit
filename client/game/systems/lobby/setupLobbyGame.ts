import {
  Assets,
  CHESS_TILEMAP_ID,
  DEFAULT_MOVE_VALIDATOR_CONFIG,
  LOBBY_DISPLAY_GRID_SIZE,
  TILE_HEIGHT,
  TILE_WIDTH,
} from "../../constants";
import { Game, Scene } from "../../types";

import { Network } from "../../../network/types";
import createChessBoardTilemap from "../../utils/createChessBoardTilemap";
import createMoveValidator from "../../utils/createMoveValidator";
import createTileOverlayManager from "../../utils/createTileOverlayManager";
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

  const moveValidator = createMoveValidator(DEFAULT_MOVE_VALIDATOR_CONFIG);

  const lobbyContext = {
    moveValidator,
    tileOverlayManager: createTileOverlayManager(
      network,
      game,
      scene,
      moveValidator
    ),
  };

  setupLobbySystems(network, game, lobbyContext);

  return lobbyContext;
};

export default setupLobbyGame;
