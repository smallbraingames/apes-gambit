import { EntityType, Game } from "../types";

import { Network } from "../../network/types";
import { defineComponentSystem } from "@latticexyz/recs";
import getEntityType from "../utils/getEntityType";

const createPieceDeathSystem = (network: Network, game: Game) => {
  const {
    world,
    components: { IsAlive },
  } = network;

  const {
    gameEntity,
    scenes: {
      Main: { objectPool },
    },
  } = game;

  defineComponentSystem(
    world,
    IsAlive,
    (update) => {
      // Before we remove this entity, they must be an entity in the current game
      if (
        getEntityType(update.entity, network, gameEntity) !==
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
};

export default createPieceDeathSystem;
