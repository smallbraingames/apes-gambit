import { EntityIndex } from "@latticexyz/recs";

const createPhaserObjectRegistry = () => {
  return {
    gameObjectRegistry: createObjectRegistry<Phaser.GameObjects.GameObject>(
      (object) => object.destroy()
    ),
    groupRegistry: createObjectRegistry<Phaser.GameObjects.Group>((object) =>
      object.destroy()
    ),
    tilemapRegistry: createObjectRegistry<Phaser.Tilemaps.Tilemap>((object) =>
      object.destroy()
    ),
  };
};

const createObjectRegistry = <T>(destroy: (object: T) => void) => {
  const objectRegistry: Map<EntityIndex, Map<string, T>> = new Map();

  const has = (entityIndex: EntityIndex, id: string): boolean => {
    const object = objectRegistry.get(entityIndex)?.get(id);
    return object !== undefined;
  };

  const get = (entityIndex: EntityIndex, id: string): T => {
    const object = objectRegistry.get(entityIndex)?.get(id);
    if (!object)
      throw Error(
        `No registered game object with entity ${entityIndex} and id ${id}`
      );
    return object;
  };

  const set = (entityIndex: EntityIndex, id: string, gameObject: T) => {
    if (!objectRegistry.has(entityIndex)) {
      objectRegistry.set(entityIndex, new Map([[id, gameObject]]));
      return;
    }
    const indexRegistry = objectRegistry.get(entityIndex)!;
    indexRegistry.set(id, gameObject);
  };

  const remove = (entityIndex: EntityIndex, id: string) => {
    const object = objectRegistry.get(entityIndex)?.get(id);
    if (!object) {
      return;
    }
    destroy(object);
    objectRegistry.get(entityIndex)?.delete(id);
  };

  return { has, get, set, remove };
};

export default createPhaserObjectRegistry;
