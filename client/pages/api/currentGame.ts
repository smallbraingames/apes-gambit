import type { NextApiRequest, NextApiResponse } from "next";

import { EntityID } from "@latticexyz/recs";

type CurrentGameResponse = {
  gameEntity: EntityID;
};

const handler = (
  req: NextApiRequest,
  res: NextApiResponse<CurrentGameResponse>
) => {
  const gameEntity = process.env.GAME_ENTITY as EntityID;
  res.status(200).json({ gameEntity });
};

export default handler;
