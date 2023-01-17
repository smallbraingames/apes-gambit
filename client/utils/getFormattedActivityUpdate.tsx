import { EntityIndex } from "@latticexyz/recs";
import { PieceType } from "../network/types";
import getPieceInfo from "./getPieceInfo";

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

export const getFormattedPieceDeathUpdate = (
  takerEntity: EntityIndex,
  deadEntity: EntityIndex
): JSX.Element => {
  return (
    <div>
      <div>
        {takerEntity} took {deadEntity}
      </div>
    </div>
  );
};
