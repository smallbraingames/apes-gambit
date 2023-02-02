import { useContext, useEffect } from "react";

import { GameContext } from "../../context/GameContext";
import { NetworkContext } from "../../context/NetworkContext";
import joinMainGame from "../../game/utils/navigation/joinMainGame";

const AddPlayerToMainGame = () => {
  const { network } = useContext(NetworkContext);
  const { activePiece } = useContext(GameContext);

  useEffect(() => {
    if (network && activePiece) {
      joinMainGame(network, activePiece);
    }
  }, [network, activePiece]);

  return <></>;
};

export default AddPlayerToMainGame;
