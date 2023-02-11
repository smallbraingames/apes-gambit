import { EntityID, EntityIndex, getComponentValue } from "@latticexyz/recs";

import { Network } from "../../../network/types";
import joinGame from "../joinGame";
import revokeGameControllersIfNecessary from "./revokeGameControllersIfNecessary";

const joinMainGame = async (
  network: Network,
  gameEntity: EntityID,
  activePiece: EntityIndex
) => {
  const {
    components: { BRInGame },
  } = network;
  await revokeGameControllersIfNecessary(network, activePiece);
  const playerGame = getComponentValue(BRInGame, activePiece)?.value;
  // @ts-ignore
  if (playerGame && playerGame === gameEntity) {
    console.log("Already in game");
    return;
  }
  await joinGame(activePiece, gameEntity, network);
};

export default joinMainGame;
