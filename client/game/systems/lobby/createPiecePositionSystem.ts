import { Game, Lobby } from "../../types";
import { PIECE_SPRITE_ID, TILE_HEIGHT, TILE_WIDTH } from "../../constants";

import { Network } from "../../../network/types";
import { Subscription } from "rxjs";
import { defineComponentSystemUnsubscribable } from "../../utils/defineComponentSystemUnsubscribable";
import getPieceSpriteGameObject from "../../utils/getPieceSpriteGameObject";
import isActivePiece from "../../utils/isActivePiece";
import { tileCoordToPixelCoord } from "@latticexyz/phaserx";

const createPiecePositionSystem = (
  network: Network,
  game: Game,
  lobby: Lobby
): Subscription[] => {
  const {
    godEntityIndex,
    world,
    components: { PiecePosition },
  } = network;

  const {
    scenes: {
      Lobby: { scene, objectRegistry },
    },
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
        scene
      );
      const { x, y } = tileCoordToPixelCoord(position, TILE_WIDTH, TILE_HEIGHT);
      sprite.setPosition(x, y);
      if (isActivePiece(game, godEntityIndex, update.entity)) {
        lobby.tileOverlayManager.setValidMoveOverlays();
      }
    },
    { runOnInit: true }
  );

  return [subscription];
};

export default createPiecePositionSystem;
