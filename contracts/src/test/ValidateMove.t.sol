// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { PieceType } from "common/PieceType.sol";
import { Coord } from "std-contracts/components/CoordComponent.sol";
import { LibMove } from "libraries/LibMove.sol";

import { Deploy } from "./Deploy.sol";
import "std-contracts/test/MudTest.t.sol";
import { console } from "forge-std/console.sol";

contract ValidateMoveTest is MudTest {
  constructor() MudTest(new Deploy()) {}

  function testValidatePawnMove() public {
    // Valid moves
    assertTrue(LibMove.isValidMove(Coord({ x: 0, y: 0 }), Coord({ x: -1, y: -1 }), PieceType.PAWN));
    assertTrue(LibMove.isValidMove(Coord({ x: 10, y: 10 }), Coord({ x: 11, y: 10 }), PieceType.PAWN));
    assertTrue(LibMove.isValidMove(Coord({ x: -5, y: -5 }), Coord({ x: -5, y: -4 }), PieceType.PAWN));

    // Invalid moves
    assertTrue(!LibMove.isValidMove(Coord({ x: 0, y: 0 }), Coord({ x: -1, y: 2 }), PieceType.PAWN));
    assertTrue(!LibMove.isValidMove(Coord({ x: 10, y: 10 }), Coord({ x: 12, y: 10 }), PieceType.PAWN));
    assertTrue(!LibMove.isValidMove(Coord({ x: -1, y: -10 }), Coord({ x: 30, y: 13 }), PieceType.PAWN));
  }

  function testValidateBishopMove() public {
    // Valid moves
    assertTrue(LibMove.isValidMove(Coord({ x: 0, y: 0 }), Coord({ x: -100, y: 100 }), PieceType.BISHOP));
    assertTrue(LibMove.isValidMove(Coord({ x: 10, y: 10 }), Coord({ x: 50, y: 50 }), PieceType.BISHOP));
    assertTrue(LibMove.isValidMove(Coord({ x: -4, y: -2 }), Coord({ x: -5, y: -3 }), PieceType.BISHOP));

    // Invalid moves
    assertTrue(!LibMove.isValidMove(Coord({ x: 0, y: 0 }), Coord({ x: 12, y: 10 }), PieceType.BISHOP));
    assertTrue(!LibMove.isValidMove(Coord({ x: 10, y: 10 }), Coord({ x: 1, y: 10 }), PieceType.BISHOP));
    assertTrue(!LibMove.isValidMove(Coord({ x: -4, y: -3 }), Coord({ x: -5, y: -6 }), PieceType.BISHOP));
  }

  function testValidateKnightMove() public {
    // Valid moves
    assertTrue(LibMove.isValidMove(Coord({ x: 0, y: 0 }), Coord({ x: 2, y: 1 }), PieceType.KNIGHT));
    assertTrue(LibMove.isValidMove(Coord({ x: 10, y: 10 }), Coord({ x: 12, y: 9 }), PieceType.KNIGHT));
    assertTrue(LibMove.isValidMove(Coord({ x: -3, y: -1 }), Coord({ x: -2, y: -3 }), PieceType.KNIGHT));

    // Invalid moves
    assertTrue(!LibMove.isValidMove(Coord({ x: 0, y: 0 }), Coord({ x: 22, y: 13 }), PieceType.KNIGHT));
    assertTrue(!LibMove.isValidMove(Coord({ x: 0, y: 0 }), Coord({ x: 2, y: 3 }), PieceType.KNIGHT));
    assertTrue(!LibMove.isValidMove(Coord({ x: -10, y: 10 }), Coord({ x: -12, y: 13 }), PieceType.KNIGHT));
  }

  function testValidateMoveRook() public {
    // Valid moves
    assertTrue(LibMove.isValidMove(Coord({ x: 0, y: 0 }), Coord({ x: 0, y: 100 }), PieceType.ROOK));
    assertTrue(LibMove.isValidMove(Coord({ x: 10, y: 10 }), Coord({ x: 100, y: 10 }), PieceType.ROOK));
    assertTrue(LibMove.isValidMove(Coord({ x: -10, y: 10 }), Coord({ x: -10, y: -10 }), PieceType.ROOK));

    // Invalid moves
    assertTrue(!LibMove.isValidMove(Coord({ x: 0, y: 0 }), Coord({ x: 22, y: 13 }), PieceType.ROOK));
    assertTrue(!LibMove.isValidMove(Coord({ x: 0, y: 0 }), Coord({ x: 1, y: 1 }), PieceType.ROOK));
    assertTrue(!LibMove.isValidMove(Coord({ x: -10, y: 10 }), Coord({ x: -12, y: 11 }), PieceType.ROOK));
  }

  function testValidateMoveQueen() public {
    // Valid moves
    assertTrue(LibMove.isValidMove(Coord({ x: 0, y: 0 }), Coord({ x: 1, y: 0 }), PieceType.QUEEN));
    assertTrue(LibMove.isValidMove(Coord({ x: 10, y: 10 }), Coord({ x: 11, y: 11 }), PieceType.QUEEN));
    assertTrue(LibMove.isValidMove(Coord({ x: -10, y: -20 }), Coord({ x: 0, y: -20 }), PieceType.QUEEN));

    // Invalid moves
    assertTrue(!LibMove.isValidMove(Coord({ x: 0, y: 0 }), Coord({ x: 1, y: 2 }), PieceType.QUEEN));
    assertTrue(!LibMove.isValidMove(Coord({ x: 10, y: 11 }), Coord({ x: 3, y: 5 }), PieceType.QUEEN));
    assertTrue(!LibMove.isValidMove(Coord({ x: -100, y: -90 }), Coord({ x: 0, y: 0 }), PieceType.QUEEN));
  }
}
