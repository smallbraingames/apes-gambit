import { EntityIndex } from "@latticexyz/recs";
import { PieceType } from "../network/types";
import getPieceInfo from "./getPieceName";

export const getFormattedPieceTypeUpdate = (
  pieceEntity: EntityIndex,
  pieceType: PieceType
): JSX.Element => {
  return (
    <div>
      <div>
        {pieceEntity} switched to {getPieceInfo(pieceType).name}
      </div>
    </div>
  );
};
