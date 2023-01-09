import { EntityType, Game } from "../../types";

import { Network } from "../../../network/types";
import { Subscription } from "rxjs";
import { defineComponentSystemUnsubscribable } from "../../utils/defineComponentSystemUnsubscribable";
import getEntityType from "../../utils/getEntityType";

const createBRPieceDeathSystem = (
  network: Network,
  game: Game
): Subscription => {
  const {
    world,
    components: { BRIsAlive: IsAlive },
  } = network;

  const {
    gameEntity,
    scenes: {
      Main: { objectPool },
    },
  } = game;

  const subscription = defineComponentSystemUnsubscribable(
    world,
    IsAlive,
    (update) => {
      // Before we remove this entity, they must be an entity in the current game
      if (
        getEntityType(update.entity, network, gameEntity!) !==
        EntityType.BR_PIECE
      )
        return;

      const isAlive = update.value[0];
      if (!isAlive) {
        objectPool.remove(update.entity);
        return;
      }
    },
    { runOnInit: true }
  );

  return subscription;
};

export default createBRPieceDeathSystem;
