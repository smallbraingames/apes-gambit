import { EntityIndex, getComponentValueStrict } from "@latticexyz/recs";
import { Game, PieceState } from "../../types";
import { Network, PieceType } from "../../../network/types";

import { Subscription } from "rxjs";
import { defineComponentSystemUnsubscribable } from "../../utils/defineComponentSystemUnsubscribable";
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
    scenes: {
      Main: { objectPool },
    },
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

      const object = objectPool.get(update.entity, "Sprite");
      object.setComponent({
        id: PieceType.id,
        once: (gameObject) => {
          setPieceSprite(
            gameObject,
            pieceType,
            PieceState.IDLE,
            activePiece !== update.entity
          );
        },
      });
    },
    { runOnInit: true }
  );

  return [subscription];
};

export default createPieceTypeSystem;
