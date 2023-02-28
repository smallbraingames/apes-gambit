// Manager for basic Piece sprite spawning, movement, and piece type switching
// This is meant to be used internally by other piece sprite managers that add animation

import {
  EntityIndex,
  getComponentValue,
  getComponentValueStrict,
} from "@latticexyz/recs";
import { Game, PieceState, Scene } from "../../types";
import { Network, PieceType } from "../../../network/types";
import { PIECE_SPRITE_SCALE, TILE_HEIGHT, TILE_WIDTH } from "../../constants";
import {
  pixelCoordToTileCoord,
  tileCoordToPixelCoord,
} from "@latticexyz/phaserx";

import { Coord } from "@latticexyz/utils";
import { getAssetKeyForPiece } from "../config/assets";
import setDepthFromCoord from "../setDepthFromCoord";

const createPieceSpriteManager = (
  network: Network,
  game: Game,
  scene: Scene,
  id: string
) => {
  const {
    godEntityIndex,
    components: { PieceType: PieceTypeComponent },
  } = network;
  const {
    scene: phaserScene,
    objectRegistry: { gameObjectRegistry: registry },
  } = scene;

  const {
    components: { ActivePiece },
  } = game;

  const moveTo = (entityIndex: EntityIndex, tileCoord: Coord) => {
    const sprite = getSprite(entityIndex);
    const position = tileCoordToPixelCoord(tileCoord, TILE_WIDTH, TILE_HEIGHT);
    sprite.setPosition(position.x, position.y);
  };

  const switchType = (entityIndex: EntityIndex, pieceType: PieceType) => {
    setPieceSpriteTexture(entityIndex, pieceType, PieceState.IDLE);
  };

  const switchState = (entityIndex: EntityIndex, pieceState: PieceState) => {
    setPieceSpriteTexture(
      entityIndex,
      getSpritePieceType(entityIndex),
      pieceState
    );
  };

  const getTilePosition = (entityIndex: EntityIndex) => {
    const sprite = getSprite(entityIndex);
    return pixelCoordToTileCoord(
      { x: sprite.x, y: sprite.y },
      TILE_WIDTH,
      TILE_HEIGHT
    );
  };

  const createSprite = (entityIndex: EntityIndex, tileCoord: Coord) => {
    const { x, y } = tileCoordToPixelCoord(tileCoord, TILE_WIDTH, TILE_HEIGHT);
    const sprite = phaserScene.physics.add.sprite(
      x,
      y,
      getAssetKeyForPiece(PieceType.PAWN, PieceState.IDLE, false)
    );
    registry.set(entityIndex, id, sprite);
    setPieceSpriteTexture(
      entityIndex,
      getSpritePieceType(entityIndex),
      PieceState.IDLE
    );
    sprite.setScale(PIECE_SPRITE_SCALE, PIECE_SPRITE_SCALE);
    setDepthFromCoord(sprite);
  };

  const getSpritePieceType = (entityIndex: EntityIndex) => {
    return getComponentValueStrict(PieceTypeComponent, entityIndex)
      .value as PieceType;
  };

  const getSprite = (entityIndex: EntityIndex) => {
    return registry.get(
      entityIndex,
      id
    ) as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  };

  const hasSprite = (entityIndex: EntityIndex) => {
    return registry.has(entityIndex, id);
  };

  const removeSprite = (entityIndex: EntityIndex) => {
    const sprite = getSprite(entityIndex);
    sprite.destroy();
    registry.remove(entityIndex, id);
  };

  const isActivePiece = (entityIndex: EntityIndex) => {
    const activePiece = getComponentValue(ActivePiece, godEntityIndex)?.value;
    return activePiece === entityIndex;
  };

  /// ======== INTERNAL =======

  const setPieceSpriteTexture = async (
    entityIndex: EntityIndex,
    pieceType: PieceType,
    pieceState: PieceState
  ) => {
    const sprite = getSprite(entityIndex);
    sprite.setOrigin(0, 0);
    const spriteAssetKey = getAssetKeyForPiece(
      pieceType,
      pieceState,
      isActivePiece(entityIndex)
    );
    sprite.setScale(PIECE_SPRITE_SCALE, PIECE_SPRITE_SCALE);
    sprite.setTexture(spriteAssetKey);
    setDepthFromCoord(sprite);
  };

  return {
    createSprite,
    getSprite,
    hasSprite,
    getTilePosition,
    moveTo,
    switchType,
    isActivePiece,
    getSpritePieceType,
    removeSprite,
    switchState,
  };
};

export default createPieceSpriteManager;
