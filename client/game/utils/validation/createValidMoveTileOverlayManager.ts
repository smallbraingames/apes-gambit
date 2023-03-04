import {
  BR_VALID_MOVE_GROUP_ID,
  TILE_HEIGHT,
  TILE_OVERLAY_COLOR,
  TILE_OVERLAY_TAKE_COLOR,
  TILE_WIDTH,
} from "../../constants";
import { Coord, coordToKey } from "@latticexyz/utils";
import {
  EntityID,
  EntityIndex,
  getComponentValue,
  getComponentValueStrict,
  getEntitiesWithValue,
} from "@latticexyz/recs";
import { Game, MoveValidator, Scene } from "../../types";
import { Network, PieceType } from "../../../network/types";

import { RenderDepth } from "../../constants";
import isLiveGamePiece from "../isLiveGamePiece";
import { tileCoordToPixelCoord } from "@latticexyz/phaserx";

enum TileOverlayType {
  MOVE = "MOVE",
  BANANA = "BANANA",
  TAKE = "TAKE",
}

type ValidMoveTileOverlayConfig = {
  tilePosition: Coord;
  type: TileOverlayType;
};

type ValidMoveTileOverlay = {
  config: ValidMoveTileOverlayConfig;
  overlay: Phaser.GameObjects.GameObject;
};

const getTileKey = (tileConfig: ValidMoveTileOverlayConfig) =>
  `${coordToKey(tileConfig.tilePosition)}**${tileConfig.type}`;

const createValidMoveTileOverlayManager = (
  network: Network,
  game: Game,
  scene: Scene,
  moveValidator: MoveValidator,
  gameEntity?: EntityID
) => {
  let currentValidMoveOverlays: Map<number, ValidMoveTileOverlay> = new Map();

  const clearValidMoveOverlays = () => {
    [...currentValidMoveOverlays.values()].forEach((overlay) =>
      overlay.overlay.destroy()
    );
    currentValidMoveOverlays = new Map();
  };

  const hasValidMoveOverlays = () => {
    return currentValidMoveOverlays.size > 0;
  };

  const setValidMoveOverlays = () => {
    const {
      godEntityIndex,
      components: { PieceType, PiecePosition },
    } = network;
    const {
      components: { ActivePiece },
    } = game;

    // Get active piece
    const activePiece = getComponentValue(ActivePiece, godEntityIndex)
      ?.value as EntityIndex | undefined;
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

    // Create ovlerays
    const overlayConfigs: ValidMoveTileOverlayConfig[] = [];
    const validMoves = moveValidator.getValidMoves(pieceType, piecePosition);
    validMoves.forEach((potentialMove) => {
      const pieceAtPosition = getEntitiesWithValue(
        PiecePosition,
        potentialMove
      );
      let type = TileOverlayType.MOVE;
      if (gameEntity) {
        const pieceAtPositionInGame = [...pieceAtPosition].filter((piece) =>
          isLiveGamePiece(piece, network, gameEntity)
        );
        if (pieceAtPositionInGame.length > 0) {
          type = TileOverlayType.TAKE;
        }
      }
      overlayConfigs.push({ tilePosition: potentialMove, type });
    });

    // Only update what is necessary
    const newOverlayConfigs: ValidMoveTileOverlayConfig[] = [];
    const keepOverlayConfigKeys: Set<number> = new Set();

    overlayConfigs.forEach((config) => {
      const configKey = coordToKey(config.tilePosition);
      const existingConfig = currentValidMoveOverlays.get(configKey);
      if (
        existingConfig &&
        getTileKey(existingConfig.config) === getTileKey(config)
      ) {
        keepOverlayConfigKeys.add(configKey);
        return;
      }
      newOverlayConfigs.push(config);
    });

    // Remove old tiles
    [...currentValidMoveOverlays.entries()].forEach((entry) => {
      const key = entry[0];
      const tileOverlay = entry[1];
      if (!keepOverlayConfigKeys.has(key)) {
        tileOverlay.overlay.destroy();
        currentValidMoveOverlays.delete(key);
      }
    });

    // Add tiles and update the map
    newOverlayConfigs.forEach((config) => {
      const overlay = addValidMoveOverlay(config);
      currentValidMoveOverlays.set(coordToKey(config.tilePosition), {
        overlay,
        config,
      });
    });
  };

  const getTileColor = (tileType: TileOverlayType) => {
    if (tileType === TileOverlayType.TAKE) {
      return TILE_OVERLAY_TAKE_COLOR;
    }
    return TILE_OVERLAY_COLOR;
  };

  const addValidMoveOverlay = (
    tileConfig: ValidMoveTileOverlayConfig
  ): Phaser.GameObjects.Rectangle => {
    const { scene: phaserScene } = scene;
    const { x, y } = tileCoordToPixelCoord(
      tileConfig.tilePosition,
      TILE_WIDTH,
      TILE_HEIGHT
    );
    const overlay = phaserScene.add.ellipse(
      x + TILE_WIDTH / 2,
      y + TILE_HEIGHT / 2,
      tileConfig.type === TileOverlayType.TAKE
        ? TILE_WIDTH / 1.2
        : TILE_WIDTH / 3,
      tileConfig.type === TileOverlayType.TAKE
        ? TILE_HEIGHT / 1.2
        : TILE_HEIGHT / 3,
      getTileColor(tileConfig.type),
      1
    );
    overlay.setAlpha(0.6);
    overlay.setInteractive();
    overlay.on("pointerover", () => {
      overlay.setAlpha(1);
    });
    overlay.on("pointerout", () => {
      overlay.setAlpha(0.6);
    });

    overlay.setDepth(RenderDepth.TILE_OVERLAY);
    return overlay;
  };

  return {
    clearValidMoveOverlays,
    setValidMoveOverlays,
    hasValidMoveOverlays,
  };
};

export default createValidMoveTileOverlayManager;
