import { GameConfig } from "../phaser/types";
import { Scenes } from "./constants";
import assets from "./utils/config/assets";

export const config: GameConfig = {
  scenes: {
    [Scenes.Lobby]: {
      assets,
    },
    [Scenes.BR]: {
      assets,
    },
  },
};
