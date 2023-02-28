import {
  BananaManager,
  Game,
  PieceState,
  RechargeOverlayManager,
  Scene,
  SpeechBubbleManager,
  ValidMoveTileOverlayManager,
} from "../../types";
import { EntityIndex, getComponentValueStrict } from "@latticexyz/recs";
import { Network, PieceType } from "../../../network/types";
import { PIECE_SPRITE_ID, TILE_HEIGHT, TILE_WIDTH } from "../../constants";
import {
  removeAllTweens,
  tileCoordToPixelCoord,
  tween,
} from "@latticexyz/phaserx";

import { Coord } from "@latticexyz/utils";
import createPieceSpriteManager from "./createPieceSpriteManager";
import { getMoveAnimationDuration } from "./pieceMoveAnimation";

const createBRPieceSpriteManager = (
  network: Network,
  game: Game,
  scene: Scene,
  validMoveTileOverlayManager: ValidMoveTileOverlayManager,
  rechargeOverlayManager: RechargeOverlayManager,
  bananaManager: BananaManager,
  speechBubbleManager: SpeechBubbleManager
) => {
  const { scene: phaserScene } = scene;
  const { godEntityIndex } = network;
  const {
    components: { BRRechargeTimerComponent },
  } = game;

  const pieceSpriteManager = createPieceSpriteManager(
    network,
    game,
    scene,
    `BR:${PIECE_SPRITE_ID}`
  );

  const createPiece = (piece: EntityIndex, tileCoord: Coord) => {
    // TODO: PIECE APPEAR ANIMATION
    pieceSpriteManager.createSprite(piece, tileCoord);
    validMoveTileOverlayManager.setValidMoveOverlays();
    loopPieceIdleAnimation(piece);
  };

  const animateMoveTo = async (piece: EntityIndex, tileCoord: Coord) => {
    clearValidMoveOverlaysIfNecessary(piece);

    const sprite = pieceSpriteManager.getSprite(piece);

    removeAllTweens(sprite);
    await playPieceMoveAnimation(piece, tileCoord);

    runRechargeAnimationIfNecessary(piece);
    loopPieceIdleAnimation(piece);
  };

  const animateBananaPickUp = async (piece: EntityIndex, tileCoord: Coord) => {
    await animateMoveTo(piece, tileCoord);
    await pickUpBanana(tileCoord);
  };

  const animateRemovePiece = async (piece: EntityIndex) => {
    pieceSpriteManager.removeSprite(piece);
    validMoveTileOverlayManager.clearValidMoveOverlays();
  };

  const animateSwitchType = async (
    piece: EntityIndex,
    pieceType: PieceType
  ) => {
    pieceSpriteManager.switchType(piece, pieceType);
  };

  const animateTake = (taker: EntityIndex, taken: EntityIndex) => {};

  const animateSpeechBubble = (piece: EntityIndex, message: string) => {
    const sprite = pieceSpriteManager.getSprite(piece);
    speechBubbleManager.displayChatBubbleForPieceSprite(sprite, message);
  };

  /// ======= Internal =======

  const pickUpBanana = (tileCoord: Coord) => {
    bananaManager.removeBananaAtPosition(tileCoord);
  };

  const clearValidMoveOverlaysIfNecessary = (piece: EntityIndex) => {
    if (pieceSpriteManager.isActivePiece(piece)) {
      validMoveTileOverlayManager.clearValidMoveOverlays();
    }
  };

  const runRechargeAnimationIfNecessary = async (piece: EntityIndex) => {
    if (pieceSpriteManager.isActivePiece(piece)) {
      const time = getComponentValueStrict(
        BRRechargeTimerComponent,
        godEntityIndex
      ).value;
      await rechargeOverlayManager.animateRechargeOverlay(time);
      validMoveTileOverlayManager.setValidMoveOverlays();
    }
  };

  const playPieceMoveAnimation = async (
    entityIndex: EntityIndex,
    tileCoord: Coord
  ) => {
    // Don't emit trails for now
    // const particles = scene.add.particles(Assets.ChessTileset, undefined, {
    //   speed: { min: 20, max: 100 },
    //   angle: { min: 0, max: 360 },
    //   scale: { start: 1, end: 0 },
    //   alpha: { start: 0, end: 0.1 },
    //   lifespan: 2000,
    // });

    // const emitter = particles.emitters.first;
    // emitter.startFollow(gameObject);

    const sprite = pieceSpriteManager.getSprite(entityIndex);
    const position = tileCoordToPixelCoord(tileCoord, TILE_WIDTH, TILE_HEIGHT);
    pieceSpriteManager.switchState(entityIndex, PieceState.MOVE);
    const animationDuration = getMoveAnimationDuration(
      { x: sprite.x, y: sprite.y },
      position
    );
    await Promise.all([
      tween(
        {
          targets: sprite,
          duration: animationDuration / 2,
          props: {
            angle: 40,
          },
          ease: Phaser.Math.Easing.Sine.InOut,
          yoyo: true,
        },
        { keepExistingTweens: true }
      ),
      tween(
        {
          targets: sprite,
          duration: animationDuration,
          props: { x: position.x, y: position.y },
          ease: Phaser.Math.Easing.Sine.InOut,
        },
        { keepExistingTweens: true }
      ),
    ]);
    pieceSpriteManager.switchState(entityIndex, PieceState.IDLE);
    pieceSpriteManager.moveTo(entityIndex, tileCoord);
    // emitter.stopFollow();
    // emitter.stop();
  };

  const loopPieceIdleAnimation = (piece: EntityIndex) => {
    const sprite = pieceSpriteManager.getSprite(piece);
    tween(
      {
        targets: sprite,
        duration: 300,
        props: { x: sprite.x, y: sprite.y - 150 },
        yoyo: true,
        ease: Phaser.Math.Easing.Sine.Out,
        repeat: -1,
      },
      { keepExistingTweens: false }
    );
  };

  return {
    createPiece,
    animateBananaPickUp,
    animateMoveTo,
    animateTake,
    animateRemovePiece,
    animateSwitchType,
    animateSpeechBubble,
  };
};

export default createBRPieceSpriteManager;
