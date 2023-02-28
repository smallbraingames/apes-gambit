import { Game, Lobby } from "../../types";
import {
  Has,
  defineUpdateSystem,
  getComponentValueStrict,
} from "@latticexyz/recs";
import { Network, PieceType } from "../../../network/types";

import { Subscription } from "rxjs";

const createPieceTypeSystem = (
  network: Network,
  _: Game,
  lobby: Lobby
): Subscription[] => {
  const {
    world,
    components: { PieceType },
  } = network;

  const { pieceSpriteManager } = lobby;

  defineUpdateSystem(world, [Has(PieceType)], (update) => {
    const pieceType = getComponentValueStrict(PieceType, update.entity)
      .value as PieceType;
    pieceSpriteManager.animateSwitchType(update.entity, pieceType);
  });

  return [];
};

export default createPieceTypeSystem;
