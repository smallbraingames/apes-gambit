import {
  CONTROLLER_COMPONENT_CLASS_NAME,
  disableClickthroughs,
} from "../../utils/disableControllers";

import GameProvider from "../../context/GameContext";
import SpawnPiece from "./SpawnPiece";
import { useEffect } from "react";

const Lobby = () => {
  useEffect(() => {
    disableClickthroughs();
  }, []);

  return (
    <>
      <GameProvider brGameEntity={undefined}>
        <div className={CONTROLLER_COMPONENT_CLASS_NAME}>
          <div className="absolute p-6 h-full">
            <SpawnPiece />
          </div>
        </div>
      </GameProvider>
    </>
  );
};

export default Lobby;
