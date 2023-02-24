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
      <div
        className={"font-bold mt-2 " + (!props.data.isAlive ? "grayscale" : "")}
      >
        {getPieceDisplay(props.data.pieceEntity, props.network)}
      </div>
      <div className="flex items-center justify-end mt-2">
        <div>{props.data.bananas}</div>
        <div className="h-6 w-6">
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

  let activePieceData: PieceDisplayData | undefined = undefined;
  const pieces: PieceDisplayData[] = pieceEntities.map((pieceEntity) => {
    const owner = getComponentValueStrict(Owner, pieceEntity).value;
    const pieceType = getComponentValueStrict(PieceType, pieceEntity)
      .value as PieceType;
    const isAliveComponent = getComponentValue(BRIsAlive, pieceEntity)?.value;
    const isAlive = isAliveComponent ? isAliveComponent : false;
    const bananasComponent = getComponentValue(BRPoints, pieceEntity)?.value;
    const bananas = bananasComponent ? bananasComponent : 0;
    const isActivePiece = pieceEntity === props.activePiece;
    const data = {
      owner,
      pieceType,
      isActivePiece,
      pieceEntity,
      bananas,
      isAlive,
    };
    if (isActivePiece) {
      activePieceData = data;
    }
    return data;
  });

  return (
    <div className="container pb-2">
      <div className="flex w-full items-center p-4">
        <div>PLAYERS</div>
        <div className="w-full flex flex-row-reverse text-sm opacity-80">
          {pieces.length}
        </div>
      </div>
      {activePieceData && (
        <div className="border-t-2 border-b-2 border-yellow-900">
          <div className="grid grid-cols-2 px-4 pb-2">
            <PieceDisplay data={activePieceData} network={props.network} />
          </div>
        </div>
      )}
      <div className="px-4 overflow-y-auto h-48">
        <div className="grid grid-cols-2 overflow-y-auto">
          {pieces.map((data) => (
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
