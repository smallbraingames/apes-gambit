import {
  EntityIndex,
  Has,
  defineEnterSystem,
  defineUpdateSystem,
  getComponentValueStrict,
} from "@latticexyz/recs";
import { Game, Lobby } from "../../types";

import { Network } from "../../../network/types";
import { Subscription } from "rxjs";
import { parseChatMessageFromKey } from "../../utils/chat/encodeChatMessage";

const createChatSystem = (
  network: Network,
  game: Game,
  lobby: Lobby
): Subscription[] => {
  const {
    world,
    components: { PiecePosition },
  } = network;

  const {
    components: { ChatComponent },
  } = game;

  const { pieceSpriteManager } = lobby;

  const updateDisplayedChatMessages = (pieceEntity: EntityIndex) => {
    const chat = getComponentValueStrict(ChatComponent, pieceEntity);
    const message = parseChatMessageFromKey(
      chat.value[chat.value.length - 1]
    ).message;
    pieceSpriteManager.animateSpeechBubble(pieceEntity, message);
  };

  defineEnterSystem(
    world,
    // @ts-ignore
    [Has(ChatComponent), Has(PiecePosition)],
    (update) => {
      updateDisplayedChatMessages(update.entity);
    },
    { runOnInit: true }
  );

  defineUpdateSystem(
    world,
    // @ts-ignore
    [Has(ChatComponent)],
    (update) => {
      updateDisplayedChatMessages(update.entity);
    },
    { runOnInit: true }
  );

  return [];
};

export default createChatSystem;
