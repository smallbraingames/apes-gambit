import { Game, Lobby } from "../../types";
import {
  Has,
  defineUpdateSystem,
  getComponentValueStrict,
} from "@latticexyz/recs";

import { Network } from "../../../network/types";
import { Subscription } from "rxjs";

const createPiecePositionSystem = (
  network: Network,
  _: Game,
  lobby: Lobby
): Subscription[] => {
  const {
    world,
    components: { PiecePosition },
  } = network;

  const { pieceSpriteManager } = lobby;

  defineUpdateSystem(world, [Has(PiecePosition)], (update) => {
    const piecePosition = getComponentValueStrict(PiecePosition, update.entity);
    pieceSpriteManager.animateMoveTo(update.entity, piecePosition);
  });

  return [];
};

export default createPiecePositionSystem;
