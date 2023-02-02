import ActivityStream from "./ActivityStream";
import BRControls from "./BRControls";
import { EntityID } from "@latticexyz/recs";
import GameProvider from "../../context/GameContext";
import RevokeControllers from "./RevokeControllers";

const BRGame = () => {
  const params = new URLSearchParams(window.location.search);
  const gameEntity = params.get("gameEntity") as EntityID | undefined;

  if (!gameEntity) {
    return (
      <>
        <div>Game entity not provided in url</div>
      </>
    );
  }

  return (
    <>
      <GameProvider brGameEntity={gameEntity}>
        <div className="absolute p-6 h-full">
          <BRControls />
          <div className="absolute bottom-6">
            <ActivityStream />
          </div>
        </div>
      </GameProvider>
    </>
  );
};

export default BRGame;
