import { PieceType } from "../network/types";

const getPieceName = (pieceType: PieceType): string => {
  switch (pieceType) {
    case PieceType.PAWN:
      return "PAWN";
    case PieceType.BISHOP:
      return "BISHOP";
    case PieceType.KNIGHT:
      return "KNIGHT";
    case PieceType.ROOK:
      return "ROOK";
    case PieceType.QUEEN:
      return "QUEEN";
    case PieceType.KING:
      return "KING";
  }
};

export default getPieceName;
