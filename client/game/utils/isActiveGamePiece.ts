import { EntityID, EntityIndex } from "@latticexyz/recs";
import { EntityType, Game } from "../types";

import { Network } from "../../network/types";
import getEntityType from "./getEntityType";
import isPieceAlive from "./isPieceAlive";

const isActiveGamePiece = (
  entityIndex: EntityIndex,
  network: Network,
  gameEntity: EntityID
): boolean => {
  const entityType = getEntityType(entityIndex, network, gameEntity);
  if (entityType !== EntityType.BR_PIECE) {
    console.warn(
      `Invalid active game piece with type EntityType, EntityIndex: ${entityType}, ${entityIndex}`
    );
    return false;
  }
  if (!isPieceAlive(entityIndex, network)) {
    console.warn(`Invalid active game piece with entityIndex: ${entityIndex}`);
    return false;
  }
  return true;
};

export default isActiveGamePiece;
