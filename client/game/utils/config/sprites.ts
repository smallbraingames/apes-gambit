import { Asset, Assets, Sprite } from "@latticexyz/phaserx/src/types";

import { PieceState } from "../../types";
import { PieceType } from "../../../network/types";
import { getAssetKeyForPiece } from "./assets";

export const getSpriteKeyForPiece = (
  pieceType: PieceType,
  pieceState: PieceState,
  isEnemy: boolean
) => `sprite-${pieceType}-${pieceState}-${isEnemy}`;

const getPieceSprites = () => {
  const pieceTypes = [
    PieceType.PAWN,
    PieceType.KNIGHT,
    PieceType.BISHOP,
    PieceType.ROOK,
    PieceType.QUEEN,
    PieceType.KING,
  ];
  const pieceStates = [PieceState.IDLE, PieceState.MOVE];
  const isEnemies = [true, false];
  const sprites: { [key: string]: Sprite<Assets> } = {};
  pieceTypes.forEach((pieceType) => {
    pieceStates.forEach((pieceState) => {
      isEnemies.forEach((isEnemy) => {
        const key = getSpriteKeyForPiece(pieceType, pieceState, isEnemy);
        sprites[key] = {
          assetKey: getAssetKeyForPiece(pieceType, pieceState, isEnemy),
        };
      });
    });
  });
  return sprites;
};

const sprites = {
  ...getPieceSprites(),
};
export default sprites;
