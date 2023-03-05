import BRControls from "./BRControls";
import CenterActivePieceOnLoad from "../CenterActivePieceOnLoad";
import { GameContext } from "../../context/GameContext";
import GameEnd from "./GameEnd";
import Info from "../Info";
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
      <div className="absolute right-0 p-4 flex flex-col gap-2">
        {network && gameEntity && activePiece && (
          <Pieces
            network={network}
            gameEntity={gameEntity}
            activePiece={activePiece}
          />
        )}
        <Info />
      </div>
      <GameEnd />
    </>
  );
};

export default BRGame;
