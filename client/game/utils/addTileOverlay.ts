import { Coord } from "@latticexyz/utils";
import { RenderDepth } from "../constants";
import { tileCoordToPixelCoord } from "@latticexyz/phaserx";

const addTileOverlay = (
  tilePosition: Coord,
  phaserScene: Phaser.Scene,
  tileWidth: number,
  tileHeight: number
): Phaser.GameObjects.Rectangle => {
  const { x, y } = tileCoordToPixelCoord(tilePosition, tileWidth, tileHeight);
  const overlay = phaserScene.add.rectangle(
    x + tileWidth / 2,
    y + tileHeight / 2,
    tileWidth,
    tileHeight,
    0xff0000,
    0.6
  );
  overlay.setDepth(RenderDepth.TILE_OVERLAY);
  return overlay;
};

export default addTileOverlay;
