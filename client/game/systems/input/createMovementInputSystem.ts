import {
  Component,
  EntityIndex,
  Type,
  World,
  getEntitiesWithValue,
  getEntityComponents,
} from "@latticexyz/recs";

import { Game } from "../../types";
import { Network } from "../../../network/types";
import { pixelCoordToTileCoord } from "@latticexyz/phaserx";

const createMovementInputSystem = (network: Network, game: Game) => {
  const {
    scenes: {
      Main: {
        input,
        maps: {
          Main: { tileWidth, tileHeight },
        },
      },
    },
  } = game;

  const getOwnedPieceEntity = (
    owner: string,
    OwnerComponent: Component<{ value: Type.String }>,
    world: World
  ): string => {
    const ownedEntities = getEntitiesWithValue(OwnerComponent, {
      value: owner,
    });
    const ownedEntityIndexes: EntityIndex[] = [];
    ownedEntities.forEach((entityIndex) => {
      const components = getEntityComponents(world, entityIndex);
      // Todo: check that component is a piece that can play
      ownedEntityIndexes.push(entityIndex);
    });
    return world.entities[ownedEntityIndexes[0]];
  };

  input.click$.subscribe((p) => {
    const pointer = p as Phaser.Input.Pointer;
    const tilePosition = pixelCoordToTileCoord(
      { x: pointer.worldX, y: pointer.worldY },
      tileWidth,
      tileHeight
    );
    console.log(`Got input with position ${JSON.stringify(tilePosition)}`);
    network.api.movePiece(
      getOwnedPieceEntity(
        "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
        network.components.Owner,
        network.world
      ),
      tilePosition
    );
  });
};

export default createMovementInputSystem;
