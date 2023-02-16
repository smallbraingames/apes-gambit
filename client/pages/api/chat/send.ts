import { NextApiHandler } from "next";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_ADMIN_KEY as string
);

const schema = z.object({
  wallet: z.string(),
  pieceEntity: z.string(),
  message: z.string(),
});

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  try {
    const data = schema.parse(req.body);
    const { wallet, pieceEntity, message } = data;

    // Insert the message into the Supabase table
    const { error } = await supabase
      .from("messages")
      .insert({ sender_wallet: wallet, piece_entity: pieceEntity, message });
    if (error) {
      throw new Error(error.message);
    }

    res.status(200).send({});
  } catch (error) {
    res.status(400).json({ message: "Invalid request body", error });
  }
};

export default handler;
