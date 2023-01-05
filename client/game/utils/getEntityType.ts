import { EntityIndex, World, getEntityComponents } from "@latticexyz/recs";

import { EntityType } from "../types";
import { Network } from "../../network/types";

const getEntityType = (
  entityIndex: EntityIndex,
  network: Network
): EntityType => {
  const componentIds = new Set(
    getEntityComponents(network.world, entityIndex).map(
      (component) => component.id
    )
  );
  if (componentIds.has(network.components.Game.id))
    return EntityType.GAME_CONFIG;
  throw Error("Unrecognized entity type");
};

export default getEntityType;
