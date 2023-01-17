import { PieceType } from "../network/types";

type PieceInfo = {
  name: string;
  points: number;
  image: string;
};

const getPieceInfo = (pieceType: PieceType): PieceInfo => {
  switch (pieceType) {
    case PieceType.PAWN:
      return { name: "PAWN", points: 1, image: "assets/sprites/main/pawn.svg" };
    case PieceType.BISHOP:
      return {
        name: "BISHOP",
        points: 3,
        image: "assets/sprites/main/bishop.svg",
      };
    case PieceType.KNIGHT:
      return {
        name: "KNIGHT",
        points: 3,
        image: "assets/sprites/main/knight.svg",
      };
    case PieceType.ROOK:
      return { name: "ROOK", points: 5, image: "assets/sprites/main/rook.svg" };
    case PieceType.QUEEN:
      return {
        name: "QUEEN",
        points: 9,
        image: "assets/sprites/main/queen.svg",
      };
    case PieceType.KING:
      return {
        name: "KING",
        points: 100,
        image: "assets/sprites/main/king.svg",
      };
  }
};

export default getPieceInfo;
