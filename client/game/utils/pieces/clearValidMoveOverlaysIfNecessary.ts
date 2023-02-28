import { PieceSpriteManager, ValidMoveTileOverlayManager } from "../../types";

import { EntityIndex } from "@latticexyz/recs";

const clearValidMoveOverlaysIfNecessary = (
  pieceSpriteManager: PieceSpriteManager,
  validMoveTileOverlayManager: ValidMoveTileOverlayManager,
  piece: EntityIndex
) => {
  if (pieceSpriteManager.isActivePiece(piece)) {
    validMoveTileOverlayManager.clearValidMoveOverlays();
  }
};
export default clearValidMoveOverlaysIfNecessary;
