import { PIECE_SPRITE_SCALE, RenderDepth } from "../constants";

import { PieceState } from "../types";
import { PieceType } from "../../network/types";
import { getAssetKeyForPiece } from "./config/assets";

const setPieceSprite = async (
  gameObject: Phaser.GameObjects.Sprite,
  pieceType: PieceType,
  pieceState: PieceState,
  isEnemy: boolean
) => {
  gameObject.setOrigin(0, 0);
  const spriteAssetKey = getAssetKeyForPiece(pieceType, pieceState, isEnemy);
  gameObject.setScale(PIECE_SPRITE_SCALE, PIECE_SPRITE_SCALE);
  gameObject.setTexture(spriteAssetKey);
  gameObject.setDepth(RenderDepth.PIECE);
};

export default setPieceSprite;
