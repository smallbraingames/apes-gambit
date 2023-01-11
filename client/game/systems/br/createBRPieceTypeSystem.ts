import { Game } from "../../types";
import { Network } from "../../../network/types";
import { Subscription } from "rxjs";
import { defineComponentSystemUnsubscribable } from "../../utils/defineComponentSystemUnsubscribable";
import isActiveGamePiece from "../../utils/isActiveGamePiece";
import setPieceSprite from "../../utils/setPieceSprite";

const createBRPieceTypeSystem = (
  network: Network,
  game: Game
): Subscription => {
  const {
    world,
    components: { PieceType },
  } = network;

  const {
    gameEntity,
    scenes: {
      Main: { objectPool },
    },
  } = game;

  const subscription = defineComponentSystemUnsubscribable(
    world,
    PieceType,
    (update) => {
      if (!isActiveGamePiece(update.entity, network, gameEntity!)) return;
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

export default createBRPieceTypeSystem;
