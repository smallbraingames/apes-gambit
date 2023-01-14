import { PIECE_X_OFFSET, PIECE_Y_OFFSET } from "../../constants";

import { Game } from "../../types";
import { Network } from "../../../network/types";
import { Subscription } from "rxjs";
import { defineComponentSystemUnsubscribable } from "../../utils/defineComponentSystemUnsubscribable";
import { tileCoordToPixelCoord } from "@latticexyz/phaserx";

const createPiecePositionSystem = (
  network: Network,
  game: Game
): Subscription[] => {
  const {
    world,
    components: { PiecePosition },
  } = network;

  const {
    scenes: {
      Main: {
        objectPool,
        maps: {
          Main: { tileWidth, tileHeight },
        },
      },
    },
  } = game;

  const subscription = defineComponentSystemUnsubscribable(
    world,
    PiecePosition,
    (update) => {
      const position = update.value[0];
      if (!position) {
        objectPool.remove(update.entity);
        return;
      }
      const object = objectPool.get(update.entity, "Sprite");
      const { x, y } = tileCoordToPixelCoord(position, tileWidth, tileHeight);

      object.setComponent({
        id: PiecePosition.id,
        once: (gameObject) => {
          gameObject.setPosition(x + PIECE_X_OFFSET, y + PIECE_Y_OFFSET);
        },
      });
    },
    { runOnInit: true }
  );

  return [subscription];
};

export default createPiecePositionSystem;
