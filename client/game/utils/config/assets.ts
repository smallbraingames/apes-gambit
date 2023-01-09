import { AssetType } from "@latticexyz/phaserx";
import { Assets } from "../../constants";

const assets = {
  [Assets.ChessTileset]: {
    type: AssetType.Image,
    key: Assets.ChessTileset,
    path: "assets/tilesets/chess-basic-tileset.png",
  },
  [Assets.MainPawnSprite]: {
    type: AssetType.Image,
    key: Assets.MainPawnSprite,
    path: "assets/sprites/main/pawn.png",
  },
  [Assets.MainBishopSprite]: {
    type: AssetType.Image,
    key: Assets.MainBishopSprite,
    path: "assets/sprites/main/bishop.png",
  },
  [Assets.MainKnightSprite]: {
    type: AssetType.Image,
    key: Assets.MainKnightSprite,
    path: "assets/sprites/main/knight.png",
  },
  [Assets.MainRookSprite]: {
    type: AssetType.Image,
    key: Assets.MainRookSprite,
    path: "assets/sprites/main/rook.png",
  },
  [Assets.MainQueenSprite]: {
    type: AssetType.Image,
    key: Assets.MainQueenSprite,
    path: "assets/sprites/main/queen.png",
  },
  [Assets.MainKingSprite]: {
    type: AssetType.Image,
    key: Assets.MainKingSprite,
    path: "assets/sprites/main/king.png",
  },
};

export default assets;
