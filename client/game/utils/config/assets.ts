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
  const pieceStates = [PieceState.IDLE, PieceState.MOVE, PieceState.ATTACK];
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
  // // Main Pieces
  // [Assets.MainPawnSprite]: {
  //   type: AssetType.Image,
  //   key: Assets.MainPawnSprite,
  //   path: "assets/sprites/main/pawn.svg",
  // },
  // [Assets.MainPawnMoveSprite]: {
  //   type: AssetType.Image,
  //   key: Assets.MainPawnMoveSprite,
  //   path: "assets/sprites/main/move/pawn.svg",
  // },
  // [Assets.MainBishopSprite]: {
  //   type: AssetType.Image,
  //   key: Assets.MainBishopSprite,
  //   path: "assets/sprites/main/bishop.svg",
  // },
  // [Assets.MainKnightSprite]: {
  //   type: AssetType.Image,
  //   key: Assets.MainKnightSprite,
  //   path: "assets/sprites/main/knight.svg",
  // },
  // [Assets.MainRookSprite]: {
  //   type: AssetType.Image,
  //   key: Assets.MainRookSprite,
  //   path: "assets/sprites/main/rook.svg",
  // },
  // [Assets.MainQueenSprite]: {
  //   type: AssetType.Image,
  //   key: Assets.MainQueenSprite,
  //   path: "assets/sprites/main/queen.svg",
  // },
  // [Assets.MainKingSprite]: {
  //   type: AssetType.Image,
  //   key: Assets.MainKingSprite,
  //   path: "assets/sprites/main/king.svg",
  // },
  // // Enemy Pieces
  // [Assets.EnemyPawnSprite]: {
  //   type: AssetType.Image,
  //   key: Assets.EnemyPawnSprite,
  //   path: "assets/sprites/enemy/pawn.svg",
  // },
  // [Assets.EnemyBishopSprite]: {
  //   type: AssetType.Image,
  //   key: Assets.EnemyBishopSprite,
  //   path: "assets/sprites/enemy/bishop.svg",
  // },
  // [Assets.EnemyKnightSprite]: {
  //   type: AssetType.Image,
  //   key: Assets.MainKnightSprite,
  //   path: "assets/sprites/enemy/knight.svg",
  // },
  // [Assets.EnemyRookSprite]: {
  //   type: AssetType.Image,
  //   key: Assets.MainRookSprite,
  //   path: "assets/sprites/enemy/rook.svg",
  // },
  // [Assets.EnemyQueenSprite]: {
  //   type: AssetType.Image,
  //   key: Assets.MainQueenSprite,
  //   path: "assets/sprites/enemy/queen.svg",
  // },
  // [Assets.EnemyKingSprite]: {
  //   type: AssetType.Image,
  //   key: Assets.MainKingSprite,
  //   path: "assets/sprites/enemy/king.svg",
  // },
};

export default assets;
