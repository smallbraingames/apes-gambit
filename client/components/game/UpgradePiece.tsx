import { GameContext } from "../../context/GameContext";
import { NetworkContext } from "../../context/NetworkContext";
import { PieceType } from "../../network/types";
import getEntityFromEntityIndex from "../../game/utils/getEntityFromEntityIndex";
import getPieceInfo from "../../utils/getPieceName";
import { useContext } from "react";

const UpgradePieceButton = (props: { pieceType: PieceType }) => {
  const network = useContext(NetworkContext);
  const game = useContext(GameContext);

  const handleSetPieceType = () => {
    if (!network.network) return;
    network.network?.api.br.setBRPieceType(
      getEntityFromEntityIndex(game.activePiece!, network.network.world),
      game.game!.gameEntity!,
      props.pieceType
    );
  };

  const pieceInfo = getPieceInfo(props.pieceType);
  return (
    <div>
      <button className="p-2 bg-white" onClick={handleSetPieceType}>
        switch to {pieceInfo.name} (costs {pieceInfo.points} points)
      </button>
    </div>
  );
};

const UpgradePiece = () => {
  const pieceTypes = [
    PieceType.PAWN,
    PieceType.BISHOP,
    PieceType.ROOK,
    PieceType.QUEEN,
  ];
  return (
    <div>
      {pieceTypes.map((pieceType) => (
        <div key={pieceType}>
          <UpgradePieceButton pieceType={pieceType} />
        </div>
      ))}
    </div>
  );
};

export default UpgradePiece;
