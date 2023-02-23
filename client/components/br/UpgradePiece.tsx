/* eslint-disable @next/next/no-img-element */
import { EntityID, EntityIndex } from "@latticexyz/recs";
import { Network, PieceType } from "../../network/types";

import { GameContext } from "../../context/GameContext";
import { NetworkContext } from "../../context/NetworkContext";
import { getEntityFromEntityIndex } from "../../game/utils/resolveEntity";
import getPieceInfo from "../../utils/getPieceInfo";
import { useComponentValue } from "@latticexyz/react";
import { useContext } from "react";

const UpgradePieceButton = (props: {
  activePiece: EntityIndex;
  gameEntity: EntityID;
  network: Network;
  pieceType: PieceType;
}) => {
  const points = useComponentValue(
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
        "rounded-xl pr-4 " +
        (enabled
          ? "button"
          : "bg-gray-600 bg-opacity-20 saturate-0 cursor-not-allowed")
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
  const { game, gameEntity, activePiece } = useContext(GameContext);

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
        game !== undefined &&
        activePiece &&
        gameEntity && (
          <div className="p-4 bg-yellow-50 text-yellow-900 rounded-lg border border-b-4 border-r-2 border-yellow-900">
            <h1 className="mb-3 ml-1"> SELECT A PIECE </h1>
            <div className="grid grid-cols-2 gap-3">
              {pieceTypes.map((pieceType) => (
                <div className="group upgrade-piece" key={pieceType}>
                  <UpgradePieceButton
                    pieceType={pieceType}
                    network={network.network!}
                    gameEntity={gameEntity!}
                    activePiece={activePiece!}
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
