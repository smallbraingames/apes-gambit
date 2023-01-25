import { EntityIndex, getComponentValueStrict } from "@latticexyz/recs";
import { Game, PieceState } from "../../types";
import { Network, PieceType } from "../../../network/types";

import { PIECE_SPRITE_ID } from "../../constants";
import { Subscription } from "rxjs";
import { defineComponentSystemUnsubscribable } from "../../utils/defineComponentSystemUnsubscribable";
import getPieceSpriteGameObject from "../../utils/getPieceSpriteGameObject";
import setPieceSprite from "../../utils/setPieceSprite";

const createPieceTypeSystem = (
  network: Network,
  game: Game
): Subscription[] => {
  const {
    godEntityIndex,
    world,
    components: { PieceType },
  } = network;

  const {
    components: { ActivePiece },
    scenes: { Main },
    objectRegistry,
  } = game;

  const subscription = defineComponentSystemUnsubscribable(
    world,
    PieceType,
    (update) => {
      const activePiece = getComponentValueStrict(ActivePiece, godEntityIndex)
        .value as EntityIndex;

      const pieceType: PieceType = getComponentValueStrict(
        PieceType,
        update.entity
      ).value;

      // Create a new sprite
      const sprite = getPieceSpriteGameObject(
        update.entity,
        objectRegistry,
        Main
      );

      setPieceSprite(
        sprite,
        pieceType,
        PieceState.IDLE,
        update.entity !== activePiece
      );

      objectRegistry.set(update.entity, PIECE_SPRITE_ID, sprite);
    }
  );

  return [subscription];
};

export default createPieceTypeSystem;
