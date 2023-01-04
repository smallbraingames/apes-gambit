import { TILE_HEIGHT, TILE_WIDTH } from "./constants";

import { Game } from "./types";
import { Subscription } from "rxjs";

const renderBoard = (game: Game): Subscription => {
  const renderBoardSubscription = game.scenes.Main.camera.worldView$.subscribe(
    (view: Phaser.Geom.Rectangle) => {
      for (let h = 0; h < view.height * 1.5; h += TILE_HEIGHT) {
        for (let w = 0; w < view.width * 1.5; w += TILE_WIDTH) {
          let x = Math.floor((view.x + w) / TILE_WIDTH);
          let y = Math.floor((view.y + h) / TILE_HEIGHT);
          if ((x + y) % 2 == 0) {
            game.scenes.Main.maps.Main.putTileAt({ x, y }, 0);
          }
        }
      }
    }
  );
  return renderBoardSubscription;
};

export default renderBoard;
