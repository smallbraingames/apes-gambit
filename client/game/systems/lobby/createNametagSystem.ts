import {
  EntityIndex,
  Has,
  defineEnterSystem,
  defineExitSystem,
  defineUpdateSystem,
  getComponentValueStrict,
} from "@latticexyz/recs";
import { Game, Lobby } from "../../types";

import { Network } from "../../../network/types";
import { Subscription } from "rxjs";

const createPieceNametagSystem = (
  network: Network,
  game: Game,
  lobby: Lobby
): Subscription[] => {
  const {
    world,
    components: { PiecePosition, PieceType, PieceName },
  } = network;

  const { nametagManager, pieceSpriteManager } = lobby;

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
    [Has(PiecePosition), Has(PieceType), Has(PieceName)],
    (update) => {
      updatePieceNametag(update.entity);
    }
  );

  defineUpdateSystem(
    world,
    [Has(PiecePosition), Has(PieceType), Has(PieceName)],
    (update) => {
      updatePieceNametag(update.entity);
    }
  );

  return [];
};

export default createPieceNametagSystem;
