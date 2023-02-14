import { EntityIndex, getComponentValueStrict } from "@latticexyz/recs";
import { Network, PieceType } from "../network/types";

import { Coord } from "@latticexyz/utils";
import getPieceInfo from "./getPieceInfo";

const createActivityUpdateFormatter = (network: Network) => {
  const getPieceOwner = (piece: EntityIndex): string => {
    const {
      components: { Owner },
    } = network;
    return getComponentValueStrict(Owner, piece).value;
  };

  const getPieceDisplay = (piece: EntityIndex): JSX.Element => {
    const {
      components: { PieceType },
    } = network;
    const pieceType = getComponentValueStrict(PieceType, piece)
      .value as PieceType;
    const pieceInfo = getPieceInfo(pieceType);

    return (
      <div className="flex items-center">
        <div>{getPieceOwner(piece).substring(0, 5)} </div>
        <div>
          <img className="h-10 w-10" src={pieceInfo.image} />
        </div>
      </div>
    );
  };

  const getPieceTypeUpdate = (
    pieceEntity: EntityIndex,
    pieceType: PieceType
  ): JSX.Element => {
    return (
      <div className="flex items-center">
        <div>{getPieceDisplay(pieceEntity)}</div>
        <div>switched to {getPieceInfo(pieceType).name}</div>
      </div>
    );
  };

  const getPieceDeathUpdate = (
    takerEntity: EntityIndex,
    deadEntity: EntityIndex
  ): JSX.Element => {
    return (
      <div className="flex items-center">
        <div></div>
        <div>took</div>
        <div>{getPieceDisplay(deadEntity)}</div>
      </div>
    );
  };

  const getPieceMoveUpdate = (
    pieceEntity: EntityIndex,
    piecePosition: Coord
  ): JSX.Element => {
    return (
      <div className="flex items-center">
        <div>{getPieceDisplay(pieceEntity)}</div>
        <div>
          moved to ({piecePosition.x},{piecePosition.y})
        </div>
      </div>
    );
  };

  const getGridDimUpdate = (gridDim: number): JSX.Element => {
    return (
      <div>
        Board size shrunk to {gridDim * 2} x {gridDim * 2}
      </div>
    );
  };

  const getJoinedGameUpdate = (pieceEntity: EntityIndex): JSX.Element => {
    return (
      <div className="flex items-center">
        <div>{getPieceDisplay(pieceEntity)}</div>
        <div>joined the game</div>
      </div>
    );
  };

  return {
    getPieceTypeUpdate,
    getPieceDeathUpdate,
    getPieceMoveUpdate,
    getGridDimUpdate,
    getJoinedGameUpdate,
  };
};

export default createActivityUpdateFormatter;
