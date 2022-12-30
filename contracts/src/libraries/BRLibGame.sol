// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { BRGame, BRGameStatus } from "common/BRGame.sol";
import { Coord } from "std-contracts/components/CoordComponent.sol";
import { OwnerComponent } from "components/OwnerComponent.sol";
import { ControllerComponent } from "components/ControllerComponent.sol";
import { BRGameComponent } from "components/BRGameComponent.sol";
import { BRInGameComponent } from "components/BRInGameComponent.sol";
import { BRIsAliveComponent } from "components/BRIsAliveComponent.sol";
import { PiecePositionComponent } from "components/PiecePositionComponent.sol";
import { BRIncorrectControllers, BRGameNotStarted, BREntityNotGame, BRGameAlreadyStarted, BRAlreadyInGame, BRGameNotInProgress, BRNotInGame, BRPieceDead, BRBeforeStartTime } from "common/BRErrors.sol";
import { LibOwner } from "libraries/LibOwner.sol";

library BRLibGame {
  /// @notice Gets the piece alive in this game at a position if there is one
  /// If there is not, returns 0 for the piece and false for the hasPiece
  function getPieceAt(
    PiecePositionComponent piecePositionComponent,
    BRInGameComponent brInGameComponent,
    BRIsAliveComponent brIsAliveComponent,
    Coord memory position,
    uint256 game
  ) internal view returns (bool hasPiece, uint256 piece) {
    uint256[] memory collidedPieces = piecePositionComponent.getEntitiesWithValue(abi.encode(position));
    for (uint256 i = 0; i < collidedPieces.length; i++) {
      uint256 collidedPiece = collidedPieces[i];
      // There can only be one alive piece in a game at a given position
      // so return the first one found
      if (isPieceInGame(brInGameComponent, collidedPiece, game) && isPieceAlive(brIsAliveComponent, collidedPiece)) {
        return (true, collidedPiece);
      }
    }
    return (false, 0);
  }

  /// @notice Checks whether msg.sender can move or upgrade a piece in a game
  /// Specifically, checks that 1) the piece has the right owner and controllers
  /// 2) the game is in progress 3) the piece has joined the game
  /// 4) the piece is alive
  function checkCanPlay(
    OwnerComponent ownerComponent,
    ControllerComponent controllerComponent,
    BRGameComponent brGameComponent,
    BRInGameComponent brInGameComponent,
    BRIsAliveComponent brIsAliveComponent,
    uint256 piece,
    uint256 game,
    address ownerCheckAddress
  ) internal view {
    // Check that piece has the correct owner and controllers
    BRLibGame.checkPieceOwnerAndControllers(ownerComponent, controllerComponent, piece, ownerCheckAddress);

    // Check that game is in progress
    BRLibGame.checkGameInProgress(brGameComponent, game);

    // Check that piece is currently in the  game
    BRLibGame.checkPieceInGame(brInGameComponent, piece, game);

    // Check that the piece is alive
    BRLibGame.checkPieceIsAlive(brIsAliveComponent, piece);
  }

  /// @notice Checks whether a piece has the correct associated controllers and that the passed owner
  /// is the correct owner, used to validate that the called of BR contracts has authority to move or
  /// modify the piece they are trying to
  function checkPieceOwnerAndControllers(
    OwnerComponent ownerComponent,
    ControllerComponent controllerComponent,
    uint256 entity,
    address ownerCheckAddress
  ) internal view {
    LibOwner.checkIsOwner(ownerComponent, entity, ownerCheckAddress);
    checkPieceControllers(controllerComponent, entity);
  }

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

  /// @notice Checks whether a piece has the correct associated controllers
  function checkPieceControllers(ControllerComponent controllerComponent, uint256 entity) internal view {}

  /// @notice Checks if a game is in progress
  function checkGameInProgress(BRGameComponent brGameComponent, uint256 game) internal view {
    BRGame memory brGame = getGame(brGameComponent, game);
    if (brGame.status != BRGameStatus.IN_PROGRESS) {
      revert BRGameNotInProgress();
    }
  }

  /// @notice Checks if a piece is alive in a game
  function checkPieceIsAlive(BRIsAliveComponent brIsAliveComponent, uint256 piece) internal view {
    if (isPieceAlive(brIsAliveComponent, piece)) {
      return;
    }
    revert BRPieceDead();
  }

  /// @notice Returns whether a piece is alive in a game
  function isPieceAlive(BRIsAliveComponent brIsAliveComponent, uint256 piece) internal view returns (bool) {
    if (!brIsAliveComponent.has(piece)) {
      return false;
    }
    bool isAlive = brIsAliveComponent.getValue(piece);
    return isAlive;
  }

  /// @notice Checks if a game has not yet started
  function checkGameNotStarted(BRGameComponent brGameComponent, uint256 game) internal view {
    BRGame memory brGame = getGame(brGameComponent, game);
    if (brGame.status != BRGameStatus.NOT_STARTED) {
      revert BRGameAlreadyStarted();
    }
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

  /// @notice Gets the game at an entity
  function getGame(BRGameComponent brGameComponent, uint256 game) internal view returns (BRGame memory) {
    if (!brGameComponent.has(game)) {
      revert BREntityNotGame();
    }
    BRGame memory brGame = brGameComponent.getValue(game);
    return brGame;
  }
}
