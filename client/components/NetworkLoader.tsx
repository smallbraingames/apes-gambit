import { ReactNode, useContext, useEffect, useState } from "react";

import { Network } from "../network/types";
import { NetworkContext } from "../context/NetworkContext";

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

const NetworkLoader = (props: { children: ReactNode }) => {
  const [isNetworkLoaded, setIsNetworkLoaded] = useState(false);
  const { network } = useContext(NetworkContext);

  const loadNetwork = async () => {
    await awaitNetworkLayer(network);
    setIsNetworkLoaded(true);
  };

  useEffect(() => {
    loadNetwork();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [network]);

  if (!isNetworkLoaded) {
    return <div>Loading network layer....</div>;
  }

  return <div>{props.children}</div>;
};

export default NetworkLoader;
