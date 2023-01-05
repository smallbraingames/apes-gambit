import { EntityID, EntityIndex, World } from "@latticexyz/recs";

const getEntityFromEntityIndex = (
  entityIndex: EntityIndex,
  world: World
): EntityID => {
  return world.entities[entityIndex];
};

export default getEntityFromEntityIndex;
