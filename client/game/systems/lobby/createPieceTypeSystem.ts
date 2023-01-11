import { Game } from "../../types";
import { Network } from "../../../network/types";
import { Subscription } from "rxjs";
import { defineComponentSystemUnsubscribable } from "../../utils/defineComponentSystemUnsubscribable";
import setPieceSprite from "../../utils/setPieceSprite";

const createPieceTypeSystem = (network: Network, game: Game): Subscription => {
  const {
    world,
    components: { PieceType },
  } = network;

  const {
    scenes: {
      Main: { objectPool },
    },
  } = game;

  const subscription = defineComponentSystemUnsubscribable(
    world,
    PieceType,
    (update) => {
      const object = objectPool.get(update.entity, "Sprite");
      object.setComponent({
        id: PieceType.id,
        once: (gameObject) => {
          setPieceSprite(update.entity, gameObject, game, network);
        },
      });
    },
    { runOnInit: true }
  );

  return subscription;
};

export default createPieceTypeSystem;