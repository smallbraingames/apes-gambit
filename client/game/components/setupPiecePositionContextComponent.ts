import {
  EntityIndex,
  Type,
  World,
  defineComponent,
  getComponentEntities,
  getComponentValueStrict,
  setComponent,
} from "@latticexyz/recs";

import { Coord } from "@latticexyz/utils";
import { Game } from "../types";
import { Network } from "../../network/types";

export function definePiecePositionContextComponent(world: World) {
  return defineComponent(
    world,
    {
      x: Type.Number,
      y: Type.Number,
      pieceTaken: Type.OptionalNumber,
      bananaPickedUp: Type.Boolean,
    },
    {
      id: "PiecePositionContext",
    }
  );
}

const setupPiecePositionContextComponent = (network: Network, game: Game) => {
  const {
    components: { PiecePositionContext },
  } = game;

  const {
    systemCallStreams,
    components: { PiecePosition, BRIsAlive, BRBananasPickedUp },
  } = network;

  // Setup with initial piece position
  [...getComponentEntities(PiecePosition)].forEach((entity) => {
    const position = getComponentValueStrict(PiecePosition, entity);
    setComponent(PiecePositionContext, entity, {
      ...position,
      pieceTaken: undefined,
      bananaPickedUp: false,
    });
  });

  // Listen to calls directly to the move system and update the position automatically as well
  systemCallStreams["system.MovePiece"].subscribe((call) => {
    const positionUpdates = call.updates.filter(
      (update) => update.component.id === PiecePosition.id
    );
    if (positionUpdates.length === 0) {
      console.warn(
        "System call stream for PiecePositionContext recieved call with empty position",
        call
      );
      return;
    }
    const entity = positionUpdates[0].entity;
    const position: Coord = positionUpdates[0].value as Coord;
    setComponent(PiecePositionContext, entity, {
      ...position,
      pieceTaken: undefined,
      bananaPickedUp: false,
    });
  });

  systemCallStreams["system.BRMovePieceSystem"].subscribe((call) => {
    const positionUpdates = call.updates.filter(
      (update) => update.component.id === PiecePosition.id
    );
    const isAliveUpdates = call.updates.filter(
      (update) => update.component.id === BRIsAlive.id
    );
    const bananasPickedUpUpdates = call.updates.filter(
      (update) => update.component.id === BRBananasPickedUp.id
    );

    if (positionUpdates.length === 0) {
      console.warn(
        "System call stream for PiecePositionContext recieved call with empty position",
        call
      );
      return;
    }

    const pieceEntity = positionUpdates[0].entity;
    const position: Coord = positionUpdates[0].value as Coord;

    let pieceTaken: EntityIndex | undefined = undefined;
    if (isAliveUpdates.length > 0) {
      if (isAliveUpdates[0].value) {
        console.warn("Recieved BRIsAlive to true from BRMovePieceSystem", call);
        return;
      }
      pieceTaken = isAliveUpdates[0].entity;
    }

    let bananaPickedUp = false;
    if (bananasPickedUpUpdates.length > 0) {
      bananaPickedUp = true;
    }

    setComponent(PiecePositionContext, pieceEntity, {
      x: position.x,
      y: position.y,
      pieceTaken,
      bananaPickedUp,
    });
  });
};

export default setupPiecePositionContextComponent;
