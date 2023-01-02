import { createPhaserEngine } from "@latticexyz/phaserx";
import { phaserConfig } from "./config";

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

  return context;
}
