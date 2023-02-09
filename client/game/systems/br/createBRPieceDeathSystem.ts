import { EntityType, Game } from "../../types";

import { Network } from "../../../network/types";
import { PIECE_SPRITE_ID } from "../../constants";
import { Subscription } from "rxjs";
import { defineComponentSystemUnsubscribable } from "../../utils/defineComponentSystemUnsubscribable";
import getEntityType from "../../utils/getEntityType";

const createBRPieceDeathSystem = (
  network: Network,
  game: Game
): Subscription[] => {
  const {
    world,
    components: { BRIsAlive: IsAlive },
  } = network;

  const {
    gameEntity,
    scenes: { BR },
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
        BR.objectRegistry.gameObjectRegistry.remove(
          update.entity,
          PIECE_SPRITE_ID
        );
        return;
      }
    },
    { runOnInit: true }
  );

  return [subscription];
};

export default createBRPieceDeathSystem;
