import {
  EntityIndex,
  getComponentValueStrict,
  getEntitiesWithValue,
} from "@latticexyz/recs";
import { Network, PieceType } from "../../network/types";
import {
  TILE_HEIGHT,
  TILE_OVERLAY_COLOR,
  TILE_OVERLAY_TAKE_COLOR,
  TILE_WIDTH,
} from "../constants";

import { Coord } from "@latticexyz/utils";
import { Game } from "../types";
import { ObjectRegistry } from "../../phaser/types";
import addTileOverlay from "./addTileOverlay";
import getValidMoves from "./getValidMoves";
import isLiveGamePiece from "./isLiveGamePiece";

const BR_VALID_MOVE_GROUP = "br-valid-moves";

export const clearValidMoveOverlays = (
  objectRegistry: ObjectRegistry,
  godEntityIndex: EntityIndex
) => {
  if (!objectRegistry.has(godEntityIndex, BR_VALID_MOVE_GROUP)) {
    return;
  }
  const validMoveGroup = objectRegistry.get(
    godEntityIndex,
    BR_VALID_MOVE_GROUP
  ) as Phaser.GameObjects.Group;
  validMoveGroup.clear(true, true);
};

export const setValidMoveOverlays = (network: Network, game: Game) => {
  const {
    godEntityIndex,
    components: { PieceType, PiecePosition },
  } = network;
  const {
    gameEntity,
    objectRegistry,
    components: { ActivePiece },
    scenes: { Main },
  } = game;

  let validMoveGroup: Phaser.GameObjects.Group;
  if (!objectRegistry.has(godEntityIndex, BR_VALID_MOVE_GROUP)) {
    validMoveGroup = Main.add.group();
  } else {
    validMoveGroup = objectRegistry.get(
      godEntityIndex,
      BR_VALID_MOVE_GROUP
    ) as Phaser.GameObjects.Group;
  }

  // Get active piece
  const activePiece = getComponentValueStrict(ActivePiece, godEntityIndex)
    .value as EntityIndex;
  const pieceType: PieceType = getComponentValueStrict(
    PieceType,
    activePiece
  ).value;
  const piecePosition: Coord = getComponentValueStrict(
    PiecePosition,
    activePiece
  );

  // Clear the valid move group
  clearValidMoveOverlays(objectRegistry, godEntityIndex);

  const validMoves = getValidMoves(pieceType, piecePosition);
  validMoves.forEach((potentialMove) => {
    const pieceAtPosition = getEntitiesWithValue(PiecePosition, potentialMove);
    let color = TILE_OVERLAY_COLOR;
    if (!gameEntity)
      throw Error("Cannot set valid move overlays without a game entity ID");
    const pieceAtPositionInGame = [...pieceAtPosition].filter((piece) =>
      isLiveGamePiece(piece, network, gameEntity)
    );
    if (pieceAtPositionInGame.length > 0) color = TILE_OVERLAY_TAKE_COLOR;
    validMoveGroup!.add(
      addTileOverlay(potentialMove, Main, TILE_WIDTH, TILE_HEIGHT, color)
    );
  });
  objectRegistry.set(godEntityIndex, BR_VALID_MOVE_GROUP, validMoveGroup);
};
