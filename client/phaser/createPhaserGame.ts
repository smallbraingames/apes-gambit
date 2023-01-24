import createObjectRegistry from "./createObjectRegistry";
import { deferred } from "@latticexyz/utils";

const createPhaserGame = async (config: Phaser.Types.Core.GameConfig) => {
  const game = new Phaser.Game(config);
  const [resolve, , promise] = deferred();
  game.events.on("ready", resolve);
  await promise;

  const objectRegistry = createObjectRegistry();

  return { game, objectRegistry };
};

export default createPhaserGame;
