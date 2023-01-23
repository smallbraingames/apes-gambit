import { EntityIndex, getComponentValueStrict } from "@latticexyz/recs";
import { Game, PieceState } from "../../types";
import { Network, PieceType } from "../../../network/types";

import { Subscription } from "rxjs";
import { defineComponentSystemUnsubscribable } from "../../utils/defineComponentSystemUnsubscribable";
import isActiveGamePiece from "../../utils/isActiveGamePiece";
import setPieceSprite from "../../utils/setPieceSprite";

const createBRPieceTypeSystem = (
  network: Network,
  game: Game
): Subscription[] => {
  const {
    godEntityIndex,
    world,
    components: { PieceType },
  } = network;

  const {
    gameEntity,
    components: { ActivePiece },
    scenes: {
      Main: { objectPool },
    },
  } = game;

  const subscription = defineComponentSystemUnsubscribable(
    world,
    PieceType,
    (update) => {
      if (!isActiveGamePiece(update.entity, network, gameEntity!)) return;
      const activePiece = getComponentValueStrict(ActivePiece, godEntityIndex)
        .value as EntityIndex;
      const pieceType: PieceType | undefined = update.value[0]?.value;
      if (pieceType === undefined)
        throw Error("No piece type component for active game piece");
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

export default createBRPieceTypeSystem;
