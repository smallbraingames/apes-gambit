import { EntityIndex } from "@latticexyz/recs";
import { ObjectRegistry } from "../../phaser/types";
import { PIECE_SPRITE_ID } from "../constants";
import { PieceState } from "../types";
import { PieceType } from "../../network/types";
import { getAssetKeyForPiece } from "./config/assets";

const getPieceSpriteGameObject = (
  entityIndex: EntityIndex,
  objectRegistry: ObjectRegistry,
  scene: Phaser.Scene
) => {
  if (!objectRegistry.has(entityIndex, PIECE_SPRITE_ID)) {
    // Create dummy sprite
    const sprite = scene.physics.add.sprite(
      0,
      0,
      getAssetKeyForPiece(PieceType.PAWN, PieceState.IDLE, false)
    );
    objectRegistry.set(entityIndex, PIECE_SPRITE_ID, sprite);
    return sprite;
  }
  return objectRegistry.get(
    entityIndex,
    PIECE_SPRITE_ID
  ) as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
};

export default getPieceSpriteGameObject;
