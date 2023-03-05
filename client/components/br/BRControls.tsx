import {
  CONTROLLER_COMPONENT_CLASS_NAME,
  disableClickthroughs,
} from "../../utils/disableControllers";
import { Game, GameStatus } from "../../game/types";

import ActivityStream from "./ActivityStream";
import BRGameCountdown from "../BRGameCountdown";
import { EntityID } from "@latticexyz/recs";
import { Network } from "../../network/types";
import Points from "./Points";
import UpgradePiece from "./UpgradePiece";
import { getEntityIndexFromEntity } from "../../game/utils/resolveEntity";
import { useComponentValue } from "@latticexyz/react";
import { useEffect } from "react";

const BRControls = (props: {
  game: Game;
  gameEntity: EntityID;
  network: Network;
}) => {
  useEffect(() => {
    disableClickthroughs();
  }, []);

  const game = useComponentValue(
    props.network.components.BRGame,
    getEntityIndexFromEntity(props.gameEntity, props.network.world)
  );

  return (
    <>
      <div>
        <div
          className={
            "h-screen my-4 mx-4 flex flex-col gap-2 " +
            CONTROLLER_COMPONENT_CLASS_NAME
          }
        >
          {game?.status === GameStatus.NOT_STARTED ? (
            <div className="container p-4 mb-64">
              <h1 className="font-bold text-lg">
                {" "}
                Find your starting position{" "}
              </h1>
              <BRGameCountdown startTime={game.startTime} />
            </div>
          ) : (
            <>
              <div>
                <Points />
              </div>
              <div>
                <UpgradePiece />
              </div>
            </>
          )}
          <div className="flex flex-1 overflow-hidden">
            <ActivityStream />
          </div>
        </div>
      </div>
    </>
  );
};

export default BRControls;
