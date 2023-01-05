import { EntityID, EntityIndex } from "@latticexyz/recs";

import { Network } from "../../network/types";
import getEntityFromEntityIndex from "./getEntityFromEntityIndex";

const joinGame = async (
  pieceEntityIndex: EntityIndex,
  gameEntity: EntityID,
  network: Network
) => {
  const pieceEntity = getEntityFromEntityIndex(pieceEntityIndex, network.world);
  // Set correct controller components
  console.log(`setting controllers for entity ${pieceEntityIndex}`);
  await network.api.setControllers(pieceEntity);
  // Join game
  console.log("joining game");
  await network.api.joinGame(pieceEntity, gameEntity);
};

export default joinGame;
