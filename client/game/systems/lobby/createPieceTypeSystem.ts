import { Game } from "../../types";
import { Network } from "../../../network/types";
import { Subscription } from "rxjs";
import { defineComponentSystemUnsubscribable } from "../../utils/defineComponentSystemUnsubscribable";
import getSpriteForPiece from "../../utils/getSpriteForPiece";

const createPieceTypeSystem = (network: Network, game: Game): Subscription => {
  const {
    world,
    components: { PieceType },
  } = network;

  const {
    scenes: {
      Main: { objectPool, config },
    },
  } = game;

  const subscription = defineComponentSystemUnsubscribable(
    world,
    PieceType,
    (update) => {
      const object = objectPool.get(update.entity, "Sprite");
      const sprite = config.sprites[getSpriteForPiece(update.entity, network)];
      object.setComponent({
        id: PieceType.id,
        once: (gameObject) => {
          gameObject.setTexture(sprite.assetKey);
        },
      });
    },
    { runOnInit: true }
  );

  return subscription;
};

export default createPieceTypeSystem;
