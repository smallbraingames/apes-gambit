import {
  EntityID,
  EntityIndex,
  getComponentValue,
  getComponentValueStrict,
} from "@latticexyz/recs";

import { GameStatus } from "../../types";
import { Network } from "../../../network/types";
import { getEntityIndexFromEntity } from "../resolveEntity";
import joinGame from "../joinGame";
import revokeGameControllersIfNecessary from "./revokeGameControllersIfNecessary";

const joinMainGame = async (
  network: Network,
  gameEntity: EntityID,
  activePiece: EntityIndex
) => {
  const {
    world,
    components: { BRInGame, BRGame },
  } = network;
  const playerGame = getComponentValue(BRInGame, activePiece)?.value;
  // @ts-ignore
  if (playerGame && playerGame === gameEntity) {
    console.log("Already in game");
    return;
  }
  const game = getComponentValue(
    BRGame,
    // @ts-ignore
    getEntityIndexFromEntity(gameEntity, world)
  );
  if (game && game.status !== GameStatus.NOT_STARTED) {
    console.log("Not attempting to join game that has not started");
    return false;
  }
  await revokeGameControllersIfNecessary(network, activePiece);
  await joinGame(activePiece, gameEntity, network);
  return true;
};

export default joinMainGame;
