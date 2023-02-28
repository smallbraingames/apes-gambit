import { BR, Game } from "../../types";
import {
  EntityIndex,
  Has,
  defineEnterSystem,
  defineUpdateSystem,
  getComponentValueStrict,
} from "@latticexyz/recs";

import { Network } from "../../../network/types";
import { Subscription } from "rxjs";
import { parseChatMessageFromKey } from "../../utils/chat/encodeChatMessage";

const createBRChatSystem = (
  network: Network,
  game: Game,
  br: BR
): Subscription[] => {
  const { world } = network;

  const {
    components: { ChatComponent },
  } = game;

  const { IN_GAME_CONSTRAINTS, pieceSpriteManager } = br!;

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
    [...IN_GAME_CONSTRAINTS, Has(ChatComponent)],
    (update) => {
      updateDisplayedChatMessages(update.entity);
    },
    { runOnInit: true }
  );

  defineUpdateSystem(
    world,
    // @ts-ignore
    [...IN_GAME_CONSTRAINTS, Has(ChatComponent)],
    (update) => {
      updateDisplayedChatMessages(update.entity);
    },
    { runOnInit: true }
  );

  return [];
};

export default createBRChatSystem;
