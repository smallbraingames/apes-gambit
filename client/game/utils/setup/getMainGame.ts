import {
  EntityID,
  EntityIndex,
  getComponentEntities,
  getComponentValueStrict,
} from "@latticexyz/recs";

import { GameStatus } from "../../types";
import { Network } from "../../../network/types";

// Gets the game the frontend should use
const getMainGame = (network: Network): EntityIndex | undefined => {
  const {
    world,
    components: { BRGame },
  } = network;
  const params = new URLSearchParams(window.location.search);
  const gameEntityID = params.get("gameEntity") as EntityID | undefined;
  const gameEntityIndex = world.entityToIndex.get(
    gameEntityID ? gameEntityID : ("-1" as EntityID)
  );
  if (gameEntityIndex) {
    return gameEntityIndex;
  } else {
    console.warn("No game entity in url, returning undefined");
  }
  // const gameEntities = getComponentEntities(BRGame);
  // const games = [...gameEntities]
  //   .map((gameEntity) => ({
  //     entity: gameEntity,
  //     game: getComponentValueStrict(BRGame, gameEntity),
  //   }))
  //   .filter((game) => game.game.status !== GameStatus.OVER)
  //   .sort((a, b) => a.game.startTime - b.game.startTime);
  // if (games.length > 0) return games[0].entity;
  return undefined;
};

export default getMainGame;
