import {
  clearValidMoveOverlays,
  setValidMoveOverlays,
} from "../../utils/tileOverlays";

import { Game } from "../../types";
import { Network } from "../../../network/types";
import { Subscription } from "rxjs";
import { defineComponentSystemUnsubscribable } from "../../utils/defineComponentSystemUnsubscribable";

const createBRValidMoveOverlaySystem = (
  network: Network,
  game: Game
): Subscription[] => {
  const { world, godEntityIndex } = network;
  const {
    scenes: {
      BR: { objectRegistry },
    },
    components: { BRRechargeTimerComponent },
  } = game;

  const subscription = defineComponentSystemUnsubscribable(
    world,
    BRRechargeTimerComponent,
    (update) => {
      const time = update.value[0]?.value;
      if (!time) {
        setValidMoveOverlays(network, game, game.scenes.BR);
      } else {
        clearValidMoveOverlays(objectRegistry, godEntityIndex);
      }
    }
  );

  return [subscription];
};

export default createBRValidMoveOverlaySystem;
