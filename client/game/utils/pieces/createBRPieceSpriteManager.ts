import {
  BananaManager,
  Game,
  RechargeOverlayManager,
  Scene,
  SpeechBubbleManager,
  ValidMoveTileOverlayManager,
} from "../../types";
import { EntityIndex, getComponentValueStrict } from "@latticexyz/recs";
import { Network, PieceType } from "../../../network/types";
import { removeAllTweens, tween } from "@latticexyz/phaserx";

import { Coord } from "@latticexyz/utils";
import { PIECE_SPRITE_ID } from "../../constants";
import clearValidMoveOverlaysIfNecessary from "./clearValidMoveOverlaysIfNecessary";
import createPieceSpriteManager from "./createPieceSpriteManager";
import loopPieceIdleAnimation from "./loopPieceIdleAnimation";
import { playPieceMoveAnimation } from "./pieceMoveAnimation";

const LOOP_IDLE_HEIGHT = 130;
const LOOP_IDLE_DURATION = 300;

const createBRPieceSpriteManager = (
  network: Network,
  game: Game,
  scene: Scene,
  validMoveTileOverlayManager: ValidMoveTileOverlayManager,
  rechargeOverlayManager: RechargeOverlayManager,
  bananaManager: BananaManager,
  speechBubbleManager: SpeechBubbleManager
) => {
  const {
    godEntityIndex,
    components: { PiecePosition },
  } = network;
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
    loopPieceIdleAnimation(
      pieceSpriteManager,
      piece,
      LOOP_IDLE_HEIGHT,
      LOOP_IDLE_DURATION
    );
  };

  const animateMoveTo = async (piece: EntityIndex, tileCoord: Coord) => {
    clearValidMoveOverlaysIfNecessary(
      pieceSpriteManager,
      validMoveTileOverlayManager,
      piece
    );

    const sprite = pieceSpriteManager.getSprite(piece);

    removeAllTweens(sprite);
    await playPieceMoveAnimation(pieceSpriteManager, piece, tileCoord, scene);

    runRechargeAnimationIfNecessary(piece);
    loopPieceIdleAnimation(
      pieceSpriteManager,
      piece,
      LOOP_IDLE_HEIGHT,
      LOOP_IDLE_DURATION
    );
  };

  const animateBananaPickUp = async (piece: EntityIndex, tileCoord: Coord) => {
    await animateMoveTo(piece, tileCoord);
    await pickUpBanana(piece, tileCoord);
  };

  const animateRemovePiece = async (piece: EntityIndex) => {
    pieceSpriteManager.removeSprite(piece);
    validMoveTileOverlayManager.clearValidMoveOverlays();
  };

  const animateSwitchType = async (
    piece: EntityIndex,
    pieceType: PieceType
  ) => {
    validMoveTileOverlayManager.clearValidMoveOverlays();
    pieceSpriteManager.switchType(piece, pieceType);
    validMoveTileOverlayManager.setValidMoveOverlays();
  };

  const animateTake = async (taker: EntityIndex, taken: EntityIndex) => {
    await animateMoveTo(taker, getPiecePosition(taken));
    await animateRemovePiece(taken);
  };

  const animateSpeechBubble = (piece: EntityIndex, message: string) => {
    const sprite = pieceSpriteManager.getSprite(piece);
    speechBubbleManager.displayChatBubbleForPieceSprite(sprite, message);
  };

  /// ======= Internal =======

  const pickUpBanana = async (piece: EntityIndex, tileCoord: Coord) => {
    bananaManager.animateRemoveBanana(
      bananaManager.getBananaEntityAtPosition(tileCoord)!
    );
    const sprite = pieceSpriteManager.getSprite(piece);
    removeAllTweens(sprite);
    await tween(
      {
        targets: sprite,
        duration: 200,
        props: { x: sprite.x, y: sprite.y - 400 },
        yoyo: true,
        ease: Phaser.Math.Easing.Sine.InOut,
      },
      { keepExistingTweens: true }
    );
    loopPieceIdleAnimation(
      pieceSpriteManager,
      piece,
      LOOP_IDLE_HEIGHT,
      LOOP_IDLE_DURATION
    );
    bananaManager.removeBananaAtPosition(tileCoord);
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

  const getPiecePosition = (piece: EntityIndex) => {
    return getComponentValueStrict(PiecePosition, piece);
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
