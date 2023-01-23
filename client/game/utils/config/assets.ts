import { Asset, AssetType } from "@latticexyz/phaserx";

import { Assets } from "../../constants";
import { PieceState } from "../../types";
import { PieceType } from "../../../network/types";
import getPieceInfo from "../../../utils/getPieceInfo";

// These are the assets, how do I organie them anyways lol
// I can like put them in groups based on

export const getAssetKeyForPiece = (
  pieceType: PieceType,
  pieceState: PieceState,
  isEnemy: boolean
) => `asset-${pieceType}-${pieceState}-${isEnemy}`;

export const getAssetPathForPiece = (
  pieceType: PieceType,
  pieceState: PieceState,
  isEnemy: boolean
) => {
  const folder = isEnemy ? "enemy" : "main";
  const pieceName = getPieceInfo(pieceType).name;
  return `assets/sprites/${folder}/${pieceState}/${pieceName}.svg`.toLowerCase();
};

const getPieceAssets = (): { [key: string]: Asset } => {
  const pieceTypes = [
    PieceType.PAWN,
    PieceType.KNIGHT,
    PieceType.BISHOP,
    PieceType.ROOK,
    PieceType.QUEEN,
    PieceType.KING,
  ];
  const pieceStates = [
    PieceState.IDLE,
    PieceState.MOVE,
    PieceState.ATTACK,
    PieceState.DEAD,
  ];
  const isEnemies = [true, false];
  const assets: { [key: string]: Asset } = {};
  pieceTypes.forEach((pieceType) => {
    pieceStates.forEach((pieceState) => {
      isEnemies.forEach((isEnemy) => {
        const key = getAssetKeyForPiece(pieceType, pieceState, isEnemy);
        assets[key] = {
          type: AssetType.Image,
          key,
          path: getAssetPathForPiece(pieceType, pieceState, isEnemy),
        };
      });
    });
  });
  return assets;
};

const assets: { [key: string]: Asset } = {
  [Assets.ChessTileset]: {
    type: AssetType.Image,
    key: Assets.ChessTileset,
    path: "assets/tilesets/chess-textured-tileset.png",
  },
  [Assets.Shadow]: {
    type: AssetType.Image,
    key: Assets.Shadow,
    path: "assets/sprites/shadow.png",
  },
  ...getPieceAssets(),
};

export default assets;
