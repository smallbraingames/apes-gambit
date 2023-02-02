import { EntityIndex, getComponentValue } from "@latticexyz/recs";

import { Game } from "../../types";
import { Network } from "../../../network/types";

const spawnPiece = async (network: Network, game: Game) => {
  const { godEntityIndex, provider } = network;
  const {
    components: { ActivePiece },
  } = game;
  const activePiece = getComponentValue(ActivePiece, godEntityIndex);
  if (activePiece) {
    console.warn(
      `Not spawning piece since active piece with entity index ${activePiece.value}`
    );
    return activePiece.value as EntityIndex;
  }
  console.log("Spawning new piece");
  console.log(network);
  const tx = await network.api.spawnPiece();
  await provider.waitForTransaction(tx.hash);
};

export default spawnPiece;
