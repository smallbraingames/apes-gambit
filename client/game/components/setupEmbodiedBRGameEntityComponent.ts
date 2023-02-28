import {
  EntityID,
  EntityIndex,
  getComponentValue,
  getComponentValueStrict,
  setComponent,
} from "@latticexyz/recs";

import { CurrentGameResponse } from "../../pages/api/nextGame";
import { Game } from "../types";
import { Network } from "../../network/types";

const setupEmbodiedBRGameEntityComponent = async (
  network: Network,
  game: Game
) => {
  const {
    components: { EmbodiedBRGameEntity, ActivePiece },
  } = game;
  const {
    godEntityIndex,
    components: { BRInGame },
  } = network;

  const activePiece = getComponentValueStrict(ActivePiece, godEntityIndex)
    .value as EntityIndex;

  // @ts-ignore
  const gameEntity = getComponentValue(BRInGame, activePiece)
    ?.value as EntityID;

  // If in game, set game we are in
  if (gameEntity) {
    setComponent(EmbodiedBRGameEntity, godEntityIndex, {
      value: gameEntity as string,
    });
    return;
  }

  // If no game entity, get next game
  const response = await fetch("/api/nextGame");
  const data: CurrentGameResponse = await response.json();
  setComponent(EmbodiedBRGameEntity, godEntityIndex, {
    value: data.gameEntity as string,
  });

  return [];
};

export default setupEmbodiedBRGameEntityComponent;
