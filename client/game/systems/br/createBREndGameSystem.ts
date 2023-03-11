import { BR, Game } from "../../types";

import { Network } from "../../../network/types";
import { Subscription } from "rxjs";

const createBREndGameSystem = (
  network: Network,
  game: Game,
  br: BR
): Subscription[] => {
  const { world } = network;

  return [];
};

export default createBREndGameSystem;
