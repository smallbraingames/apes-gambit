// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { Coord } from "std-contracts/components/CoordComponent.sol";
import { PieceType } from "common/PieceType.sol";
import { OwnerComponent } from "components/OwnerComponent.sol";
import { ControllerComponent } from "components/ControllerComponent.sol";
import { BRGameComponent } from "components/BRGameComponent.sol";
import { BRInGameComponent } from "components/BRInGameComponent.sol";
import { BRIsAliveComponent } from "components/BRIsAliveComponent.sol";
import { BRPointsComponent } from "components/BRPointsComponent.sol";
import { PiecePositionComponent } from "components/PiecePositionComponent.sol";
import { BRPieceDead, BRNotEnoughPoints } from "common/BRErrors.sol";
import { UnimplementedPieceType } from "common/Errors.sol";
import { BRLibGame } from "libraries/BRLibGame.sol";
import { LibOwner } from "libraries/LibOwner.sol";

library BRLibPiece {
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
      if (
        BRLibGame.isPieceInGame(brInGameComponent, collidedPiece, game) &&
        isPieceAlive(brIsAliveComponent, collidedPiece)
      ) {
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
    BRLibPiece.checkPieceOwnerAndControllers(ownerComponent, controllerComponent, piece, ownerCheckAddress);

    // Check that game is in progress
    BRLibGame.checkGameInProgress(brGameComponent, game);

    // Check that piece is currently in the  game
    BRLibGame.checkPieceInGame(brInGameComponent, piece, game);

    // Check that the piece is alive
    BRLibPiece.checkPieceIsAlive(brIsAliveComponent, piece);
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

  /// @notice Checks whether a piece has the correct associated controllers
  function checkPieceControllers(ControllerComponent controllerComponent, uint256 entity) internal view {}

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

  /// @notice Increments the points of a given entity
  function incrementPoints(
    BRPointsComponent brPointsComponent,
    uint256 piece,
    uint32 increment
  ) internal {
    if (!brPointsComponent.has(piece)) {
      brPointsComponent.set(piece, increment);
      return;
    }
    uint32 previousPoints = brPointsComponent.getValue(piece);
    brPointsComponent.set(piece, previousPoints + increment);
  }

  /// @notice Increments the points of a given entity
  function decrementPoints(
    BRPointsComponent brPointsComponent,
    uint256 piece,
    uint32 decrement
  ) internal {
    if (!brPointsComponent.has(piece)) {
      revert BRNotEnoughPoints();
    }
    uint32 previousPoints = brPointsComponent.getValue(piece);
    if (decrement > previousPoints) {
      revert BRNotEnoughPoints();
    }
    brPointsComponent.set(piece, previousPoints - decrement);
  }

  /// @notice Returns the points for a given piece type
  function getPointsFromPieceType(PieceType pieceType) internal pure returns (uint32) {
    if (pieceType == PieceType.PAWN) {
      return 1;
    } else if (pieceType == PieceType.KNIGHT || pieceType == PieceType.BISHOP) {
      return 3;
    } else if (pieceType == PieceType.ROOK) {
      return 5;
    } else if (pieceType == PieceType.QUEEN) {
      return 9;
    }
    revert UnimplementedPieceType();
  }
}
