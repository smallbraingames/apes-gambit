import { GameConfig } from "../network/config";
import getBurnerWallet from "../network/wallet/getBurnerWallet";

export enum Chain {
  LOCALNET = "localnet",
  LATTICE_TESTNET = "lattice",
}

export const getChain = (): Chain => {
  const chain = process.env.NEXT_PUBLIC_CHAIN;
  if (!chain) throw Error("Chain is undefined, is NEXT_PUBLIC_CHAIN set?");
  switch (chain) {
    case Chain.LOCALNET:
      return Chain.LOCALNET;
    case Chain.LATTICE_TESTNET:
      return Chain.LATTICE_TESTNET;
    default:
      throw Error(`Unrecognized chain ${chain}`);
  }
};

export const getFaucetServiceUrl = (): string => {
  const chain = getChain();
  switch (chain) {
    case Chain.LATTICE_TESTNET:
      return "https://faucet.testnet-mud-services.linfra.xyz";
    default:
      throw Error(`No faucet service url for chain ${chain}`);
  }
};

const getGameConfig = (): GameConfig => {
  const chain = getChain();
  const privateKey = getBurnerWallet().privateKey;
  const worldAddress = process.env.NEXT_PUBLIC_WORLD_ADDRESS;
  const initialBlockNumberString = process.env.NEXT_PUBLIC_INITIAL_BLOCK_NUMBER;

  if (!worldAddress || initialBlockNumberString === undefined || !chain) {
    throw Error("Chain env variables not defined.");
  }

  const initialBlockNumber = parseInt(initialBlockNumberString);

  switch (chain) {
    case Chain.LOCALNET:
      return {
        chainId: 31337,
        worldAddress,
        jsonRpc: "http://localhost:8545",
        privateKey,
        wsRpc: undefined,
        streamServiceUrl: undefined,
        snapshotServiceUrl: undefined,
        devMode: true,
        initialBlockNumber,
        externalProvider: undefined,
      };
    case Chain.LATTICE_TESTNET:
      return {
        chainId: 4242,
        worldAddress,
        jsonRpc: "https://follower.testnet-chain.linfra.xyz",
        privateKey,
        wsRpc: "wss://follower.testnet-chain.linfra.xyz",
        //streamServiceUrl: "https://ecs-stream.testnet-mud-services.linfra.xyz",
        snapshotServiceUrl:
          "https://ecs-snapshot.testnet-mud-services.linfra.xyz",
        devMode: false,
        initialBlockNumber,
        externalProvider: undefined,
      };
  }
};

export default getGameConfig;
