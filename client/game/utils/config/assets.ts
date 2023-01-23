import { AssetType } from "@latticexyz/phaserx";
import { Assets } from "../../constants";

const assets = {
  [Assets.ChessTileset]: {
    type: AssetType.Image,
    key: Assets.ChessTileset,
    path: "assets/tilesets/chess-textured-tileset.png",
  },
  // Main Pieces
  [Assets.MainPawnSprite]: {
    type: AssetType.Image,
    key: Assets.MainPawnSprite,
    path: "assets/sprites/main/pawn.svg",
  },
  [Assets.MainBishopSprite]: {
    type: AssetType.Image,
    key: Assets.MainBishopSprite,
    path: "assets/sprites/main/bishop.svg",
  },
  [Assets.MainKnightSprite]: {
    type: AssetType.Image,
    key: Assets.MainKnightSprite,
    path: "assets/sprites/main/knight.svg",
  },
  [Assets.MainRookSprite]: {
    type: AssetType.Image,
    key: Assets.MainRookSprite,
    path: "assets/sprites/main/rook.svg",
  },
  [Assets.MainQueenSprite]: {
    type: AssetType.Image,
    key: Assets.MainQueenSprite,
    path: "assets/sprites/main/queen.svg",
  },
  [Assets.MainKingSprite]: {
    type: AssetType.Image,
    key: Assets.MainKingSprite,
    path: "assets/sprites/main/king.svg",
  },
  // Enemy Pieces
  [Assets.EnemyPawnSprite]: {
    type: AssetType.Image,
    key: Assets.EnemyPawnSprite,
    path: "assets/sprites/enemy/pawn.svg",
  },
  [Assets.EnemyBishopSprite]: {
    type: AssetType.Image,
    key: Assets.EnemyBishopSprite,
    path: "assets/sprites/enemy/bishop.svg",
  },
  [Assets.EnemyKnightSprite]: {
    type: AssetType.Image,
    key: Assets.MainKnightSprite,
    path: "assets/sprites/enemy/knight.svg",
  },
  [Assets.EnemyRookSprite]: {
    type: AssetType.Image,
    key: Assets.MainRookSprite,
    path: "assets/sprites/enemy/rook.svg",
  },
  [Assets.EnemyQueenSprite]: {
    type: AssetType.Image,
    key: Assets.MainQueenSprite,
    path: "assets/sprites/enemy/queen.svg",
  },
  [Assets.EnemyKingSprite]: {
    type: AssetType.Image,
    key: Assets.MainKingSprite,
    path: "assets/sprites/enemy/king.svg",
  },
};

export default assets;
