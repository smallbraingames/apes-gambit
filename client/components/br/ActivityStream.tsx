import { useContext, useEffect, useState } from "react";

import { Coord } from "@latticexyz/utils";
import { EntityType } from "../../game/types";
import { GameContext } from "../../context/GameContext";
import { NetworkContext } from "../../context/NetworkContext";
import { PieceType } from "../../network/types";
import createActivityUpdateFormatter from "../../utils/createActivityUpdateFormatter";
import { defineComponentSystemUnsubscribable } from "../../game/utils/defineComponentSystemUnsubscribable";
import getEntityType from "../../game/utils/getEntityType";

const ActivityStream = () => {
  const network = useContext(NetworkContext);
  const game = useContext(GameContext);
  const [activity, setActivity] = useState<JSX.Element[]>([]);

  useEffect(() => {
    if (!network.network || !game.game) return;

    const activityUpdateFormatter = createActivityUpdateFormatter(
      network.network
    );

    const {
      systemCallStreams,
      components: { PieceType, BRIsAlive, PiecePosition, BRInGame },
    } = network.network;

    const {
      gameEntity,
      gameWorld,
      components: { BRGridDimComponent },
    } = game.game;

    if (!gameEntity) {
      return;
    }

    const gridDimSubscription = defineComponentSystemUnsubscribable(
      gameWorld,
      BRGridDimComponent,
      (update) => {
        const gridDim = update.value[0]?.value;
        if (gridDim) {
          setActivity((a) => [
            ...a,
            activityUpdateFormatter.getGridDimUpdate(gridDim),
          ]);
        }
      }
    );

    const switchSubscription = systemCallStreams[
      "system.BRSetPieceTypeSystem"
    ].subscribe((systemCall) => {
      const pieceTypeUpdates = systemCall.updates.filter(
        (update) => update.component.id === PieceType.id
      );
      pieceTypeUpdates.forEach((pieceTypeUpdate) => {
        const entity = pieceTypeUpdate.entity;
        if (!pieceTypeUpdate.value) {
          console.warn(
            `Recieved piece type update with no value`,
            pieceTypeUpdate
          );
          return;
        }
        if (
          !(
            getEntityType(
              pieceTypeUpdate.entity,
              network.network!,
              gameEntity
            ) === EntityType.BR_PIECE
          )
        ) {
          return;
        }
        const pieceType = pieceTypeUpdate.value.value as PieceType;
        setActivity((a) => [
          ...a,
          activityUpdateFormatter.getPieceTypeUpdate(entity, pieceType),
        ]);
      });
    });

    const moveSubscription = systemCallStreams[
      "system.BRMovePieceSystem"
    ].subscribe((systemCall) => {
      const piecePositionUpdates = systemCall.updates.filter(
        (update) => update.component.id === PiecePosition.id
      );
      const pieceAliveUpdates = systemCall.updates.filter(
        (update) => update.component.id === BRIsAlive.id
      );

      const piecePositionUpdate =
        piecePositionUpdates.length > 0 ? piecePositionUpdates[0] : undefined;
      const pieceAliveUpdate =
        pieceAliveUpdates.length > 0 ? pieceAliveUpdates[0] : undefined;

      if (piecePositionUpdate === undefined) {
        return;
      }

      if (
        !(
          getEntityType(
            piecePositionUpdate.entity,
            network.network!,
            gameEntity
          ) === EntityType.BR_PIECE
        )
      ) {
        return;
      }

      setActivity((a) => [
        ...a,
        activityUpdateFormatter.getPieceMoveUpdate(
          piecePositionUpdate.entity,
          piecePositionUpdate.value as Coord
        ),
      ]);

      if (pieceAliveUpdate) {
        // PieceAliveUpdates should always signify that the piece died
        // since a piece cannot be set to alive from the BR movement system
        if (pieceAliveUpdate.value && pieceAliveUpdate.value.value) {
          console.warn(
            "Received invalid piece alive update from BRMovePieceSystem",
            pieceAliveUpdate
          );
        }

        setActivity((a) => [
          ...a,
          activityUpdateFormatter.getPieceDeathUpdate(
            piecePositionUpdate.entity,
            pieceAliveUpdate.entity
          ),
        ]);
      }
    });

    const joinGameSubscription = systemCallStreams[
      "system.BRJoinGameSystem"
    ].subscribe((systemCall) => {
      const inGameUpdates = systemCall.updates.filter(
        (update) => update.component.id === BRInGame.id
      );
      if (inGameUpdates.length === 0) {
        return;
      }
      const inGameUpdate = inGameUpdates[0];

      if (
        !(
          getEntityType(inGameUpdate.entity, network.network!, gameEntity) ===
          EntityType.BR_PIECE
        )
      ) {
        return;
      }

      setActivity((a) => [
        ...a,
        activityUpdateFormatter.getJoinedGameUpdate(inGameUpdate.entity),
      ]);
    });

    return () => {
      moveSubscription.unsubscribe();
      switchSubscription.unsubscribe();
      gridDimSubscription.unsubscribe();
      joinGameSubscription.unsubscribe();
    };
  }, [network, game]);

  return (
    <div className="bg-yellow-50 py-4 pl-5 border border-b-4 border-r-2 border-yellow-900 text-yellow-900 rounded-lg w-full flex flex-col">
      <p className="mt-1 mb-2">ACTIVITY</p>
      <div className="h-full flex flex-col flex-col-reverse overflow-y-hidden">
        <div className="flex flex-col flex-col-reverse overflow-y-auto">
          {[...activity].reverse().map((element, i) => (
            <div className="my-0.5" key={i}>
              <div>{element}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityStream;
