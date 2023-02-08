// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { Coord } from "std-contracts/components/CoordComponent.sol";
import { BRGame, BRGameStatus } from "common/BRGame.sol";
import { BRGameComponent } from "components/BRGameComponent.sol";
import { BRInGameComponent } from "components/BRInGameComponent.sol";
import { PiecePositionComponent } from "components/PiecePositionComponent.sol";
import { BRBeforeStartTime, BRGameNotInProgress, BRGameAlreadyStarted, BREntityNotGame, BRNotInGame, BRAlreadyInGame } from "common/BRErrors.sol";

library BRLibGame {
  /// @notice Starts the game if it can be started, specifically if we are past the startTime
  function startGameChecked(BRGameComponent brGameComponent, uint256 game) internal {
    // Check that the game has not been started yet
    checkGameNotStarted(brGameComponent, game);

    // Check we are past the start time
    BRGame memory brGame = getGame(brGameComponent, game);
    if (block.timestamp < brGame.startTime) {
      revert BRBeforeStartTime();
    }

    // Start game
    brGame.status = BRGameStatus.IN_PROGRESS;
    brGameComponent.set(game, brGame);
  }

  /// @notice Checks if a game is in progress
  function checkGameInProgress(BRGameComponent brGameComponent, uint256 game) internal view {
    BRGame memory brGame = getGame(brGameComponent, game);
    if (brGame.status != BRGameStatus.IN_PROGRESS) {
      revert BRGameNotInProgress();
    }
  }

  /// @notice Checks if a game has not yet started
  function checkGameNotStarted(BRGameComponent brGameComponent, uint256 game) internal view {
    BRGame memory brGame = getGame(brGameComponent, game);
    if (brGame.status != BRGameStatus.NOT_STARTED) {
      revert BRGameAlreadyStarted();
    }
  }

  /// @notice Gets whether a position is within bounds
  function isPositionInBounds(
    BRGameComponent brGameComponent,
    uint256 game,
    Coord memory position
  ) internal view returns (bool) {
    checkGameInProgress(brGameComponent, game);
    BRGame memory brGame = getGame(brGameComponent, game);
    int32 currentGridDim = int32(
      getCurrentGridDim(brGame.initialGridDim, brGame.secondsPerGridShrink, brGame.startTime)
    );
    bool isXInBounds = (position.x <= currentGridDim) && (position.x >= (-1 * currentGridDim));
    bool isYInBounds = (position.y <= currentGridDim) && (position.y >= (-1 * currentGridDim));
    return isXInBounds && isYInBounds;
  }

  /// @notice Gets the current gridDim (which is half the side length of a grid)
  function getCurrentGridDim(
    uint16 initialGridDim,
    uint16 secondsPerGridShrink,
    uint256 startTime
  ) internal view returns (uint32) {
    uint16 secondsSinceStart = uint16(block.timestamp - startTime);
    uint16 gridDimSubtractor = secondsSinceStart / secondsPerGridShrink;
    if (gridDimSubtractor >= initialGridDim) {
      return 0;
    }
    return initialGridDim - gridDimSubtractor;
  }

  /// @notice Gets the game at an entity
  function getGame(BRGameComponent brGameComponent, uint256 game) internal view returns (BRGame memory) {
    if (!brGameComponent.has(game)) {
      revert BREntityNotGame();
    }
    BRGame memory brGame = brGameComponent.getValue(game);
    return brGame;
  }

  /// @notice Checks that a piece is not in a game
  function checkPieceInGame(
    BRInGameComponent brInGameComponent,
    uint256 piece,
    uint256 game
  ) internal view {
    if (isPieceInGame(brInGameComponent, piece, game)) {
      return;
    }
    revert BRNotInGame();
  }

  /// @notice Checks that a piece is not in a game
  function checkPieceNotInGame(BRInGameComponent brInGameComponent, uint256 piece) internal view {
    if (brInGameComponent.has(piece)) {
      revert BRAlreadyInGame();
    }
  }

  /// @notice Returns whether a piece is in a game
  function isPieceInGame(
    BRInGameComponent brInGameComponent,
    uint256 piece,
    uint256 game
  ) internal view returns (bool) {
    if (!brInGameComponent.has(piece)) {
      return false;
    }
    uint256 inGame = brInGameComponent.getValue(piece);
    if (inGame == game) {
      return true;
    }
    return false;
  }
}
