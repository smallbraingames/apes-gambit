import { EntityIndex, getComponentValue } from "@latticexyz/recs";

import { Network } from "../../../network/types";
import getMainGame from "./getMainGame";
import joinGame from "../joinGame";
import revokeGameControllersIfNecessary from "./revokeGameControllersIfNecessary";

const joinMainGame = async (network: Network, activePiece: EntityIndex) => {
  const {
    world,
    components: { BRInGame },
  } = network;
  await revokeGameControllersIfNecessary(network, activePiece);
  const mainGame = getMainGame(network);
  if (!mainGame) return;
  const playerGame = getComponentValue(BRInGame, activePiece);
  // @ts-ignore
  if (playerGame && world.entityToIndex.get(playerGame.value) === mainGame)
    return;
  await joinGame(activePiece, world.entities[mainGame], network);
};

export default joinMainGame;
