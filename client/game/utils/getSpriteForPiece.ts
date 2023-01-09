import { EntityIndex, getComponentValue } from "@latticexyz/recs";
import { Network, PieceType } from "../../network/types";

import { Sprites } from "../constants";

const getSpriteForPiece = (
  pieceEntity: EntityIndex,
  network: Network
): Sprites => {
  const pieceType: PieceType | undefined = getComponentValue(
    network.components.PieceType,
    pieceEntity
  )?.value;
  if (pieceType === undefined) throw Error("Piece type not found");
  // Don't worry about the owner / active piece logic rn
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
      return Sprites.MainQueen;
  }
};

export default getSpriteForPiece;
