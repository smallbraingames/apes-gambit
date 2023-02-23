import { ExternalProvider } from "@ethersproject/providers";
import { SetupContractConfig } from "@latticexyz/std-client";

export type GameConfig = {
  worldAddress: string;
  privateKey?: string;
  chainId: number;
  jsonRpc: string;
  wsRpc?: string;
  checkpointUrl?: string;
  devMode: boolean;
  initialBlockNumber: number;
  externalProvider?: ExternalProvider;
  streamServiceUrl?: string;
  snapshotServiceUrl?: string;
};

export const getNetworkConfig: (
  networkConfig: GameConfig
) => SetupContractConfig = (config) => ({
  clock: {
    period: 100,
    initialTime: 0,
    syncInterval: 500,
  },
  provider: {
    snapshotServiceUrl: config.snapshotServiceUrl,
    streamServiceUrl: config.streamServiceUrl,
    jsonRpcUrl: config.jsonRpc,
    wsRpcUrl: config.wsRpc,
    chainId: config.chainId,
    externalProvider: config.externalProvider,
    options: {
      batch: false,
    },
  },
  privateKey: config.privateKey,
  chainId: config.chainId,
  checkpointServiceUrl: config.checkpointUrl,
  initialBlockNumber: config.initialBlockNumber,
  worldAddress: config.worldAddress,
  devMode: config.devMode,
  streamServiceUrl: config.streamServiceUrl,
  snapshotServiceUrl: config.snapshotServiceUrl,
});
