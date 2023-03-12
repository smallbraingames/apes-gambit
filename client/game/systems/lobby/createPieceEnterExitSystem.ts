import { Game, Lobby } from "../../types";
import {
  Has,
  defineEnterSystem,
  defineExitSystem,
  getComponentValueStrict,
} from "@latticexyz/recs";

import { Network } from "../../../network/types";
import { Subscription } from "rxjs";

const createPieceEnterExitSystem = (
  network: Network,
  game: Game,
  lobby: Lobby
): Subscription[] => {
  const {
    world,
    components: { PiecePosition, PieceType },
  } = network;

  const { pieceSpriteManager, nametagManager } = lobby;

  defineEnterSystem(world, [Has(PiecePosition), Has(PieceType)], (update) => {
    const piecePosition = getComponentValueStrict(PiecePosition, update.entity);
    pieceSpriteManager.createPiece(update.entity, piecePosition);
  });

  defineExitSystem(
    world,
    [Has(PiecePosition), Has(PieceType)],
    async (update) => {
      await pieceSpriteManager.animateRemovePiece(update.entity);
      nametagManager.removeNametagForPiece(update.entity);
    }
  );

  return [];
};

export default createPieceEnterExitSystem;
