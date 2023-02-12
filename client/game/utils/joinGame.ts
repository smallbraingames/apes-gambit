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
  let needsSetControllers = false;
  if (!controllers) {
    needsSetControllers = true;
  } else {
    // @ts-ignore
    const controllersSet = new Set<string>(controllers);
    const brControllers = new Set(getBRControllers());
    const isEqual =
      controllersSet.size === brControllers.size &&
      [...controllersSet].every((s) => brControllers.has(s));
    if (!isEqual) {
      needsSetControllers = true;
    }
  }

  if (needsSetControllers) {
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
