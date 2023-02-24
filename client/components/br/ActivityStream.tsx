import {
  EntityIndex,
  Has,
  HasValue,
  defineEnterSystem,
  defineUpdateSystem,
  getComponentValueStrict,
} from "@latticexyz/recs";
import { useContext, useEffect, useState } from "react";

import ChatInput from "../lobby/Chat";
import { Coord } from "@latticexyz/utils";
import { EntityType } from "../../game/types";
import { GameContext } from "../../context/GameContext";
import { NetworkContext } from "../../context/NetworkContext";
import { PieceType } from "../../network/types";
import createActivityUpdateFormatter from "../../utils/createActivityUpdateFormatter";
import { defineComponentSystemUnsubscribable } from "../../game/utils/defineComponentSystemUnsubscribable";
import getEntityType from "../../game/utils/getEntityType";
import { parseChatMessageFromKey } from "../../game/utils/chat/encodeChatMessage";

const ActivityStream = () => {
  const network = useContext(NetworkContext);
  const { game, gameEntity } = useContext(GameContext);
  const [activity, setActivity] = useState<JSX.Element[]>([]);

  useEffect(() => {
    if (!network.network || !game) return;

    const activityUpdateFormatter = createActivityUpdateFormatter(
      network.network
    );

    const {
      systemCallStreams,
      components: { PieceType, BRIsAlive, PiecePosition, BRInGame },
    } = network.network;

    const {
      gameWorld,
      components: { BRGridDimComponent, ChatComponent },
    } = game;

    if (!gameEntity) {
      return;
    }

    const updateChatActivity = (pieceEntity: EntityIndex) => {
      const chats = getComponentValueStrict(ChatComponent, pieceEntity);
      const encodedChat = chats.value[chats.value.length - 1];
      const message = parseChatMessageFromKey(encodedChat);
      setActivity((a) => [
        ...a,
        activityUpdateFormatter.getChatUpdate(pieceEntity, message.message),
      ]);
    };

    // Chat Activity
    defineEnterSystem(
      network.network.world,
      // @ts-ignore
      [Has(ChatComponent), HasValue(BRInGame, { value: game.gameEntity! })],
      (update) => {
        updateChatActivity(update.entity);
      }
    );

    defineUpdateSystem(
      network.network.world,
      // @ts-ignore
      [Has(ChatComponent), HasValue(BRInGame, { value: game.gameEntity! })],
      (update) => {
        updateChatActivity(update.entity);
      }
    );

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
      //chatSubscription.unsubscribe();
    };
  }, [network, game]);

  return (
    <div className="container w-full flex flex-col">
      <p className="mb-4 p-4">ACTIVITY</p>
      <div className="p-4 h-full flex flex-col flex-col-reverse overflow-y-hidden">
        <div className="flex flex-col flex-col-reverse overflow-y-auto">
          {[...activity].reverse().map((element, i) => (
            <div className="my-0.5" key={i}>
              <div>{element}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex border-t-2 border-yellow-900 ">
        <ChatInput />
      </div>
    </div>
  );
};

export default ActivityStream;
