import { CurrentGameResponse } from "../../pages/api/currentGame";
import { Game } from "../types";
import { Network } from "../../network/types";
import { getEntityIndexFromEntity } from "../utils/resolveEntity";
import { setComponent } from "@latticexyz/recs";

const setupEmbodiedBRGameEntityComponent = async (
  network: Network,
  game: Game
) => {
  const {
    components: { EmbodiedBRGameEntity },
  } = game;
  const { godEntityIndex } = network;

  const response = await fetch("/api/currentGame");
  const data: CurrentGameResponse = await response.json();

  setComponent(EmbodiedBRGameEntity, godEntityIndex, {
    value: data.gameEntity as string,
  });
  return [];
};

export default setupEmbodiedBRGameEntityComponent;
