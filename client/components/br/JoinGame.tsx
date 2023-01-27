import { Game } from "../../game/types";
import { GameContext } from "../../context/GameContext";
import { NetworkContext } from "../../context/NetworkContext";
import joinGame from "../../game/utils/joinGame";
import { useContext } from "react";

const JoinGame = (props: { game: Game }) => {
  const network = useContext(NetworkContext);
  const game = useContext(GameContext);

  const handleJoinGame = () => {
    if (game.activePiece) {
      joinGame(game.activePiece, props.game.gameEntity!, network.network!);
    }
  };

  return (
    <div>
      <button className="bg-green-500 p-5" onClick={handleJoinGame}>
        Join Game
      </button>
    </div>
  );
};

export default JoinGame;
