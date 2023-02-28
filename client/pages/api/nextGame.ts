import type { NextApiRequest, NextApiResponse } from "next";

import { EntityID } from "@latticexyz/recs";
import { createClient } from "@supabase/supabase-js";

export type CurrentGameResponse = {
  gameEntity: EntityID;
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_ADMIN_KEY as string
);

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<CurrentGameResponse>
) => {
  const now = new Date();

  const { data: games, error } = await supabase.from("games").select("*");

  if (error) {
    console.error(error);
    return;
  }

  let game;
  if (games && games.length > 0) {
    // FOR TESTING PURPOSES, just take the element with the latest start time
    games.sort(
      (a, b) =>
        new Date(b.start_time).getTime() - new Date(a.start_time).getTime()
    );
    game = games[0];
    // let closestGame = null;
    // let closestDiff = Infinity;
    // for (let i = 0; i < games.length; i++) {
    //   const startTime = new Date(games[i].start_time).getTime();
    //   if (startTime > now.getTime()) {
    //     const diff = startTime - now.getTime();
    //     if (diff < closestDiff) {
    //       closestGame = games[i];
    //       closestDiff = diff;
    //     }
    //   }
    // }
    // game = closestGame;
  } else {
    console.error("No games found.");
  }
  const gameEntity = game.game_entity as EntityID;
  res.status(200).json({ gameEntity });
};

export default handler;
