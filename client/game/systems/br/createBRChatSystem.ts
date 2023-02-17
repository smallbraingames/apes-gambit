import { BR, Game, Lobby } from "../../types";
import {
  EntityIndex,
  Has,
  HasValue,
  defineEnterSystem,
  defineUpdateSystem,
  getComponentValueStrict,
} from "@latticexyz/recs";

import { Network } from "../../../network/types";
import { PIECE_SPRITE_ID } from "../../constants";
import { Subscription } from "rxjs";
import getPieceSpriteGameObject from "../../utils/getPieceSpriteGameObject";
import { parseChatMessageFromKey } from "../../utils/chat/encodeChatMessage";

const createBRChatSystem = (
  network: Network,
  game: Game,
  br: BR
): Subscription[] => {
  const {
    world,
    components: { BRInGame },
  } = network;

  const {
    scenes: {
      BR: { scene, objectRegistry },
    },
    components: { ChatComponent },
  } = game;

  const updateDisplayedChatMessages = (pieceEntity: EntityIndex) => {
    const chat = getComponentValueStrict(ChatComponent, pieceEntity);
    if (chat.value.length === 0) {
      console.warn(
        "Received chat component update with no message",
        pieceEntity
      );
      return;
    }
    const hasPieceSprite = objectRegistry.gameObjectRegistry.has(
      pieceEntity,
      PIECE_SPRITE_ID
    );
    if (!hasPieceSprite) {
      console.warn("Recieved chat message for nonexistent sprite", pieceEntity);
      return;
    }
    const sprite = getPieceSpriteGameObject(pieceEntity, objectRegistry, scene);
    br!.speechBubbleManager.displayChatBubbleForPieceSprite(
      sprite,
      parseChatMessageFromKey(chat.value[chat.value.length - 1]).message
    );
  };

  defineEnterSystem(
    world,
    // @ts-ignore
    [Has(ChatComponent), HasValue(BRInGame, { value: game.gameEntity! })],
    (update) => {
      updateDisplayedChatMessages(update.entity);
    },
    { runOnInit: true }
  );

  defineUpdateSystem(
    world,
    // @ts-ignore
    [Has(ChatComponent), HasValue(BRInGame, { value: game.gameEntity! })],
    (update) => {
      updateDisplayedChatMessages(update.entity);
    },
    { runOnInit: true }
  );

  return [];
};

export default createBRChatSystem;
