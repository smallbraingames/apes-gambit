import { BR, Game } from "../../types";
import {
  EntityIndex,
  Has,
  defineUpdateSystem,
  getComponentValueStrict,
} from "@latticexyz/recs";

import { Network } from "../../../network/types";
import { Subscription } from "rxjs";

const createBRPiecePositionContextSystem = (
  network: Network,
  game: Game,
  br: BR
): Subscription[] => {
  const { world } = network;

  const {
    components: { PiecePositionContext },
  } = game;

  const { pieceSpriteManager, IN_GAME_CONSTRAINTS } = br!;

  defineUpdateSystem(
    world,
    [...IN_GAME_CONSTRAINTS, Has(PiecePositionContext)],
    async (update) => {
      const piecePositionContext = getComponentValueStrict(
        PiecePositionContext,
        update.entity
      );
      if (piecePositionContext.pieceTaken) {
        await pieceSpriteManager.animateTake(
          update.entity,
          piecePositionContext.pieceTaken as EntityIndex
        );
        return;
      }
      if (piecePositionContext.bananaPickedUp) {
        await pieceSpriteManager.animateBananaPickUp(
          update.entity,
          piecePositionContext
        );
        return;
      }
      await pieceSpriteManager.animateMoveTo(
        update.entity,
        piecePositionContext
      );
    }
  );

  return [];
};

export default createBRPiecePositionContextSystem;
