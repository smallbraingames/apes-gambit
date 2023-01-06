import {
  EntityID,
  EntityIndex,
  World,
  getComponentValue,
  getEntityComponents,
} from "@latticexyz/recs";

import { EntityType } from "../types";
import { Network } from "../../network/types";

const getEntityType = (
  entityIndex: EntityIndex,
  network: Network,
  gameEntity: EntityID
): EntityType => {
  const componentIds = new Set(
    getEntityComponents(network.world, entityIndex).map(
      (component) => component.id
    )
  );
  if (componentIds.has(network.components.Game.id))
    return EntityType.GAME_CONFIG;
  else if (componentIds.has(network.components.PiecePosition.id)) {
    if (componentIds.has(network.components.InGame.id)) {
      const inGameEntity = getComponentValue(
        network.components.InGame,
        entityIndex
      );
      if (!inGameEntity) return EntityType.NON_BR_PIECE;
      if (
        inGameEntity.value.toString().toLowerCase() === gameEntity.toLowerCase()
      )
        return EntityType.BR_PIECE;
    } else {
      return EntityType.NON_BR_PIECE;
    }
  }
  throw Error("Unrecognized entity type");
};

export default getEntityType;
