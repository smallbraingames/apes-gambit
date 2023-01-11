import { EntityIndex } from "@latticexyz/recs";
import { Game } from "../types";
import { Network } from "../../network/types";
import { PIECE_SPRITE_SCALE } from "../constants";
import getSpriteForPiece from "./getSpriteForPiece";

const setPieceSprite = (
  entity: EntityIndex,
  gameObject: Phaser.GameObjects.Sprite,
  game: Game,
  network: Network
) => {
  const spriteAssetKey =
    game.scenes.Main.config.sprites[getSpriteForPiece(entity, network)]
      .assetKey;
  gameObject.setScale(PIECE_SPRITE_SCALE, PIECE_SPRITE_SCALE);
  gameObject.setTexture(spriteAssetKey);
};

export default setPieceSprite;
