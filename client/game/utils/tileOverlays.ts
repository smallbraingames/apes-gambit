import {
  EntityIndex,
  getComponentValue,
  getComponentValueStrict,
  getEntitiesWithValue,
} from "@latticexyz/recs";
import { Game, Scene } from "../types";
import { Network, PieceType } from "../../network/types";
import {
  TILE_HEIGHT,
  TILE_OVERLAY_COLOR,
  TILE_OVERLAY_TAKE_COLOR,
  TILE_WIDTH,
} from "../constants";

import { Coord } from "@latticexyz/utils";
import { ObjectRegistry } from "../../phaser/types";
import addTileOverlay from "./addTileOverlay";
import getValidMoves from "./getValidMoves";
import isLiveGamePiece from "./isLiveGamePiece";

const BR_VALID_MOVE_GROUP = "br-valid-moves";

export const clearValidMoveOverlays = (
  objectRegistry: ObjectRegistry,
  godEntityIndex: EntityIndex
) => {
  if (!objectRegistry.groupRegistry.has(godEntityIndex, BR_VALID_MOVE_GROUP)) {
    return;
  }
  const validMoveGroup = objectRegistry.groupRegistry.get(
    godEntityIndex,
    BR_VALID_MOVE_GROUP
  ) as Phaser.GameObjects.Group;
  validMoveGroup.clear(true, true);
};

export const setValidMoveOverlays = (
  network: Network,
  game: Game,
  scene: Scene
) => {
  const {
    godEntityIndex,
    components: { PieceType, PiecePosition },
  } = network;
  const {
    gameEntity,
    components: { ActivePiece },
  } = game;

  const { objectRegistry, scene: gameScene } = scene;

  let validMoveGroup: Phaser.GameObjects.Group;
  if (!objectRegistry.groupRegistry.has(godEntityIndex, BR_VALID_MOVE_GROUP)) {
    validMoveGroup = gameScene.add.group();
  } else {
    validMoveGroup = objectRegistry.groupRegistry.get(
      godEntityIndex,
      BR_VALID_MOVE_GROUP
    ) as Phaser.GameObjects.Group;
  }

  // Get active piece
  const activePiece = getComponentValue(ActivePiece, godEntityIndex)?.value as
    | EntityIndex
    | undefined;
  if (!activePiece) {
    console.warn("Cannot set valid tile overlays without an active piece");
    return;
  }
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
    if (gameEntity) {
      const pieceAtPositionInGame = [...pieceAtPosition].filter((piece) =>
        isLiveGamePiece(piece, network, gameEntity)
      );
      if (pieceAtPositionInGame.length > 0) color = TILE_OVERLAY_TAKE_COLOR;
    }
    validMoveGroup!.add(
      addTileOverlay(potentialMove, gameScene, TILE_WIDTH, TILE_HEIGHT, color)
    );
  });
  objectRegistry.groupRegistry.set(
    godEntityIndex,
    BR_VALID_MOVE_GROUP,
    validMoveGroup
  );
};
