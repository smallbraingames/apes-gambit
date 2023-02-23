import {
  EntityID,
  EntityIndex,
  Has,
  defineEnterSystem,
  defineExitSystem,
  defineUpdateSystem,
  getComponentValueStrict,
  setComponent,
} from "@latticexyz/recs";

import { Game } from "../types";
import { Network } from "../../network/types";
import { Scenes } from "../constants";

const setupActiveSceneComponent = (network: Network, game: Game) => {
  const {
    components: { ActivePiece, EmbodiedBRGameEntity, ActiveScene },
  } = game;
  const {
    world,
    godEntityIndex,
    components: { BRInGame },
  } = network;

  defineEnterSystem(world, [Has(BRInGame)], (update) => {
    const activePiece = getComponentValueStrict(ActivePiece, godEntityIndex)
      .value as EntityIndex;
    const gameEntity = getComponentValueStrict(
      EmbodiedBRGameEntity,
      godEntityIndex
    ).value as EntityID;
    if (
      update.entity === activePiece &&
      update.value[0]?.value === gameEntity
    ) {
      setComponent(ActiveScene, godEntityIndex, { value: Scenes.BR });
    }
  });

  defineExitSystem(world, [Has(BRInGame)], (update) => {
    const activePiece = getComponentValueStrict(ActivePiece, godEntityIndex)
      .value as EntityIndex;
    if (update.entity === activePiece) {
      setComponent(ActiveScene, godEntityIndex, { value: Scenes.Lobby });
    }
  });
};

export default setupActiveSceneComponent;
