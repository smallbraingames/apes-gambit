import ActivityStream from "./ActivityStream";
import BRControls from "./BRControls";
import GameProvider from "../../context/GameContext";

const Game = () => {
  return (
    <>
      <GameProvider>
        <div className="absolute p-6 h-full w-full">
          <BRControls />
          <div className="absolute bottom-6">
            <ActivityStream />
          </div>
        </div>
      </GameProvider>
    </>
  );
};

export default Game;
