import { EntityIndex } from "@latticexyz/recs";

const createObjectRegistry = () => {
  const objectRegistry: Map<
    EntityIndex,
    Map<string, Phaser.GameObjects.GameObject | Phaser.GameObjects.Group>
  > = new Map();

  const has = (entityIndex: EntityIndex, id: string): boolean => {
    const object = objectRegistry.get(entityIndex)?.get(id);
    return object !== undefined;
  };

  const get = (
    entityIndex: EntityIndex,
    id: string
  ): Phaser.GameObjects.GameObject | Phaser.GameObjects.Group => {
    const object = objectRegistry.get(entityIndex)?.get(id);
    if (!object)
      throw Error(
        `No registered game object with entity ${entityIndex} and id ${id}`
      );
    return object;
  };

  const getGameObjectsOfType = (
    entityIndex: EntityIndex,
    type?: string
  ): Set<Phaser.GameObjects.GameObject | Phaser.GameObjects.Group> => {
    const objects = objectRegistry.get(entityIndex)?.values();
    if (!objects) return new Set();
    if (!type) return new Set([...objects]);
    return new Set([...objects].filter((object) => object.type === type));
  };

  const set = (
    entityIndex: EntityIndex,
    id: string,
    gameObject: Phaser.GameObjects.GameObject | Phaser.GameObjects.Group
  ) => {
    if (!objectRegistry.has(entityIndex)) {
      objectRegistry.set(entityIndex, new Map([[id, gameObject]]));
      return;
    }
    const indexRegistry = objectRegistry.get(entityIndex)!;
    indexRegistry.set(id, gameObject);
  };

  const remove = (entityIndex: EntityIndex, id: string) => {
    const object = objectRegistry.get(entityIndex)?.get(id);
    if (!object) return;
    object.destroy();
  };

  return { has, get, getGameObjectsOfType, set, remove };
};

export default createObjectRegistry;
