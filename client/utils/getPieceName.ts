import { PieceType } from "../network/types";

const getPieceInfo = (
  pieceType: PieceType
): { name: string; points: number } => {
  switch (pieceType) {
    case PieceType.PAWN:
      return { name: "PAWN", points: 1 };
    case PieceType.BISHOP:
      return { name: "BISHOP", points: 3 };
    case PieceType.KNIGHT:
      return { name: "KNIGHT", points: 3 };
    case PieceType.ROOK:
      return { name: "ROOK", points: 5 };
    case PieceType.QUEEN:
      return { name: "QUEEN", points: 9 };
    case PieceType.KING:
      return { name: "PAWN", points: 100 };
  }
};

export default getPieceInfo;
