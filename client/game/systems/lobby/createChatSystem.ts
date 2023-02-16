import { Game, Lobby } from "../../types";

import { Network } from "../../../network/types";
import { PIECE_SPRITE_ID } from "../../constants";
import { Subscription } from "rxjs";
import { defineComponentSystemUnsubscribable } from "../../utils/defineComponentSystemUnsubscribable";
import getPieceSpriteGameObject from "../../utils/getPieceSpriteGameObject";

const createChatSystem = (
  network: Network,
  game: Game,
  lobby: Lobby
): Subscription[] => {
  const { world } = network;

  const {
    scenes: {
      Lobby: { scene, objectRegistry },
    },
    components: { ChatComponent },
  } = game;

  const subscription = defineComponentSystemUnsubscribable(
    world,
    ChatComponent,
    (update) => {
      const chat = update.value[0];
      if (!chat || chat.value.length === 0) {
        console.warn("Received chat component update with no message", update);
        return;
      }
      const hasPieceSprite = objectRegistry.gameObjectRegistry.has(
        update.entity,
        PIECE_SPRITE_ID
      );
      if (!hasPieceSprite) {
        console.warn("Recieved chat message for nonexistent sprite", update);
        return;
      }
      const sprite = getPieceSpriteGameObject(
        update.entity,
        objectRegistry,
        scene
      );
      lobby.speechBubbleManager.displayChatBubbleForPieceSprite(
        sprite,
        chat.value[chat.value.length - 1]
      );
    },
    { runOnInit: true }
  );

  return [subscription];
};

export default createChatSystem;
