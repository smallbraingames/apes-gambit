import {
  EntityID,
  EntityIndex,
  getComponentValueStrict,
} from "@latticexyz/recs";
import { Network, PieceType } from "../network/types";

import { Coord } from "@latticexyz/utils";
import { getEntityIndexFromEntity } from "../game/utils/resolveEntity";
import getPieceInfo from "./getPieceInfo";

export const getPieceDisplay = (
  piece: EntityIndex,
  network: Network
): JSX.Element => {
  const {
    components: { PieceType },
  } = network;
  const pieceType = getComponentValueStrict(PieceType, piece)
    .value as PieceType;
  const pieceInfo = getPieceInfo(pieceType);

  return (
    <div className="flex items-center">
      <div>{getPieceOwner(piece, network).substring(0, 5)} </div>
      <div>
        <img className="h-10 w-10" src={pieceInfo.image} />
      </div>
    </div>
  );
};

const getPieceOwner = (piece: EntityIndex, network: Network): string => {
  const {
    components: { Owner },
  } = network;
  return getComponentValueStrict(Owner, piece).value;
};

const createActivityUpdateFormatter = (network: Network) => {
  const getPieceTypeUpdate = (
    pieceEntity: EntityIndex,
    pieceType: PieceType
  ): JSX.Element => {
    return (
      <div className="flex items-center">
        <div>{getPieceDisplay(pieceEntity, network)}</div>
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
        <div>{getPieceDisplay(takerEntity, network)}</div>
        <div>took</div>
        <div>{getPieceDisplay(deadEntity, network)}</div>
      </div>
    );
  };

  const getPieceMoveUpdate = (
    pieceEntity: EntityIndex,
    piecePosition: Coord
  ): JSX.Element => {
    return (
      <div className="flex items-center">
        <div>{getPieceDisplay(pieceEntity, network)}</div>
        <div>
          moved to ({piecePosition.x},{piecePosition.y})
        </div>
      </div>
    );
  };

  const getChatUpdate = (pieceEntity: EntityIndex, message: string) => {
    return (
      <div className="flex items-center">
        <div>{getPieceDisplay(pieceEntity, network)}</div>
        <div>said {message}</div>
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
        <div>{getPieceDisplay(pieceEntity, network)}</div>
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
    getChatUpdate,
  };
};

export default createActivityUpdateFormatter;
