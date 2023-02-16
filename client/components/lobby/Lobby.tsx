import {
  CONTROLLER_COMPONENT_CLASS_NAME,
  disableClickthroughs,
} from "../../utils/disableControllers";
import { useContext, useEffect } from "react";

import BRGameIndicator from "./BRGameIndicator";
import CenterActivePieceOnLoad from "../CenterActivePieceOnLoad";
import { GameContext } from "../../context/GameContext";
import { NetworkContext } from "../../context/NetworkContext";
import { SwitchGameState } from "../GameManager";

const Lobby = (props: { switchFromLobbyToBR: SwitchGameState }) => {
  const { network } = useContext(NetworkContext);
  const { game, activePiece, gameEntity } = useContext(GameContext);

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
              <BRGameIndicator
                gameEntity={gameEntity}
                network={network}
                activePiece={activePiece}
                switchFromLobbyToBR={props.switchFromLobbyToBR}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Lobby;
