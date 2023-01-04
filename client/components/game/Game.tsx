import { useContext, useEffect, useState } from "react";

import { Network } from "../../network/types";
import { NetworkContext } from "../../context/NetworkContext";
import { Game as PhaserGame } from "../../game/types";

const Game = () => {
  const network = useContext(NetworkContext);
  const [game, setGame] = useState<PhaserGame | undefined>(undefined);

  const setupGame = async (network: Network) => {
    const createGame = (await import("../../game/createGame")).createGame;
    const game: PhaserGame = await createGame(network);
    setGame(game);
  };
  useEffect(() => {
    if (network.network) setupGame(network.network);
    return () => {
      if (game) game.disposePhaser();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [network.network]);

  return <></>;
};

export default Game;
