import {
  CONTROLLER_COMPONENT_CLASS_NAME,
  disableClickthroughs,
} from "../../utils/disableControllers";
import { useContext, useEffect } from "react";

import ActivityStream from "./ActivityStream";
import { GameContext } from "../../context/GameContext";
import Points from "./Points";
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
          <div className="h-screen py-4 px-4 flex flex-col gap-2">
            <div>
              <Points />
            </div>
            <div>
              <UpgradePiece />
            </div>
            <div className="flex flex-1 overflow-hidden">
              <ActivityStream />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BRControls;
