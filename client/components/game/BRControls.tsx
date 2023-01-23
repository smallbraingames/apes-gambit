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
            <div className="w-full flex justify-between mb-2">
              <Points />
              <PlayerCount />
            </div>
            <div>
              <JoinGame game={game.game} />
              <SpawnPiece />
            </div>
            Displays the UpgradePiece window
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
