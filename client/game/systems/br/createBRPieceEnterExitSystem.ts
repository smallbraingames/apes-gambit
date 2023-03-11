import { BR, CauseOfDeath, Game } from "../../types";
import {
  Has,
  defineEnterSystem,
  defineExitSystem,
  getComponentValueStrict,
  setComponent,
} from "@latticexyz/recs";

import { Network } from "../../../network/types";
import { Subscription } from "rxjs";

const createBRPieceEnterExitSystem = (
  network: Network,
  game: Game,
  br: BR
): Subscription[] => {
  const { world } = network;

  const {
    components: { PiecePositionContext, BRPieceDeadContext },
  } = game;

  const { pieceSpriteManager, IN_GAME_CONSTRAINTS } = br!;

  defineEnterSystem(
    world,
    [...IN_GAME_CONSTRAINTS, Has(PiecePositionContext)],
    (update) => {
      const piecePositionContext = getComponentValueStrict(
        PiecePositionContext,
        update.entity
      );
      pieceSpriteManager.createPiece(update.entity, piecePositionContext);
    }
  );

  let deathOrder = 0;
  defineExitSystem(world, IN_GAME_CONSTRAINTS, async (update) => {
    // await pieceSpriteManager.animateRemovePiece(update.entity);
    // Only gets set when a piece is taken
    setComponent(BRPieceDeadContext, update.entity, {
      order: deathOrder,
      cause: CauseOfDeath.TAKEN,
    });
    deathOrder++;
  });

  return [];
};

export default createBRPieceEnterExitSystem;
