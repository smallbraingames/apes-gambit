import {
  CONTROLLER_COMPONENT_CLASS_NAME,
  disableClickthroughs,
} from "../../utils/disableControllers";
import { useContext, useEffect } from "react";

import BRGameIndicator from "./BRGameIndicator";
import CenterActivePieceOnLoad from "../CenterActivePieceOnLoad";
import ChatInput from "./Chat";
import { GameContext } from "../../context/GameContext";
import Info from "../Info";
import { NetworkContext } from "../../context/NetworkContext";
import { Scenes } from "../../game/constants";
import SetPieceName from "./SetPieceName";

const Lobby = () => {
  const { network } = useContext(NetworkContext);
  const { game, activePiece, gameEntity } = useContext(GameContext);

  useEffect(() => {
    disableClickthroughs();
  }, []);

  return (
    <>
      <div className={CONTROLLER_COMPONENT_CLASS_NAME}>
        <div className="absolute right-0 p-4 h-full">
          <CenterActivePieceOnLoad scene={Scenes.Lobby} />
          {network && game && activePiece && (
            <div className="h-full flex flex-col items-end gap-2">
              <div>
                <BRGameIndicator
                  gameEntity={gameEntity}
                  network={network}
                  activePiece={activePiece}
                />
                <div className="mt-2">
                  <SetPieceName />
                </div>
                <div className="mt-2">
                  <Info />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="absolute bottom-0 p-4">
          <div className="container">
            <ChatInput />
          </div>
        </div>
      </div>
    </>
  );
};

export default Lobby;
