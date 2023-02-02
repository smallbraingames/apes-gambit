import BRControls from "./BRControls";
import { EntityID } from "@latticexyz/recs";
import GameProvider from "../../context/GameContext";

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
        <div className="absolute h-full">
          <BRControls />
        </div>
      </GameProvider>
    </>
  );
};

export default BRGame;
