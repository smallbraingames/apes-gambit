import { GameContext } from "../../context/GameContext";
import { NetworkContext } from "../../context/NetworkContext";
import { useContext } from "react";

const SpawnPiece = () => {
  const network = useContext(NetworkContext);
  const game = useContext(GameContext);

  const handleSpawnPiece = () => {
    if (game.activePiece) {
      console.warn(
        `Not spawing piece since active piece with entity index ${game.activePiece}`
      );
      return;
    }
    network.network?.api.spawnPiece();
  };

  return (
    <div>
      <button className="bg-blue-500 p-5" onClick={handleSpawnPiece}>
        Spawn Piece
      </button>
    </div>
  );
};

export default SpawnPiece;
