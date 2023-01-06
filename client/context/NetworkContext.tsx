import { ReactNode, createContext, useEffect, useState } from "react";

import { GameConfig } from "../network/config";
import { Network } from "../network/types";
import getBurnerWallet from "../network/wallet/getBurnerWallet";

interface NetworkContextInterface {
  network?: Network;
}

export const NetworkContext = createContext<NetworkContextInterface>({
  network: undefined,
});

const NetworkProvider = (props: { children: ReactNode }) => {
  const [network, setNetwork] = useState<Network | undefined>(undefined);

  const setupNetwork = async () => {
    if (typeof window !== "undefined" && !network) {
      const config: GameConfig = {
        chainId: 31337,
        worldAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        jsonRpc: "http://localhost:8545",
        privateKey: getBurnerWallet().privateKey,
        wsRpc: undefined,
        streamServiceUrl: undefined,
        snapshotServiceUrl: undefined,
        devMode: true,
        initialBlockNumber: 0,
        externalProvider: undefined,
      };
      const createNetwork = (await import("../network/createNetwork"))
        .createNetwork;
      const network: Network = await createNetwork(config);
      network.startSync();
      setNetwork(network);
    }
  };

  useEffect(() => {
    setupNetwork();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NetworkContext.Provider value={{ network }}>
      {props.children}
    </NetworkContext.Provider>
  );
};

export default NetworkProvider;
