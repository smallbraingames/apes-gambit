import {
  EntityID,
  EntityIndex,
  getComponentValue,
  getComponentValueStrict,
} from "@latticexyz/recs";

import { GameStatus } from "../../types";
import { Network } from "../../../network/types";

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
  if (game.status !== GameStatus.OVER) return;
  // In a game that is over, so revoke controllers
  const tx = await leaveBRGame(world.entities[piece]);
  await provider.waitForTransaction(tx.hash);
};

export default revokeGameControllersIfNecessary;
