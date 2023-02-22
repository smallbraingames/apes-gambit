import { Coord } from "@latticexyz/utils";
import { PieceType } from "../../../network/types";

export type MoveValidatorConfig = { [key in PieceType]: number };

const createMoveValidator = (config: MoveValidatorConfig) => {
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
    switch (pieceType) {
      case PieceType.PAWN:
        return new Set([
          { x: position.x + 1, y: position.y },
          { x: position.x - 1, y: position.y },
          { x: position.x, y: position.y + 1 },
          { x: position.x, y: position.y - 1 },
        ]);
      case PieceType.KNIGHT:
        return new Set([
          { x: position.x + 2, y: position.y + 1 },
          { x: position.x + 2, y: position.y - 1 },
          { x: position.x - 2, y: position.y + 1 },
          { x: position.x - 2, y: position.y - 1 },
          { x: position.x + 1, y: position.y + 2 },
          { x: position.x + 1, y: position.y - 2 },
          { x: position.x - 1, y: position.y + 2 },
          { x: position.x - 1, y: position.y - 2 },
        ]);
      case PieceType.BISHOP:
        return getValidBishopMoves(position, getPieceLimit(PieceType.BISHOP));
      case PieceType.ROOK:
        return getValidRookMoves(position, getPieceLimit(PieceType.ROOK));
      case PieceType.QUEEN:
        return new Set([
          ...getValidBishopMoves(position, getPieceLimit(PieceType.QUEEN)),
          ...getValidRookMoves(position, getPieceLimit(PieceType.QUEEN)),
        ]);
    }
    throw Error(
      `Cannot get valid moves for unimplemented piece type ${pieceType}`
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

  return { getValidMoves, isMoveValid };
};

export default createMoveValidator;
