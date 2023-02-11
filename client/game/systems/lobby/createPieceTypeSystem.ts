import {
  EntityIndex,
  getComponentValue,
  getComponentValueStrict,
} from "@latticexyz/recs";
import { Game, PieceState } from "../../types";
import { Network, PieceType } from "../../../network/types";

import { PIECE_SPRITE_ID } from "../../constants";
import { Subscription } from "rxjs";
import { defineComponentSystemUnsubscribable } from "../../utils/defineComponentSystemUnsubscribable";
import getPieceSpriteGameObject from "../../utils/getPieceSpriteGameObject";
import isActivePiece from "../../utils/isActivePiece";
import setPieceSprite from "../../utils/setPieceSprite";
import { setValidMoveOverlays } from "../../utils/tileOverlays";

const createPieceTypeSystem = (
  network: Network,
  game: Game
): Subscription[] => {
  const {
    godEntityIndex,
    world,
    components: { PieceType },
  } = network;

  const {
    gameWorld,
    components: { ActivePiece },
    scenes: {
      Lobby: { scene, objectRegistry },
    },
  } = game;

  const updatePieceType = (entity: EntityIndex) => {
    const activePiece = getComponentValue(ActivePiece, godEntityIndex)
      ?.value as EntityIndex | undefined;

    const pieceType: PieceType = getComponentValueStrict(
      PieceType,
      entity
    ).value;

    // Create a new sprite
    const sprite = getPieceSpriteGameObject(entity, objectRegistry, scene);
    setPieceSprite(sprite, pieceType, PieceState.IDLE, entity !== activePiece);
    if (isActivePiece(game, godEntityIndex, entity)) {
      setValidMoveOverlays(network, game, game.scenes.Lobby);
    }
  };

  const pieceTypeSubscription = defineComponentSystemUnsubscribable(
    world,
    PieceType,
    (update) => {
      updatePieceType(update.entity);
    }
  );

  const activePieceSubscription = defineComponentSystemUnsubscribable(
    gameWorld,
    ActivePiece,
    (update) => {
      const activePiece = update.value[0]?.value;
      if (activePiece) {
        updatePieceType(activePiece as EntityIndex);
      }
    }
  );

  return [pieceTypeSubscription, activePieceSubscription];
};

export default createPieceTypeSystem;
