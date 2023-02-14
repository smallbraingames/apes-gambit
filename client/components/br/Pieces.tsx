import {
  EntityID,
  EntityIndex,
  Has,
  HasValue,
  getComponentValue,
  getComponentValueStrict,
} from "@latticexyz/recs";
import { Network, PieceType } from "../../network/types";

import { getPieceDisplay } from "../../utils/createActivityUpdateFormatter";
import { useEntityQuery } from "@latticexyz/react";
import { useMemo } from "react";

type PieceDisplayData = {
  owner: string;
  pieceType: PieceType;
  isActivePiece: boolean;
  pieceEntity: EntityIndex;
  bananas: number;
  isAlive: boolean;
};

const PieceDisplay = (props: { data: PieceDisplayData; network: Network }) => {
  return (
    <>
      <div className="font-bold">
        {getPieceDisplay(props.data.pieceEntity, props.network)}
      </div>
      <div className="flex items-center justify-center">
        <div>{props.data.bananas}</div>
        <div className="h-10 w-10">
          <img
            alt="Banana"
            src="icons/banana.svg"
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
    </>
  );
};

const Pieces = (props: {
  network: Network;
  gameEntity: EntityID;
  activePiece: EntityIndex;
}) => {
  const {
    components: {
      PiecePosition,
      PieceType,
      BRInGame,
      Owner,
      BRIsAlive,
      BRPoints,
    },
  } = props.network;

  const pieceEntities = useEntityQuery(
    useMemo(
      () => [
        Has(Owner),
        Has(PiecePosition),
        Has(PieceType),
        // @ts-ignore
        HasValue(BRInGame, { value: props.gameEntity }),
      ],
      [PiecePosition, Owner, PieceType, BRInGame, props.gameEntity]
    )
  );

  const pieces: PieceDisplayData[] = pieceEntities.map((pieceEntity) => {
    const owner = getComponentValueStrict(Owner, pieceEntity).value;
    const pieceType = getComponentValueStrict(PieceType, pieceEntity)
      .value as PieceType;
    const isAliveComponent = getComponentValue(BRIsAlive, pieceEntity)?.value;
    const isAlive = isAliveComponent ? isAliveComponent : false;
    const bananasComponent = getComponentValue(BRPoints, pieceEntity)?.value;
    const bananas = bananasComponent ? bananasComponent : 0;
    const isActivePiece = pieceEntity === props.activePiece;
    return { owner, pieceType, isActivePiece, pieceEntity, bananas, isAlive };
  });

  const livePieces = pieces.filter((piece) => piece.isAlive);
  const deadPieces = pieces.filter((piece) => !piece.isAlive);

  return (
    <div className="bg-yellow-50 py-4 pl-5 border border-b-4 border-r-2 border-yellow-900 text-yellow-900 rounded-lg flex flex-col m-4">
      <p className="mt-1 mb-2">PLAYERS</p>

      <div className="overflow-y-hidden">
        <p> Alive </p>
        <div className="grid grid-cols-2">
          {livePieces.map((data) => (
            <PieceDisplay
              key={data.pieceEntity}
              data={data}
              network={props.network}
            />
          ))}
        </div>
        <p> Dead </p>
        <div className="grid grid-cols-2">
          {deadPieces.map((data) => (
            <PieceDisplay
              key={data.pieceEntity}
              data={data}
              network={props.network}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pieces;
