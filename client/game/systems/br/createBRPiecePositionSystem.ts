import { Game } from "../../types";
import { Network } from "../../../network/types";
import { Sprites } from "../../constants";
import { Subscription } from "rxjs";
import { defineComponentSystemUnsubscribable } from "../../utils/defineComponentSystemUnsubscribable";
import isActiveGamePiece from "../../utils/isActiveGamePiece";
import { tileCoordToPixelCoord } from "@latticexyz/phaserx";

const createBRPiecePositionSystem = (
  network: Network,
  game: Game
): Subscription => {
  const {
    world,
    components: { PiecePosition },
  } = network;

  const {
    gameEntity,
    scenes: {
      Main: {
        objectPool,
        config,
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
      if (!isActiveGamePiece(update.entity, network, gameEntity!)) return;

      const position = update.value[0];
      if (!position) {
        objectPool.remove(update.entity);
        return;
      }
      const object = objectPool.get(update.entity, "Sprite");
      const { x, y } = tileCoordToPixelCoord(position, tileWidth, tileHeight);
      const sprite = config.sprites[Sprites.Pawn];
      object.setComponent({
        id: PiecePosition.id,
        once: (gameObject) => {
          gameObject.setTexture(sprite.assetKey);
          gameObject.setPosition(x, y);
        },
      });
    },
    { runOnInit: true }
  );

  return subscription;
};

export default createBRPiecePositionSystem;