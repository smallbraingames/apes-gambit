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
import createChessBoardTilemap from "../../utils/tilemap/createChessBoardTilemap";
import createEmbodiedBRGameEntrance from "../../utils/createEmbodiedBRGameEntrance";
import createMoveValidator from "../../utils/validation/createMoveValidator";
import createRechargeOverlayManager from "../../utils/createRechargeOverlayManager";
import createSpeechBubbleManager from "../../utils/chat/createSpeechBubbleManager";
import createValidMoveTileOverlayManager from "../../utils/validation/createValidMoveTileOverlayManager";
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
  const speechBubbleManager = createSpeechBubbleManager(scene);

  const lobbyContext = {
    moveValidator,
    tileOverlayManager: createValidMoveTileOverlayManager(
      network,
      game,
      scene,
      moveValidator
    ),
    speechBubbleManager,
  };

  const positions = createEmbodiedBRGameEntrance(
    network,
    game,
    { x: 3, y: 3 },
    scene
  );
  console.log("invalid positoins", positions);
  positions.forEach((position) => moveValidator.addInvalidPosition(position));

  setupLobbySystems(network, game, lobbyContext);

  return lobbyContext;
};

export default setupLobbyGame;
