import { BR, Game } from "../../types";
import {
  Has,
  defineUpdateSystem,
  getComponentValueStrict,
} from "@latticexyz/recs";
import { Network, PieceType } from "../../../network/types";

import { Subscription } from "rxjs";

const createBRPieceTypeSystem = (
  network: Network,
  _: Game,
  br: BR
): Subscription[] => {
  const {
    world,
    components: { PieceType },
  } = network;

  const { pieceSpriteManager, IN_GAME_CONSTRAINTS } = br!;

  defineUpdateSystem(
    world,
    // @ts-ignore
    [...IN_GAME_CONSTRAINTS, Has(PieceType)],
    (update) => {
      const pieceType = getComponentValueStrict(PieceType, update.entity)
        .value as PieceType;
      pieceSpriteManager.animateSwitchType(update.entity, pieceType);
    }
  );

  return [];
};

export default createBRPieceTypeSystem;
