import {
  Component,
  EntityIndex,
  Type,
  World,
  getEntitiesWithValue,
  getEntityComponents,
} from "@latticexyz/recs";

const getOwnedPieceEntityIndex = (
  owner: string,
  OwnerComponent: Component<{ value: Type.String }>,
  world: World
): EntityIndex => {
  const ownedEntities = getEntitiesWithValue(OwnerComponent, {
    value: owner,
  });
  const ownedEntityIndexes: EntityIndex[] = [];
  ownedEntities.forEach((entityIndex) => {
    const components = getEntityComponents(world, entityIndex);
    // Todo: check that component is a piece that can play
    ownedEntityIndexes.push(entityIndex);
  });
  return ownedEntityIndexes[0];
};
export default getOwnedPieceEntityIndex;
