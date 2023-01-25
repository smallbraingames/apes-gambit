import {
  defineComponentSystem,
  removeComponent,
  setComponent,
} from "@latticexyz/recs";

import { Game } from "../types";
import { Network } from "../../network/types";
import getPieceSpriteGameObject from "../utils/getPieceSpriteGameObject";

const setupHoveredPieceComponent = (network: Network, game: Game) => {
  const {
    gameWorld,
    objectRegistry,
    scenes: { Main },
    components: { HoveredPiece },
  } = game;

  const {
    godEntityIndex,
    components: { PiecePosition },
  } = network;

  defineComponentSystem(gameWorld, PiecePosition, (update) => {
    const sprite = getPieceSpriteGameObject(
      update.entity,
      objectRegistry,
      Main
    );
    sprite.setInteractive();
    sprite.on("pointerover", () => {
      setComponent(HoveredPiece, godEntityIndex, {
        value: update.entity,
      });
    });

    sprite.on("pointerout", () =>
      removeComponent(HoveredPiece, godEntityIndex)
    );
  });
};

export default setupHoveredPieceComponent;
