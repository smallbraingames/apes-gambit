import GameProvider from "../../context/GameContext";

const Lobby = () => {
  return (
    <>
      <GameProvider brGameEntity={undefined}>
        <div></div>
      </GameProvider>
    </>
  );
};

export default Lobby;
