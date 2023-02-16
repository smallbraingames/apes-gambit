type ChatMessage = {
  message: string;
  pieceEntity: string;
  wallet: string;
  createdAt: Date;
};

export const createChatMessageKey = (message: ChatMessage): string => {
  const delimiter = "|";
  const createdAtEpoch = message.createdAt.getTime();
  return [
    message.message,
    message.pieceEntity,
    message.wallet,
    createdAtEpoch,
  ].join(delimiter);
};

export const parseChatMessageFromKey = (key: string): ChatMessage => {
  const delimiter = "|";
  const [message, pieceEntity, wallet, createdAtEpochStr] =
    key.split(delimiter);
  const createdAt = new Date(parseInt(createdAtEpochStr));
  return { message, pieceEntity, wallet, createdAt };
};
