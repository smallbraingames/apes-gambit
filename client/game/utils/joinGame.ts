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
  const setControllersTx = await network.api.br.setBRControllers(pieceEntity);
  await setControllersTx.wait();
  // Join game
  console.log("joining game");
  const joinGameTx = await network.api.br.joinBRGame(pieceEntity, gameEntity);
  await joinGameTx.wait();
};

export default joinGame;
