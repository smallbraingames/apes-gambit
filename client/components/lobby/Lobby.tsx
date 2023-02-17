import {
  CONTROLLER_COMPONENT_CLASS_NAME,
  disableClickthroughs,
} from "../../utils/disableControllers";
import { useContext, useEffect } from "react";

import BRGameIndicator from "./BRGameIndicator";
import CenterActivePieceOnLoad from "../CenterActivePieceOnLoad";
import ChatInput from "./Chat";
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
        <div className="absolute p-6 h-full">
          <CenterActivePieceOnLoad />
          {network && game && activePiece && (
            <div className="h-full flex flex-col">
              <div>
                <BRGameIndicator
                  gameEntity={gameEntity}
                  network={network}
                  activePiece={activePiece}
                  switchFromLobbyToBR={props.switchFromLobbyToBR}
                />
              </div>
              <div className="h-full flex flex-col-reverse w-fit">
                <ChatInput />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Lobby;
