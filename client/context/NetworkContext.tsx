import { ReactNode, createContext, useEffect, useState } from "react";

import { Network } from "../network/types";
import { Subscription } from "rxjs";
import { getFaucetFundsIfNecessary } from "../network/getFaucetFunds";
import getGameConfig from "../utils/getGameConfig";

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
      const config = getGameConfig();
      const createNetwork = (await import("../network/createNetwork"))
        .createNetwork;
      const network: Network = await createNetwork(config);
      network.startSync();
      setNetwork(network);
    }
  };

  const setupFaucetCall = (network: Network) => {
    getFaucetFundsIfNecessary(network.config.jsonRpc);
    const dripSubscriptionPosition =
      network.components.PiecePosition.update$.subscribe(() => {
        getFaucetFundsIfNecessary(network.config.jsonRpc);
      });

    const dripSubscriptionType = network.components.PieceType.update$.subscribe(
      () => {
        getFaucetFundsIfNecessary(network.config.jsonRpc);
      }
    );
    return [dripSubscriptionPosition, dripSubscriptionType];
  };

  useEffect(() => {
    setupNetwork();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let subscriptions: Subscription[] = [];
    if (network) subscriptions.push(...setupFaucetCall(network));
    console.log(subscriptions);
    return () => {
      console.log(`unsubscribing from ${subscriptions}`);
      subscriptions.forEach((sub) => sub.unsubscribe());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [network]);

  return (
    <NetworkContext.Provider value={{ network }}>
      {props.children}
    </NetworkContext.Provider>
  );
};

export default NetworkProvider;
