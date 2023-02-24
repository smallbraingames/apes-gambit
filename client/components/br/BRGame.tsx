import BRControls from "./BRControls";
import CenterActivePieceOnLoad from "../CenterActivePieceOnLoad";
import { GameContext } from "../../context/GameContext";
import GameEnd from "./GameEnd";
import { NetworkContext } from "../../context/NetworkContext";
import Pieces from "./Pieces";
import { Scenes } from "../../game/constants";
import { useContext } from "react";

const BRGame = () => {
  const { network } = useContext(NetworkContext);
  const { gameEntity, activePiece, game } = useContext(GameContext);

  return (
    <>
      <CenterActivePieceOnLoad scene={Scenes.BR} />
      <div className="absolute h-screen">
        {network && gameEntity && game && (
          <BRControls game={game} gameEntity={gameEntity} network={network} />
        )}
      </div>
      <div className="absolute right-0">
        {network && gameEntity && activePiece && (
          <Pieces
            network={network}
            gameEntity={gameEntity}
            activePiece={activePiece}
          />
        )}
      </div>
      <GameEnd />
    </>
  );
};

export default BRGame;
