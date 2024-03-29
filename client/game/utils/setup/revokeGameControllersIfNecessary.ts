import {
  EntityID,
  EntityIndex,
  getComponentValue,
  getComponentValueStrict,
} from "@latticexyz/recs";

import { GameStatus } from "../../types";
import { Network } from "../../../network/types";
import { getEntityFromEntityIndex } from "../resolveEntity";

const revokeGameControllersIfNecessary = async (
  network: Network,
  piece: EntityIndex
) => {
  const {
    world,
    provider,
    components: { BRInGame, BRGame },
    api: {
      br: { leaveBRGame },
    },
  } = network;
  const pieceGameEntity = getComponentValue(BRInGame, piece);
  if (!pieceGameEntity) return;
  const game = getComponentValueStrict(
    BRGame,
    // @ts-ignore
    world.entityToIndex.get(pieceGameEntity.value as EntityID)!
  );
  if (game.status !== GameStatus.OVER) {
    return;
  }
  console.log("Revoking with data", game, pieceGameEntity.value);
  // In a game that is over, revoke controllers
  console.log("Revoking controllers...");
  // @ts-ignore
  const tx = await leaveBRGame(getEntityFromEntityIndex(piece, world));
  await provider.waitForTransaction(tx!.hash);
};

export default revokeGameControllersIfNecessary;
