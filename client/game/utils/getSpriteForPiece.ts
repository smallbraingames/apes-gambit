import { EntityIndex, getComponentValue } from "@latticexyz/recs";
import { Network, PieceType } from "../../network/types";

import { Sprites } from "../constants";

const getSpriteForPiece = (
  pieceEntity: EntityIndex,
  network: Network,
  isEnemy: boolean = false
): Sprites => {
  const pieceType: PieceType | undefined = getComponentValue(
    network.components.PieceType,
    pieceEntity
  )?.value;
  if (pieceType === undefined) throw Error("Piece type not found");

  if (isEnemy) {
    switch (pieceType) {
      case PieceType.PAWN:
        return Sprites.EnemyPawn;
      case PieceType.BISHOP:
        return Sprites.EnemyBishop;
      case PieceType.KNIGHT:
        return Sprites.EnemyKnight;
      case PieceType.ROOK:
        return Sprites.EnemyRook;
      case PieceType.QUEEN:
        return Sprites.EnemyQueen;
      case PieceType.KING:
        return Sprites.EnemyKing;
    }
  }

  switch (pieceType) {
    case PieceType.PAWN:
      return Sprites.MainPawn;
    case PieceType.BISHOP:
      return Sprites.MainBishop;
    case PieceType.KNIGHT:
      return Sprites.MainKnight;
    case PieceType.ROOK:
      return Sprites.MainRook;
    case PieceType.QUEEN:
      return Sprites.MainQueen;
    case PieceType.KING:
      return Sprites.MainKing;
  }
};

export default getSpriteForPiece;
