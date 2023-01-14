import { PIECE_SPRITE_SCALE, RenderDepth } from "../constants";

import { EntityIndex } from "@latticexyz/recs";
import { Game } from "../types";
import { Network } from "../../network/types";
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
  gameObject.setDepth(RenderDepth.PIECE);
};

export default setPieceSprite;
