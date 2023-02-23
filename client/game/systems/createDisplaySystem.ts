import { Game } from "../types";
import { Network } from "../../network/types";
import { Scenes } from "../constants";
import { Subscription } from "rxjs";
import { defineComponentSystemUnsubscribable } from "../utils/defineComponentSystemUnsubscribable";

const createDisplaySystem = (network: Network, game: Game): Subscription[] => {
  const { world } = network;

  const {
    game: phaserGame,
    components: { ActiveScene },
  } = game;

  let currentScene = Scenes.Lobby;

  const subscription = defineComponentSystemUnsubscribable(
    world,
    ActiveScene,
    (update) => {
      const scene = update.value[0]?.value as Scenes | undefined;
      if (!scene) return;
      if (scene === currentScene) return;
      if (scene === Scenes.BR) {
        phaserGame.scene.switch(Scenes.Lobby, Scenes.BR);
        currentScene = Scenes.BR;
      } else {
        phaserGame.scene.switch(Scenes.BR, Scenes.Lobby);
        currentScene = Scenes.Lobby;
      }
    },
    { runOnInit: true }
  );

  return [subscription];
};

export default createDisplaySystem;
