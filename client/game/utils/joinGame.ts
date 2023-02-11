import { EntityID, EntityIndex, getComponentValue } from "@latticexyz/recs";

import { Network } from "../../network/types";
import { getEntityFromEntityIndex } from "./resolveEntity";

const joinGame = async (
  pieceEntityIndex: EntityIndex,
  gameEntity: EntityID,
  network: Network
) => {
  const {
    api: {
      br: { getBRControllers, setBRControllers, joinBRGame },
    },
    components: { Controller },
  } = network;

  const pieceEntity = getEntityFromEntityIndex(pieceEntityIndex, network.world);
  console.log(
    `Joining game with piece: ${pieceEntity} and game: ${gameEntity}`
  );
  // Check controllers
  const controllers = getComponentValue(Controller, pieceEntityIndex)?.value;
  if (
    !controllers ||
    !controllers
      .map((n) => n.toString())
      .every((n) => getBRControllers().includes(n))
  ) {
    // Set correct controller components
    console.log(`Setting controllers for entity ${pieceEntityIndex}`);
    const setControllersTx = await setBRControllers(pieceEntity);
    await setControllersTx.wait();
  }
  // Join game
  console.log("Joining game");
  const joinGameTx = await joinBRGame(pieceEntity, gameEntity);
  await joinGameTx.wait();
};

export default joinGame;
