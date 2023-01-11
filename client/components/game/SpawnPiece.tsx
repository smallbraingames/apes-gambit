import { useContext, useEffect } from "react";

import { NetworkContext } from "../../context/NetworkContext";
import getBurnerWallet from "../../network/wallet/getBurnerWallet";
import getOwnedPieceEntityIndex from "../../game/utils/getOwnedPieceEntityIndex";

const SpawnPiece = () => {
  const network = useContext(NetworkContext);

  const handleSpawnPiece = () => {
    const pieceEntity = getOwnedPieceEntityIndex(
      getBurnerWallet().address,
      network.network!.components.Owner,
      network.network!.world
    );
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
