import { Chain, getChain, getFaucetServiceUrl } from "../utils/getGameConfig";

import { JsonRpcProvider } from "@ethersproject/providers";
import { createFaucetService } from "@latticexyz/network";
import getBurnerWallet from "./wallet/getBurnerWallet";
import { parseEther } from "ethers/lib/utils";

const getFaucetFunds = async () => {
  const faucet = createFaucetService(getFaucetServiceUrl());
  const address = getBurnerWallet().address;
  await faucet.dripDev({ address });
};

const isPlayerBroke = async (jsonRpcUrl: string): Promise<boolean> => {
  const provider = new JsonRpcProvider(jsonRpcUrl);
  const balance = await provider.getBalance(getBurnerWallet().address);
  return balance.lte(parseEther("0.05"));
};

export const getFaucetFundsIfNecessary = async (jsonRpcUrl: string) => {
  const chain = getChain();
  if (chain !== Chain.LATTICE_TESTNET)
    console.warn("Not requesting faucet funds, not on lattice testnet");
  if (await isPlayerBroke(jsonRpcUrl)) {
    console.log("Requesting funds from faucet...");
    getFaucetFunds();
  }
};

export default getFaucetFunds;
