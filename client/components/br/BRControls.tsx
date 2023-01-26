import {
  CONTROLLER_COMPONENT_CLASS_NAME,
  disableClickthroughs,
} from "../../utils/disableControllers";
import { useContext, useEffect } from "react";

import { GameContext } from "../../context/GameContext";
import JoinGame from "./JoinGame";
import Points from "./Points";
import SpawnPiece from "./SpawnPiece";
import UpgradePiece from "./UpgradePiece";

const BRControls = () => {
  const game = useContext(GameContext);

  useEffect(() => {
    disableClickthroughs();
  }, []);

  return (
    <>
      <div className={CONTROLLER_COMPONENT_CLASS_NAME}>
        {game.game && (
          <div>
            <JoinGame game={game.game} />
            <SpawnPiece />
            <div className="mb-2">
              <Points />
            </div>
            <div>
              <UpgradePiece />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BRControls;