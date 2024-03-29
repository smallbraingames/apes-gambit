import {
  EntityID,
  getComponentValue,
  getComponentValueStrict,
  setComponent,
} from "@latticexyz/recs";

import { Game } from "../types";
import { Network } from "../../network/types";
import { getEntityIndexFromEntity } from "../utils/resolveEntity";

const setupBRGridDimComponent = (network: Network, game: Game) => {
  const {
    components: { BRGridDimComponent, EmbodiedBRGameEntity },
  } = game;

  const {
    world,
    godEntityIndex,
    network: { clock },
    components: { BRGame },
  } = network;

  const gameEntity = getComponentValue(EmbodiedBRGameEntity, godEntityIndex)
    ?.value as EntityID | undefined;

  if (!gameEntity) {
    console.warn(`Not setting up grid dim component, game entity not found`);
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

  clock.time$.subscribe((now) => {
    const secondsSinceStart =
      // @ts-ignore
      Math.floor(now / 1000) - parseInt(gameConfig.startTime);
    if (secondsSinceStart < 0) {
      return;
    }
    const gridDimShrinkAmount = Math.floor(
      secondsSinceStart / gameConfig.secondsPerGridShrink
    );
    const currentGridDim = getComponentValue(
      BRGridDimComponent,
      godEntityIndex
    )?.value;
    const newGridDim = Math.max(
      gameConfig.initialGridDim - gridDimShrinkAmount,
      0
    );
    if (currentGridDim === undefined || currentGridDim !== newGridDim) {
      setComponent(BRGridDimComponent, godEntityIndex, {
        value: newGridDim,
      });
    }
  });
};

export default setupBRGridDimComponent;
