import { KeyboardEvent, useContext, useState } from "react";

import { GameContext } from "../../context/GameContext";
import { NetworkContext } from "../../context/NetworkContext";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { getEntityFromEntityIndex } from "../../game/utils/resolveEntity";
import getNetworkWallet from "../../network/wallet/getNetworkWallet";
import sendMessage from "../../game/utils/chat/sendMessage";

const ChatInput = () => {
  const { activePiece } = useContext(GameContext);
  const { network } = useContext(NetworkContext);
  const [message, setMessage] = useState("");

  const handleSendMessage = async () => {
    if (message.trim() !== "" && activePiece !== undefined && network) {
      await sendMessage(
        message,
        getEntityFromEntityIndex(activePiece, network.world),
        getNetworkWallet(network).address
      );
      setMessage("");
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="flex justify-end items-center space-x-2">
      <input
        className="rounded-lg bg-yellow-50 text-yellow-900 bg-gray-100 px-4 py-2  focus:outline-none"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Chat"
      />
      <div className="flex-shrink-0">
        <button type="button" onClick={handleSendMessage} className="p-2">
          <PaperAirplaneIcon className="w-8 h-8 text-yellow-900" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
