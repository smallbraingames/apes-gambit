import {
  EntityIndex,
  getComponentValue,
  getComponentValueStrict,
} from "@latticexyz/recs";
import { Game, Lobby, PieceState } from "../../types";
import { Network, PieceType } from "../../../network/types";

import { Subscription } from "rxjs";
import { defineComponentSystemUnsubscribable } from "../../utils/defineComponentSystemUnsubscribable";
import getPieceSpriteGameObject from "../../utils/getPieceSpriteGameObject";
import isActivePiece from "../../utils/isActivePiece";
import setPieceSprite from "../../utils/setPieceSprite";

const createPieceTypeSystem = (
  network: Network,
  game: Game,
  lobby: Lobby
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
    console.log(entity, activePiece);
    if (entity === activePiece) {
      console.log("setting move overlays");
      lobby.tileOverlayManager.setValidMoveOverlays();
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
