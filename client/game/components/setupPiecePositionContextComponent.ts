import {
  EntityIndex,
  Type,
  World,
  defineComponent,
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
    components: { PiecePosition, BRIsAlive },
  } = network;

  systemCallStreams["system.BRMovePieceSystem"].subscribe((call) => {
    const positionUpdates = call.updates.filter(
      (update) => update.component.id === PiecePosition.id
    );
    const isAliveUpdates = call.updates.filter(
      (update) => update.component.id === BRIsAlive.id
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

    setComponent(PiecePositionContext, pieceEntity, {
      x: position.x,
      y: position.y,
      pieceTaken,
    });
  });
};

export default setupPiecePositionContextComponent;
