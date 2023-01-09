import { createNetwork } from "./createNetwork";
export type Network = Awaited<ReturnType<typeof createNetwork>>;

export enum PieceType {
  PAWN = 0,
  BISHOP = 1,
  KNIGHT = 2,
  ROOK = 3,
  QUEEN = 4,
  KING = 5,
}
