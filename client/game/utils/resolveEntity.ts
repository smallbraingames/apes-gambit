import { EntityID, EntityIndex, World } from "@latticexyz/recs";

export const getEntityFromEntityIndex = (
  entityIndex: EntityIndex,
  world: World
): EntityID => {
  return world.entities[entityIndex];
};

export const getEntityIndexFromEntity = (
  entityID: EntityID,
  world: World
): EntityIndex => {
  const index = world.entities.indexOf(entityID);
  if (index === -1) {
    console.warn(`Entity ID ${entityID} doesn't have associated index`);
  }
  return index as EntityIndex;
};
