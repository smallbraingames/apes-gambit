import { getComponentValue, setComponent } from "@latticexyz/recs";

import { Game } from "../types";
import { Network } from "../../network/types";
import { createChatMessageKey } from "../utils/chat/encodeChatMessage";
import { createClient } from "@supabase/supabase-js";
import { getEntityIndexFromEntity } from "../utils/resolveEntity";

const setupChatComponent = (network: Network, game: Game) => {
  const {
    components: { ChatComponent },
  } = game;

  const { world } = network;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  );

  // TODO: type this correctly
  const handleSubscription = (payload: any) => {
    if (payload.eventType === "INSERT" && payload.new) {
      const { sender_wallet, piece_entity, message, created_at } = payload.new;
      const key = createChatMessageKey({
        message,
        pieceEntity: piece_entity,
        wallet: sender_wallet,
        createdAt: new Date(created_at),
      });
      const pieceEntityIndex = getEntityIndexFromEntity(piece_entity, world);

      let previousMessages: string[] = [];
      const pieceChat = getComponentValue(ChatComponent, pieceEntityIndex);
      if (pieceChat) {
        previousMessages = [...pieceChat.value];
      }
      previousMessages.push(key);

      setComponent(ChatComponent, pieceEntityIndex, {
        value: previousMessages,
      });
    }
  };

  const subscription = supabase
    .channel("chat")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
      },
      handleSubscription
    )
    .subscribe();

  return [subscription];
};

export default setupChatComponent;
