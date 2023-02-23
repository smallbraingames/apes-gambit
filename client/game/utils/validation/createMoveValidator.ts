import { Coord, coordToKey } from "@latticexyz/utils";

import { PieceType } from "../../../network/types";

export type MoveValidatorConfig = { [key in PieceType]: number };

const createMoveValidator = (config: MoveValidatorConfig) => {
  const invalidPositions: Set<number> = new Set();

  const getPieceLimit = (pieceType: PieceType): number => {
    return config[pieceType];
  };

  const getValidBishopMoves = (position: Coord, limit: number): Set<Coord> => {
    const moves = new Set<Coord>();
    for (let i = 1; i <= limit; i++) {
      moves.add({ x: position.x + i, y: position.y + i });
      moves.add({ x: position.x - i, y: position.y + i });
      moves.add({ x: position.x + i, y: position.y - i });
      moves.add({ x: position.x - i, y: position.y - i });
    }
    return moves;
  };

  const getValidRookMoves = (position: Coord, limit: number): Set<Coord> => {
    const moves = new Set<Coord>();
    for (let i = 1; i <= limit; i++) {
      moves.add({ x: position.x + i, y: position.y });
      moves.add({ x: position.x - i, y: position.y });
      moves.add({ x: position.x, y: position.y + i });
      moves.add({ x: position.x, y: position.y - i });
    }
    return moves;
  };

  const getValidMoves = (pieceType: PieceType, position: Coord): Set<Coord> => {
    let validMoves: Set<Coord> = new Set();
    switch (pieceType) {
      case PieceType.PAWN:
        validMoves = new Set([
          { x: position.x + 1, y: position.y },
          { x: position.x - 1, y: position.y },
          { x: position.x, y: position.y + 1 },
          { x: position.x, y: position.y - 1 },
        ]);
        break;
      case PieceType.KNIGHT:
        validMoves = new Set([
          { x: position.x + 2, y: position.y + 1 },
          { x: position.x + 2, y: position.y - 1 },
          { x: position.x - 2, y: position.y + 1 },
          { x: position.x - 2, y: position.y - 1 },
          { x: position.x + 1, y: position.y + 2 },
          { x: position.x + 1, y: position.y - 2 },
          { x: position.x - 1, y: position.y + 2 },
          { x: position.x - 1, y: position.y - 2 },
        ]);
        break;
      case PieceType.BISHOP:
        validMoves = getValidBishopMoves(
          position,
          getPieceLimit(PieceType.BISHOP)
        );
        break;
      case PieceType.ROOK:
        validMoves = getValidRookMoves(position, getPieceLimit(PieceType.ROOK));
        break;
      case PieceType.QUEEN:
        validMoves = new Set([
          ...getValidBishopMoves(position, getPieceLimit(PieceType.QUEEN)),
          ...getValidRookMoves(position, getPieceLimit(PieceType.QUEEN)),
        ]);
        break;
    }
    return new Set(
      [...validMoves].filter((move) => !invalidPositions.has(coordToKey(move)))
    );
  };

  // TODO: efficiency
  const isMoveValid = (
    startPosition: Coord,
    endPosition: Coord,
    pieceType: PieceType
  ): boolean => {
    const coordToKey = (coord: Coord) => `${coord.x};${coord.y}`;
    return new Set(
      [...getValidMoves(pieceType, startPosition)].map((coord) =>
        coordToKey(coord)
      )
    ).has(coordToKey(endPosition));
  };

  const addInvalidPosition = (position: Coord) => {
    invalidPositions.add(coordToKey(position));
  };

  return { getValidMoves, isMoveValid, addInvalidPosition };
};

export default createMoveValidator;
