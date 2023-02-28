import { BR, Game } from "../../types";

import { Network } from "../../../network/types";
import { Subscription } from "rxjs";
import { defineComponentSystemUnsubscribable } from "../../utils/defineComponentSystemUnsubscribable";
import overlayShrinkingGridBoundary from "../../utils/tilemap/overlayShrinkingGridBoundary";

const createBRGridShrinkSystem = (
  network: Network,
  game: Game,
  br: BR
): Subscription[] => {
  const { godEntityIndex } = network;
  const {
    gameWorld,
    scenes: { BR },
    components: { BRGridDimComponent },
  } = game;

  const subscription = defineComponentSystemUnsubscribable(
    gameWorld,
    BRGridDimComponent,
    (update) => {
      const gridDim = update.value[0]?.value;
      if (gridDim === undefined) {
        return;
      }
      overlayShrinkingGridBoundary(BR, godEntityIndex, gridDim);
    },
    { runOnInit: true }
  );

  return [subscription];
};

export default createBRGridShrinkSystem;
