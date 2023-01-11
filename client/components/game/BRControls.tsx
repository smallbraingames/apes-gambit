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
          <div className="p-4 bg-amber-500 rounded-md">
            <JoinGame game={game.game} />
            <SpawnPiece />
            <Points />
            <UpgradePiece />
          </div>
        )}
      </div>
    </>
  );
};

export default BRControls;
