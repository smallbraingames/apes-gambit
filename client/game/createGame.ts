import { createPhaserEngine } from "@latticexyz/phaserx";
import { phaserConfig } from "./config";
import renderBoard from "./renderBoard";

export async function createGame() {
  const {
    game,
    scenes,
    dispose: disposePhaser,
  } = await createPhaserEngine(phaserConfig);

  const context = {
    game,
    scenes,
    disposePhaser,
  };

  // Setup chessboard
  renderBoard(context);

  return context;
}
