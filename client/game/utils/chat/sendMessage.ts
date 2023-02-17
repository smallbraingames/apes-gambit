const sendMessage = async (
  message: string,
  pieceEntity: string,
  wallet: string
): Promise<void> => {
  const response = await fetch("/api/chat/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, pieceEntity, wallet }),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to send message: ${response.status} ${response.statusText}`
    );
  }
};

export default sendMessage;
