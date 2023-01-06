import { Network } from "../types";
import { Wallet } from "ethers";

const getNetworkWallet = (network: Network): Wallet => {
  return new Wallet(network.config.privateKey!);
};

export default getNetworkWallet;
