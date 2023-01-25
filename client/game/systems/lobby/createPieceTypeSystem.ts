import { Assets, PIECE_SPRITE_ID } from "../../constants";
import { EntityIndex, getComponentValueStrict } from "@latticexyz/recs";
import { Game, PieceState } from "../../types";
import { Network, PieceType } from "../../../network/types";

import { Subscription } from "rxjs";
import { defineComponentSystemUnsubscribable } from "../../utils/defineComponentSystemUnsubscribable";
import { getAssetKeyForPiece } from "../../utils/config/assets";
import getPieceSpriteGameObject from "../../utils/getPieceSpriteGameObject";
import { getSpriteKeyForPiece } from "../../utils/config/sprites";
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
      // const activePiece = getComponentValueStrict(ActivePiece, godEntityIndex)
      //   .value as EntityIndex;

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

      setPieceSprite(sprite, pieceType, PieceState.IDLE, false);

      objectRegistry.set(update.entity, PIECE_SPRITE_ID, sprite);
    }
  );

  return [subscription];
};

export default createPieceTypeSystem;
