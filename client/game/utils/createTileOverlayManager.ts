import {
  BR_VALID_MOVE_GROUP_ID,
  TILE_HEIGHT,
  TILE_OVERLAY_COLOR,
  TILE_OVERLAY_TAKE_COLOR,
  TILE_WIDTH,
} from "../constants";
import { Coord, coordToKey } from "@latticexyz/utils";
import {
  EntityID,
  EntityIndex,
  getComponentValue,
  getComponentValueStrict,
  getEntitiesWithValue,
} from "@latticexyz/recs";
import { Game, MoveValidator, Scene } from "../types";
import { Network, PieceType } from "../../network/types";

import { RenderDepth } from "../constants";
import isLiveGamePiece from "./isLiveGamePiece";
import { tileCoordToPixelCoord } from "@latticexyz/phaserx";

enum TileOverlayType {
  MOVE = "MOVE",
  BANANA = "BANANA",
  TAKE = "TAKE",
}

type TileOverlayConfig = {
  tilePosition: Coord;
  type: TileOverlayType;
};

type TileOverlay = {
  config: TileOverlayConfig;
  overlay: Phaser.GameObjects.GameObject;
};

const getTileKey = (tileConfig: TileOverlayConfig) =>
  `${coordToKey(tileConfig.tilePosition)}**${tileConfig.type}`;

const createTileOverlayManager = (
  network: Network,
  game: Game,
  scene: Scene,
  moveValidator: MoveValidator,
  gameEntity?: EntityID
) => {
  let currentTileOverlays: Map<number, TileOverlay> = new Map();

  const clearValidMoveOverlays = () => {
    [...currentTileOverlays.values()].forEach((overlay) =>
      overlay.overlay.destroy()
    );
    currentTileOverlays = new Map();
  };

  const hasValidMoveOverlays = () => {
    return currentTileOverlays.size > 0;
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
    const overlayConfigs: TileOverlayConfig[] = [];
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
    const newOverlayConfigs: TileOverlayConfig[] = [];
    const keepOverlayConfigKeys: Set<number> = new Set();

    overlayConfigs.forEach((config) => {
      const configKey = coordToKey(config.tilePosition);
      const existingConfig = currentTileOverlays.get(configKey);
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
    [...currentTileOverlays.entries()].forEach((entry) => {
      const key = entry[0];
      const tileOverlay = entry[1];
      if (!keepOverlayConfigKeys.has(key)) {
        tileOverlay.overlay.destroy();
        currentTileOverlays.delete(key);
      }
    });

    // Add tiles and update the map
    newOverlayConfigs.forEach((config) => {
      const overlay = addTileOverlay(config);
      currentTileOverlays.set(coordToKey(config.tilePosition), {
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

  const addTileOverlay = (
    tileConfig: TileOverlayConfig
  ): Phaser.GameObjects.Rectangle => {
    const { scene: phaserScene } = scene;
    const { x, y } = tileCoordToPixelCoord(
      tileConfig.tilePosition,
      TILE_WIDTH,
      TILE_HEIGHT
    );
    const overlay = phaserScene.add.rectangle(
      x + TILE_WIDTH / 2,
      y + TILE_HEIGHT / 2,
      TILE_WIDTH,
      TILE_HEIGHT,
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

export default createTileOverlayManager;
