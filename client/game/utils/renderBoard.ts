import { TILE_HEIGHT, TILE_WIDTH } from "../constants";

import { Game } from "../types";
import { Subscription } from "rxjs";
import { pixelCoordToTileCoord } from "@latticexyz/phaserx";

const renderBoard = (game: Game): Subscription => {
  const renderBoardSubscription = game.scenes.Main.camera.worldView$.subscribe(
    (view: Phaser.Geom.Rectangle) => {
      for (let h = 0; h < view.height * 1.5; h += TILE_HEIGHT) {
        for (let w = 0; w < view.width * 1.5; w += TILE_WIDTH) {
          const tileCoord = pixelCoordToTileCoord(
            { x: view.x + w, y: view.y + h },
            TILE_WIDTH,
            TILE_HEIGHT
          );
          if ((tileCoord.x + tileCoord.y) % 2 == 0) {
            game.scenes.Main.maps.Main.putTileAt(tileCoord, 0);
          }
        }
      }
    }
  );
  return renderBoardSubscription;
};

export default renderBoard;
