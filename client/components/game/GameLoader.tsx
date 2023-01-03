import { useContext, useEffect, useState } from "react";

import Game from "./Game";
import { Network } from "../../network/types";
import { NetworkContext } from "../../context/NetworkContext";

const NETWORK_POLL = 200;

export const awaitNetworkLayer = async (network?: Network) => {
  return new Promise<void>((resolve, reject) => {
    const interval = setInterval(() => {
      // Poll for the spawn system to load
      if (network?.systems["system.Spawn"]) {
        clearInterval(interval);
        resolve();
      }
    }, NETWORK_POLL);
  });
};

const GameLoader = () => {
  const [isGameLoaded, setIsGameLoaded] = useState(false);
  const { network } = useContext(NetworkContext);

  const loadGame = async () => {
    await awaitNetworkLayer(network);
    setIsGameLoaded(true);
  };

  useEffect(() => {
    loadGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [network]);

  if (!isGameLoaded) {
    return <div>Loading network layer....</div>;
  }

  return (
    <div>
      <Game />
    </div>
  );
};

export default GameLoader;
