/* eslint-disable @next/next/no-img-element */
import { EntityID, EntityIndex } from "@latticexyz/recs";
import { Network, PieceType } from "../../network/types";

import { GameContext } from "../../context/GameContext";
import { NetworkContext } from "../../context/NetworkContext";
import getEntityFromEntityIndex from "../../game/utils/getEntityFromEntityIndex";
import getPieceInfo from "../../utils/getPieceInfo";
import { useComponentValueStream } from "@latticexyz/std-client";
import { useContext } from "react";

const UpgradePieceButton = (props: {
  activePiece: EntityIndex;
  gameEntity: EntityID;
  network: Network;
  pieceType: PieceType;
}) => {
  const points = useComponentValueStream(
    props.network.components.BRPoints,
    props.activePiece
  );

  const handleSetPieceType = () => {
    props.network.api.br.setBRPieceType(
      getEntityFromEntityIndex(props.activePiece, props.network.world),
      props.gameEntity,
      props.pieceType
    );
  };

  const pieceInfo = getPieceInfo(props.pieceType);
  const enabled = points?.value ? points.value >= pieceInfo.points : false;

  return (
    <div
      onClick={handleSetPieceType}
      className={
        "rounded-xl text-gray-800 pr-4 border border-yellow-900 bg-opacity-10 " +
        (enabled
          ? "bg-yellow-600 hover:bg-opacity-40 cursor-pointer"
          : "bg-gray-600 saturate-0 cursor-not-allowed")
      }
    >
      <div className="h-20 w-28 flex items-center">
        <div
          className={
            enabled
              ? "opacity-100 group-hover:-rotate-6 transform duration-150 ease-in"
              : "opacity-100"
          }
        >
          <img
            alt={pieceInfo.name}
            src={pieceInfo.image}
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="text-right">
          <div className="label">{pieceInfo.name}</div>
          <div className="bignumber">{pieceInfo.points}</div>
        </div>
      </div>
    </div>
  );
};

const UpgradePiece = () => {
  const network = useContext(NetworkContext);
  const game = useContext(GameContext);

  const pieceTypes = [
    PieceType.PAWN,
    PieceType.BISHOP,
    PieceType.KNIGHT,
    PieceType.ROOK,
    PieceType.QUEEN,
    PieceType.KING,
  ];
  return (
    <>
      {network.network !== undefined &&
        game.game !== undefined &&
        game.activePiece && (
          <div className="p-4 bg-yellow-400 bg-opacity-95 rounded-lg">
            <h1 className="label mb-2 ml-1"> SELECT A PIECE </h1>
            <div className="grid grid-cols-2 gap-2">
              {pieceTypes.map((pieceType) => (
                <div className="group upgrade-piece" key={pieceType}>
                  <UpgradePieceButton
                    pieceType={pieceType}
                    network={network.network!}
                    gameEntity={game.game!.gameEntity!}
                    activePiece={game.activePiece!}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
    </>
  );
};

export default UpgradePiece;
