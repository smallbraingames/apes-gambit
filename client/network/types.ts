import { createNetwork } from "./createNetwork";
export type Network = Awaited<ReturnType<typeof createNetwork>>;
