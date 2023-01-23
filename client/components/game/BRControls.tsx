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
import SummaryCard from "./SummaryCard";
import PlayerCount from "./PlayerCount";
import Timer from "./Timer";

const BRControls = () => {
  const game = useContext(GameContext);

  useEffect(() => {
    disableClickthroughs();
  }, []);

  return (
    <>
      <div className={CONTROLLER_COMPONENT_CLASS_NAME}>
        {game.game && (
          <div className="block">
            <div className="flex justify-between w-full gap-2 mb-2">
              <Points />
              <span className="flex w-full justify-end gap-2">
                <PlayerCount />
                <Timer />
              </span>
            </div>
            <div>
              <JoinGame game={game.game} />
              <SpawnPiece />
            </div>

            {/* <div>
              <UpgradePiece />
            </div> */}
            {/* <div>
              <SummaryCard />
            </div> */}
          </div>
        )}
      </div>
    </>
  );
};

export default BRControls;
