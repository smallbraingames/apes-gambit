import { AnimatedTilemap, pixelCoordToTileCoord } from "@latticexyz/phaserx";
import { Coord, tile } from "@latticexyz/utils";
import {
  TILE_HEIGHT,
  TILE_OVERLAY_COLOR,
  TILE_OVERLAY_RENDER_MULTIPLE,
  TILE_WIDTH,
} from "../constants";

import { Game } from "../types";
import { Subscription } from "rxjs";

export const renderBoardInView = (
  x: number,
  y: number,
  renderWidth: number,
  renderHeight: number,
  map: AnimatedTilemap<number, string, string>
) => {
  for (let h = 0; h < renderHeight; h += TILE_HEIGHT) {
    for (let w = 0; w < renderWidth; w += TILE_WIDTH) {
      const tileCoord = pixelCoordToTileCoord(
        { x: x + w, y: y + h },
        TILE_WIDTH,
        TILE_HEIGHT
      );
      if ((tileCoord.x + tileCoord.y) % 2 == 0) {
        map.putTileAt(tileCoord, 0);
      }
    }
  }
};

const renderBoard = (game: Game): Subscription => {
  const renderBoardSubscription = game.scenes.Main.camera.worldView$.subscribe(
    (view: Phaser.Geom.Rectangle) => {
      const renderHeight = view.height * TILE_OVERLAY_RENDER_MULTIPLE;
      const renderWidth = view.width * TILE_OVERLAY_RENDER_MULTIPLE;
      renderBoardInView(
        view.x,
        view.y,
        renderWidth,
        renderHeight,
        game.scenes.Main.maps.Main
      );
    }
  );
  return renderBoardSubscription;
};

export default renderBoard;
