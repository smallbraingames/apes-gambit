// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { IWorld, WorldQueryFragment } from "solecs/World.sol";
import { QueryType } from "solecs/LibQuery.sol";
import { Coord } from "std-contracts/components/CoordComponent.sol";
import { PieceType } from "common/PieceType.sol";
import { OwnerComponent } from "components/OwnerComponent.sol";
import { ControllerComponent } from "components/ControllerComponent.sol";
import { BRGameComponent } from "components/BRGameComponent.sol";
import { BRInGameComponent, ID as BRInGameComponentID } from "components/BRInGameComponent.sol";
import { BRIsAliveComponent } from "components/BRIsAliveComponent.sol";
import { BRPointsComponent } from "components/BRPointsComponent.sol";
import { BRPreviousMoveTimestampComponent } from "components/BRPreviousMoveTimestampComponent.sol";
import { PiecePositionComponent, ID as PiecePositionComponentID } from "components/PiecePositionComponent.sol";
import { BRPieceDead, BRNotEnoughPoints, BRNotRecharged, BRIncorrectControllers } from "common/BRErrors.sol";
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

  /// @notice Kills all pieces that are out of bounds
  function killPiecesOutOfBounds(
    IWorld world,
    BRGameComponent brGameComponent,
    BRIsAliveComponent brIsAliveComponent,
    PiecePositionComponent piecePositionComponent,
    uint256 game
  ) internal {
    (uint256[] memory pieces, uint256 numPiecesOutOfBounds) = getPiecesOutOfBounds(
      world,
      brGameComponent,
      piecePositionComponent,
      game
    );
    for (uint256 i = 0; i < numPiecesOutOfBounds; i++) {
      brIsAliveComponent.remove(pieces[i]);
    }
  }

  /// @notice Get pieces that are not in bounds
  function getPiecesOutOfBounds(
    IWorld world,
    BRGameComponent brGameComponent,
    PiecePositionComponent piecePositionComponent,
    uint256 game
  ) internal view returns (uint256[] memory, uint256) {
    uint256[] memory pieces = getPiecesInGame(world, game);
    uint256[] memory outOfBoundsPieces = new uint256[](pieces.length);
    uint256 numPiecesOutOfBounds = 0;
    for (uint256 i = 0; i < pieces.length; i++) {
      if (!BRLibGame.isPositionInBounds(brGameComponent, game, piecePositionComponent.getValue(pieces[i]))) {
        outOfBoundsPieces[numPiecesOutOfBounds] = pieces[i];
        numPiecesOutOfBounds++;
      }
    }
    return (outOfBoundsPieces, numPiecesOutOfBounds);
  }

  /// @notice Gets all the pieces in a game
  function getPiecesInGame(IWorld world, uint256 game) internal view returns (uint256[] memory) {
    WorldQueryFragment[] memory fragments = new WorldQueryFragment[](2);
    fragments[0] = WorldQueryFragment(QueryType.HasValue, BRInGameComponentID, abi.encode(game));
    fragments[1] = WorldQueryFragment(QueryType.Has, PiecePositionComponentID, new bytes(0));
    return world.query(fragments);
  }

  /// @notice Checks whether a piece has enough charge to make a move
  function checkIsRecharged(
    BRPreviousMoveTimestampComponent brPreviousMoveTimestampComponent,
    BRGameComponent brGameComponent,
    uint256 piece,
    uint256 game
  ) internal view {
    if (!brPreviousMoveTimestampComponent.has(piece)) {
      return;
    }
    uint256 previousMoveTimestamp = brPreviousMoveTimestampComponent.getValue(piece);
    uint32 rechargeTime = brGameComponent.getValue(game).rechargeTime;
    if (previousMoveTimestamp + rechargeTime > block.timestamp) {
      revert BRNotRecharged();
    }
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
  function checkPieceControllers(ControllerComponent controllerComponent, uint256 entity) internal view {
    uint256[] memory controllers = controllerComponent.getValue(entity);
    if (controllers.length != 2) {
      revert BRIncorrectControllers();
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
