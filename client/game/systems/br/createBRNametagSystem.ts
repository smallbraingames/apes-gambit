import { BR, Game, Lobby } from "../../types";
import {
  EntityIndex,
  Has,
  defineEnterSystem,
  defineUpdateSystem,
  getComponentValueStrict,
} from "@latticexyz/recs";

import { Network } from "../../../network/types";
import { Subscription } from "rxjs";

const createBRPieceNametagSystem = (
  network: Network,
  game: Game,
  br: BR
): Subscription[] => {
  const {
    world,
    components: { PiecePosition, PieceType, PieceName },
  } = network;

  const { nametagManager, pieceSpriteManager, IN_GAME_CONSTRAINTS } = br!;

  const updatePieceNametag = (piece: EntityIndex) => {
    const pieceName = getComponentValueStrict(PieceName, piece);
    nametagManager.displayNametagForSprite(
      pieceSpriteManager.getSprite(piece),
      piece,
      pieceName.value
    );
  };

  defineEnterSystem(
    world,
    [...IN_GAME_CONSTRAINTS, Has(PieceName)],
    (update) => {
      updatePieceNametag(update.entity);
    }
  );

  defineUpdateSystem(
    world,
    [...IN_GAME_CONSTRAINTS, Has(PieceName)],
    (update) => {
      updatePieceNametag(update.entity);
    }
  );

  return [];
};

export default createBRPieceNametagSystem;
