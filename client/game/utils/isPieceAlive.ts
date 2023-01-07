import { EntityIndex, getComponentValue } from "@latticexyz/recs";

import { Network } from "../../network/types";

const isPieceAlive = (entityIndex: EntityIndex, network: Network): boolean => {
  const isAlive = getComponentValue(network.components.BRIsAlive, entityIndex);
  if (!isAlive) return false;
  return isAlive.value;
};

export default isPieceAlive;
