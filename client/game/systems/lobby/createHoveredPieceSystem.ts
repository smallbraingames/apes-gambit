import { Game } from "../../types";
import { Network } from "../../../network/types";
import { Subscription } from "rxjs";
import { defineComponentSystemUnsubscribable } from "../../utils/defineComponentSystemUnsubscribable";

const createHoveredPieceSystem = (_: Network, game: Game): Subscription[] => {
  const {
    gameWorld,
    components: { HoveredPiece },
  } = game;

  const subscription = defineComponentSystemUnsubscribable(
    gameWorld,
    HoveredPiece,
    (update) => {}
  );

  return [subscription];
};

export default createHoveredPieceSystem;
