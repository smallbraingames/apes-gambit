import {
  defineComponentSystem,
  removeComponent,
  setComponent,
} from "@latticexyz/recs";

import { Game } from "../types";
import { Network } from "../../network/types";

const setupHoveredPieceComponent = (network: Network, game: Game) => {
  const {
    gameWorld,
    scenes: {
      Main: { objectPool },
    },
    components: { HoveredPiece },
  } = game;

  const {
    godEntityIndex,
    components: { PiecePosition },
  } = network;

  defineComponentSystem(gameWorld, PiecePosition, (update) => {
    const object = objectPool.get(update.entity, "Sprite");
    if (object.hasComponent(HoveredPiece.id)) return;
    object.setComponent({
      id: HoveredPiece.id,
      once: (gameObject) => {
        gameObject.setInteractive();
        gameObject.on("pointerover", () =>
          setComponent(HoveredPiece, godEntityIndex, {
            value: update.entity,
          })
        );
        gameObject.on("pointerout", () =>
          removeComponent(HoveredPiece, godEntityIndex)
        );
      },
    });
  });
};

export default setupHoveredPieceComponent;
