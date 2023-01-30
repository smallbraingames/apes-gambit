import { GameContext } from "../../context/GameContext";
import { NetworkContext } from "../../context/NetworkContext";
import { getEntityFromEntityIndex } from "../../game/utils/resolveEntity";
import { useContext } from "react";

const RevokeControllers = () => {
  const { network } = useContext(NetworkContext);
  const { activePiece } = useContext(GameContext);
  const handleRevokeControllers = () => {
    network?.api.br.revokeBRControllers(
      getEntityFromEntityIndex(activePiece!, network.world)
    );
  };

  return (
    <div className="bg-red-500 p-10">
      <button onClick={handleRevokeControllers}>
        REVOKE CONTROLLERS (debug)
      </button>
    </div>
  );
};

export default RevokeControllers;
