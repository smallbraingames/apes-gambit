import { BR, Game } from "../../types";
import {
  Has,
  defineEnterSystem,
  defineExitSystem,
  getComponentValueStrict,
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
    components: { PiecePositionContext },
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

  defineExitSystem(world, IN_GAME_CONSTRAINTS, async (update) => {
    // await pieceSpriteManager.animateRemovePiece(update.entity);
  });

  return [];
};

export default createBRPieceEnterExitSystem;
