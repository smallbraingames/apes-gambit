import {
  Assets,
  BOUNDARY_SPRITE_ID,
  CHESS_TILEMAP_ID,
  RenderDepth,
  TILE_HEIGHT,
  TILE_WIDTH,
} from "../../constants";
import { tileCoordToPixelCoord, tween } from "@latticexyz/phaserx";

import { Coord } from "@latticexyz/utils";
import { EntityIndex } from "@latticexyz/recs";
import { Scene } from "../../types";

let previouslyUpdatedDim: number;

const addBoundarySprite = async (
  scene: Scene,
  tileCoord: Coord,
  godEntityIndex: EntityIndex
) => {
  const { objectRegistry, scene: phaserScene } = scene;
  const { x, y } = tileCoordToPixelCoord(tileCoord, TILE_WIDTH, TILE_HEIGHT);
  const boundaryImage = phaserScene.add.sprite(x, y, Assets.Boundary);
  boundaryImage.setOrigin(0, 0);
  boundaryImage.setDepth(RenderDepth.BOUNDARY);
  const finalY = y + TILE_HEIGHT / 2 - boundaryImage.height / 1.5;
  boundaryImage.setPosition(
    x + TILE_WIDTH / 2 - boundaryImage.width / 2,
    finalY - scene.camera.phaserCamera.displayHeight
  );
  await tween(
    {
      targets: boundaryImage,
      duration: 500,
      props: {
        y: finalY,
      },
      ease: Phaser.Math.Easing.Sine.In,
    },
    { keepExistingTweens: true }
  ),
    objectRegistry.gameObjectRegistry.set(
      godEntityIndex,
      `${BOUNDARY_SPRITE_ID}-${x}-${y}`,
      boundaryImage
    );
};

const overlayShrinkingGridBoundary = async (
  scene: Scene,
  godEntityIndex: EntityIndex,
  gridDim: number,
  cleanupTile: (tileCoord: Coord) => void
) => {
  const { objectRegistry } = scene;
  const tilemap = objectRegistry.tilemapRegistry.get(
    godEntityIndex,
    CHESS_TILEMAP_ID
  );
  const displayGridSize = tilemap.width / 2;
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
  await Promise.all(
    tilesToChange.map(async (tile) => {
      await addBoundarySprite(scene, tile, godEntityIndex);
      cleanupTile(tile);
    })
  );
  scene.camera.phaserCamera.shake(300, 0.3);
};

export default overlayShrinkingGridBoundary;
