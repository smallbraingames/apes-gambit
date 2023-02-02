import {
  CONTROLLER_COMPONENT_CLASS_NAME,
  disableClickthroughs,
} from "../../utils/disableControllers";
import { useContext, useEffect } from "react";

import CenterActivePieceOnLoad from "../CenterActivePieceOnLoad";
import { GameContext } from "../../context/GameContext";
import MainGame from "./MainGame";
import { NetworkContext } from "../../context/NetworkContext";

const Lobby = () => {
  const { network } = useContext(NetworkContext);
  const { game, activePiece } = useContext(GameContext);

  useEffect(() => {
    disableClickthroughs();
  }, []);

  return (
    <>
      <div className={CONTROLLER_COMPONENT_CLASS_NAME}>
        <div className="absolute p-6">
          <CenterActivePieceOnLoad />

          {network && game && activePiece && (
            <>
              <MainGame network={network} activePiece={activePiece} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Lobby;
