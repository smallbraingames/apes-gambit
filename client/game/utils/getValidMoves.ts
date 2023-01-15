import { Coord } from "@latticexyz/utils";
import { PieceType } from "../../network/types";

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

const getValidMoves = (
  pieceType: PieceType,
  position: Coord,
  limit: number = 5
): Set<Coord> => {
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
      return getValidBishopMoves(position, limit);
    case PieceType.ROOK:
      return getValidRookMoves(position, limit);
    case PieceType.QUEEN:
      return new Set([
        ...getValidBishopMoves(position, limit),
        ...getValidRookMoves(position, limit),
      ]);
  }
  throw Error(
    `Cannot get valid moves for unimplemented piece type ${pieceType}`
  );
};

export default getValidMoves;
