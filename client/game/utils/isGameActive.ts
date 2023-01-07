import { EntityID, getComponentValue } from "@latticexyz/recs";
import { GameConfig, GameStatus } from "../types";

import { Network } from "../../network/types";

const isGameActive = (gameEntity: EntityID, network: Network) => {
  const gameEntityIndex = network.world.entityToIndex.get(gameEntity);
  if (!gameEntityIndex) return false;
  const gameConfig: GameConfig | undefined = getComponentValue(
    network.components.BRGame,
    gameEntityIndex
  );
  if (!gameConfig) return false;
  return gameConfig.status === GameStatus.IN_PROGRESS;
};

export default isGameActive;
