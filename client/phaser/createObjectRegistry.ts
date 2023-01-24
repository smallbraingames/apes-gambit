import { EntityIndex } from "@latticexyz/recs";

const createObjectRegistry = () => {
  const objectRegistry: Map<
    EntityIndex,
    Map<string, Phaser.GameObjects.GameObject>
  > = new Map();

  const get = (
    entityIndex: EntityIndex,
    id: string
  ): Phaser.GameObjects.GameObject => {
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
  ): Set<Phaser.GameObjects.GameObject> => {
    const objects = objectRegistry.get(entityIndex)?.values();
    if (!objects) return new Set();
    if (!type) return new Set([...objects]);
    return new Set([...objects].filter((object) => object.type === type));
  };

  const set = (
    entityIndex: EntityIndex,
    id: string,
    gameObject: Phaser.GameObjects.GameObject
  ) => {
    if (!objectRegistry.has(entityIndex)) {
      objectRegistry.set(entityIndex, new Map([[id, gameObject]]));
      return;
    }
    const indexRegistry = objectRegistry.get(entityIndex)!;
    indexRegistry.set(id, gameObject);
  };

  return { get, getObjectsOfType: getGameObjectsOfType, set };
};

export default createObjectRegistry;
