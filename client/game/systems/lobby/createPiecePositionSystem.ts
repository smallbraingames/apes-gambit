import {
  PIECE_SPRITE_ID,
  PIECE_X_OFFSET,
  PIECE_Y_OFFSET,
  TILE_HEIGHT,
  TILE_WIDTH,
} from "../../constants";

import { Game } from "../../types";
import { Network } from "../../../network/types";
import { Subscription } from "rxjs";
import { defineComponentSystemUnsubscribable } from "../../utils/defineComponentSystemUnsubscribable";
import getPieceSpriteGameObject from "../../utils/getPieceSpriteGameObject";
import { setValidMoveOverlays } from "../../utils/tileOverlays";
import { tileCoordToPixelCoord } from "@latticexyz/phaserx";

const createPiecePositionSystem = (
  network: Network,
  game: Game
): Subscription[] => {
  const {
    world,
    components: { PiecePosition },
  } = network;

  const {
    objectRegistry,
    scenes: { Main },
  } = game;

  const subscription = defineComponentSystemUnsubscribable(
    world,
    PiecePosition,
    (update) => {
      const position = update.value[0];
      if (!position) {
        objectRegistry.gameObjectRegistry.remove(
          update.entity,
          PIECE_SPRITE_ID
        );
        return;
      }
      const sprite = getPieceSpriteGameObject(
        update.entity,
        objectRegistry,
        Main
      );
      const { x, y } = tileCoordToPixelCoord(position, TILE_WIDTH, TILE_HEIGHT);
      sprite.setPosition(x, y);
      setValidMoveOverlays(network, game);
    },
    { runOnInit: true }
  );

  return [subscription];
};

export default createPiecePositionSystem;
