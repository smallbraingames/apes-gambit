import { CHESS_TILEMAP_ID } from "../../constants";
import { Coord } from "@latticexyz/utils";
import { EntityIndex } from "@latticexyz/recs";
import { ObjectRegistry } from "../../../phaser/types";

let previouslyUpdatedDim: number;

const overlayShrinkingGridTiles = (
  godEntityIndex: EntityIndex,
  gridDim: number,
  objectRegistry: ObjectRegistry
) => {
  const tilemap = objectRegistry.tilemapRegistry.get(
    godEntityIndex,
    CHESS_TILEMAP_ID
  );
  const displayGridSize = tilemap.width;
  if (previouslyUpdatedDim === undefined) {
    previouslyUpdatedDim = displayGridSize;
  }
  const tilesToChange: Coord[] = [];
  // Get shrinking grid tiles
  for (let x = -previouslyUpdatedDim; x < previouslyUpdatedDim; x++) {
    for (let y = -previouslyUpdatedDim; y < -gridDim; y++) {
      tilesToChange.push({ x, y });
    }
    for (let y = gridDim; y < previouslyUpdatedDim; y++) {
      tilesToChange.push({ x, y });
    }
  }
  for (let y = -previouslyUpdatedDim; y < previouslyUpdatedDim; y++) {
    for (let x = -previouslyUpdatedDim; x < -gridDim; x++) {
      tilesToChange.push({ x, y });
    }
    for (let x = gridDim; x < previouslyUpdatedDim; x++) {
      tilesToChange.push({ x, y });
    }
  }
  previouslyUpdatedDim = gridDim;
  tilesToChange.forEach((tile) => {
    tilemap.putTileAt(
      0,
      tile.x + displayGridSize / 2,
      tile.y + displayGridSize / 2
    );
  });
};

export default overlayShrinkingGridTiles;
