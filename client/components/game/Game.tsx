import BRControls from "./BRControls";
import GameProvider from "../../context/GameContext";

const Game = () => {
  return (
    <>
      <GameProvider>
        <div className="absolute m-10">
          <BRControls />
        </div>
      </GameProvider>
    </>
  );
};

export default Game;
