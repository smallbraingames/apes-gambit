import {
  EntityID,
  EntityIndex,
  defineComponentSystem,
  getComponentValue,
  setComponent,
} from "@latticexyz/recs";

import { Game } from "../types";
import { Network } from "../../network/types";
import { Subscription } from "rxjs";
import { getEntityIndexFromEntity } from "../utils/resolveEntity";

const setupBRRechargeTimerComponent = (network: Network, game: Game) => {
  const {
    gameWorld,
    components: { BRRechargeTimerComponent, ActivePiece, EmbodiedBRGameEntity },
  } = game;

  const {
    godEntityIndex,
    world,
    network: { clock },
    components: { BRPreviousMoveTimestamp, BRGame },
  } = network;

  const gameEntity = getComponentValue(EmbodiedBRGameEntity, godEntityIndex)
    ?.value as EntityID | undefined;

  if (!gameEntity) {
    console.warn(`Not setting up recharge timer, game entity not found`);
    return;
  }

  const gameConfig = getComponentValue(
    BRGame,
    getEntityIndexFromEntity(gameEntity, world)
  );

  if (!gameConfig) {
    console.warn(`Could not find game config for game entity: ${gameEntity}`);
    return;
  }

  let clockSubscription: Subscription;
  // Every time active piece changes, change recharge timer component tied to it
  defineComponentSystem(gameWorld, ActivePiece, (update) => {
    const activePiece: EntityIndex | undefined = update.value[0]
      ?.value as EntityIndex;
    if (activePiece === undefined) {
      return;
    }
    if (clockSubscription) {
      clockSubscription.unsubscribe();
    }
    clockSubscription = clock.time$.subscribe((now) => {
      const nowSeconds = Math.floor(now / 1000);
      const previousMoveTime = getComponentValue(
        BRPreviousMoveTimestamp,
        activePiece
      )?.value;
      const currentTimerValue = getComponentValue(
        BRRechargeTimerComponent,
        update.entity
      );
      if (previousMoveTime) {
        const rechargeTime = Math.max(
          gameConfig.rechargeTime - (nowSeconds - previousMoveTime),
          0
        );
        setComponent(BRRechargeTimerComponent, update.entity, {
          value: rechargeTime,
        });
      } else {
        if (currentTimerValue?.value !== 0) {
          console.warn("Could not find previous move time, setting to zero");
          setComponent(BRRechargeTimerComponent, update.entity, {
            value: 0,
          });
        }
      }
    });
  });
};

export default setupBRRechargeTimerComponent;
