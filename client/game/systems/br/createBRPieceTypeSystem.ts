import {
  EntityIndex,
  Has,
  HasValue,
  defineEnterSystem,
  defineUpdateSystem,
  getComponentValue,
  getComponentValueStrict,
} from "@latticexyz/recs";
import { Game, PieceState } from "../../types";
import { Network, PieceType } from "../../../network/types";

import { Subscription } from "rxjs";
import getPieceSpriteGameObject from "../../utils/getPieceSpriteGameObject";
import isLiveGamePiece from "../../utils/isLiveGamePiece";
import setPieceSprite from "../../utils/setPieceSprite";

const createBRPieceTypeSystem = (
  network: Network,
  game: Game
): Subscription[] => {
  const {
    godEntityIndex,
    world,
    components: { PieceType, BRInGame, BRIsAlive },
  } = network;

  const {
    gameEntity,
    objectRegistry,
    components: { ActivePiece },
    scenes: { Main },
  } = game;

  const updatePieceSprite = (entity: EntityIndex) => {
    if (!isLiveGamePiece(entity, network, gameEntity!)) return;
    const activePiece = getComponentValue(ActivePiece, godEntityIndex)
      ?.value as EntityIndex | undefined;
    const pieceType: PieceType = getComponentValueStrict(
      PieceType,
      entity
    ).value;
    const sprite = getPieceSpriteGameObject(entity, objectRegistry, Main);
    setPieceSprite(sprite, pieceType, PieceState.IDLE, activePiece !== entity);
  };

  defineEnterSystem(
    world,
    // @ts-ignore
    [Has(PieceType), HasValue(BRInGame, { value: gameEntity }), Has(BRIsAlive)],
    (update) => {
      updatePieceSprite(update.entity);
    }
  );

  defineUpdateSystem(
    world,
    // @ts-ignore
    [Has(PieceType), HasValue(BRInGame, { value: gameEntity }), Has(BRIsAlive)],
    (update) => {
      updatePieceSprite(update.entity);
    }
  );

  return [];
};

export default createBRPieceTypeSystem;
