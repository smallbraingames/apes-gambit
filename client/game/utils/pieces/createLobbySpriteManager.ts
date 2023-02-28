import {
  Game,
  Scene,
  SpeechBubbleManager,
  ValidMoveTileOverlayManager,
} from "../../types";
import { Network, PieceType } from "../../../network/types";

import { Coord } from "@latticexyz/utils";
import { EntityIndex } from "@latticexyz/recs";
import { PIECE_SPRITE_ID } from "../../constants";
import clearValidMoveOverlaysIfNecessary from "./clearValidMoveOverlaysIfNecessary";
import createPieceSpriteManager from "./createPieceSpriteManager";
import loopPieceIdleAnimation from "./loopPieceIdleAnimation";
import { playPieceMoveAnimation } from "./pieceMoveAnimation";
import { removeAllTweens } from "@latticexyz/phaserx";

const LOOP_IDLE_HEIGHT = 50;
const LOOP_IDLE_DURATION = 1000;

const createLobbyPieceSpriteManager = (
  network: Network,
  game: Game,
  scene: Scene,
  validMoveTileOverlayManager: ValidMoveTileOverlayManager,
  speechBubbleManager: SpeechBubbleManager
) => {
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
      LOOP_IDLE_DURATION,
      Phaser.Math.Easing.Sine.InOut
    );
  };

  const animateMoveTo = async (piece: EntityIndex, tileCoord: Coord) => {
    const sprite = pieceSpriteManager.getSprite(piece);
    clearValidMoveOverlaysIfNecessary(
      pieceSpriteManager,
      validMoveTileOverlayManager,
      piece
    );
    removeAllTweens(sprite);
    await playPieceMoveAnimation(pieceSpriteManager, piece, tileCoord);
    validMoveTileOverlayManager.setValidMoveOverlays();
    loopPieceIdleAnimation(
      pieceSpriteManager,
      piece,
      LOOP_IDLE_HEIGHT,
      LOOP_IDLE_DURATION,
      Phaser.Math.Easing.Sine.InOut
    );
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

  const animateSpeechBubble = (piece: EntityIndex, message: string) => {
    const sprite = pieceSpriteManager.getSprite(piece);
    speechBubbleManager.displayChatBubbleForPieceSprite(sprite, message);
  };

  /// ======= Internal =======

  return {
    createPiece,
    animateMoveTo,
    animateRemovePiece,
    animateSwitchType,
    animateSpeechBubble,
  };
};

export default createLobbyPieceSpriteManager;
