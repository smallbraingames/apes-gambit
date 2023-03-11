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

    if (!pieceSpriteManager.isActivePiece(piece)) {
      validMoveTileOverlayManager.setValidMoveOverlays();
    }
  };

  const animateBananaPickUp = async (piece: EntityIndex, tileCoord: Coord) => {
    await animateMoveTo(piece, tileCoord);
    if (pieceSpriteManager.isActivePiece(piece)) {
      await pickUpBanana(piece, tileCoord);
    } else {
      bananaManager.removeBananaAtPosition(tileCoord);
    }
  };

  const animateRemovePiece = async (piece: EntityIndex) => {
    const { camera } = scene;
    const x = camera.phaserCamera.worldView.right;
    const y = camera.phaserCamera.worldView.top;
    const taken = pieceSpriteManager.getSprite(piece);
    removeAllTweens(taken);
    await tween(
      {
        // @ts-ignore
        targets: taken,
        duration: 700,
        props: { x, y, angle: 180 },
        ease: Phaser.Math.Easing.Sine.InOut,
      },
      { keepExistingTweens: false }
    );
    pieceSpriteManager.removeSprite(piece);
    if (pieceSpriteManager.isActivePiece(piece)) {
      validMoveTileOverlayManager.clearValidMoveOverlays();
    }
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
    const takerSprite = pieceSpriteManager.getSprite(taker);
    const takenSprite = pieceSpriteManager.getSprite(taken);
    takenSprite.setDepth(takerSprite.depth - 1);
    const { camera } = scene;
    camera.phaserCamera.shake(300, 0.3);
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
