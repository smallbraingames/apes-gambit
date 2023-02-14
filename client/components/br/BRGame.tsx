import BRControls from "./BRControls";
import { GameContext } from "../../context/GameContext";
import { NetworkContext } from "../../context/NetworkContext";
import Pieces from "./Pieces";
import { useContext } from "react";

const BRGame = () => {
  const { network } = useContext(NetworkContext);
  const { gameEntity, activePiece } = useContext(GameContext);

  return (
    <>
      <div className="absolute h-screen">
        <BRControls />
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
    </>
  );
};

export default BRGame;
