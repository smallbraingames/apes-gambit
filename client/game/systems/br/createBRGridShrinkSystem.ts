import { Game } from "../../types";
import { Network } from "../../../network/types";
import { Subscription } from "rxjs";
import { defineComponentSystemUnsubscribable } from "../../utils/defineComponentSystemUnsubscribable";
import overlayShrinkingGridTiles from "../../utils/overlayShrinkingGridTiles";

const createBRGridShrinkSystem = (
  network: Network,
  game: Game
): Subscription[] => {
  const { godEntityIndex } = network;
  const {
    gameWorld,
    scenes: { Main },
    objectRegistry,
    components: { BRGridDimComponent },
  } = game;

  const subscription = defineComponentSystemUnsubscribable(
    gameWorld,
    BRGridDimComponent,
    (update) => {
      const gridDim = update.value[0]?.value;
      console.log(update);
      if (gridDim === undefined) {
        return;
      }
      overlayShrinkingGridTiles(godEntityIndex, gridDim, objectRegistry);
    },
    { runOnInit: true }
  );

  return [subscription];
};

export default createBRGridShrinkSystem;
