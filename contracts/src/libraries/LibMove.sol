// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { PieceType } from "common/PieceType.sol";
import { Coord } from "std-contracts/components/CoordComponent.sol";
import { UnimplementedPieceType } from "common/Errors.sol";

library LibMove {
  function isValidMove(
    Coord memory startPosition,
    Coord memory endPosition,
    PieceType pieceType
  ) internal pure returns (bool) {
    if (pieceType == PieceType.PAWN) {
      // Includes diagonals, and allows for movement in all four directions
      return isValidMoveKing(startPosition, endPosition);
    } else if (pieceType == PieceType.BISHOP) {
      return isValidMoveBishop(startPosition, endPosition);
    } else if (pieceType == PieceType.KNIGHT) {
      return isValidMoveKnight(startPosition, endPosition);
    } else if (pieceType == PieceType.ROOK) {
      return isValidMoveRook(startPosition, endPosition);
    } else if (pieceType == PieceType.QUEEN) {
      return isValidMoveQueen(startPosition, endPosition);
    } else if (pieceType == PieceType.KING) {
      return isValidMoveKing(startPosition, endPosition);
    }

    revert UnimplementedPieceType();
  }

  /// @notice Returns if a king can move from startPosition to endPosition
  function isValidMoveKing(Coord memory startPosition, Coord memory endPosition) internal pure returns (bool) {
    return (abs(startPosition.x - endPosition.x) <= 1) && (abs(startPosition.y - endPosition.y) <= 1);
  }

  /// @notice Returns if a bishop can move from startPosition to endPosition
  function isValidMoveBishop(Coord memory startPosition, Coord memory endPosition) internal pure returns (bool) {
    return abs(startPosition.x - endPosition.x) == abs(startPosition.y - endPosition.y);
  }

  /// @notice Returns if a knight can move from startPosition to endPosition
  function isValidMoveKnight(Coord memory startPosition, Coord memory endPosition) internal pure returns (bool) {
    return abs((startPosition.x - endPosition.x) * (startPosition.y - endPosition.y)) == 2;
  }

  /// @notice Returns if a rook can move from startPosition to endPosition
  function isValidMoveRook(Coord memory startPosition, Coord memory endPosition) internal pure returns (bool) {
    return (startPosition.x == endPosition.x) || (startPosition.y == endPosition.y);
  }

  /// @notice Returns if a queen can move from startPosition to endPosition
  function isValidMoveQueen(Coord memory startPosition, Coord memory endPosition) internal pure returns (bool) {
    return isValidMoveBishop(startPosition, endPosition) || isValidMoveRook(startPosition, endPosition);
  }

  /// @notice Returns the absolute value of an integer
  function abs(int32 n) internal pure returns (uint32) {
    return uint32(n >= 0 ? n : -n);
  }
}
