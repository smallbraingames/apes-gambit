import {
  EntityIndex,
  getComponentValue,
  getComponentValueStrict,
} from "@latticexyz/recs";
import { Game, Lobby } from "../../../types";
import { Network, PieceType } from "../../../../network/types";
import { TILE_HEIGHT, TILE_WIDTH } from "../../../constants";
import { createInput, pixelCoordToTileCoord } from "@latticexyz/phaserx";

import { Subscription } from "rxjs";
import { getEntityFromEntityIndex } from "../../../utils/resolveEntity";

const createMovementInputSystem = (
  network: Network,
  game: Game,
  lobby: Lobby
): Subscription[] => {
  const {
    world,
    godEntityIndex,
    components: { PiecePosition, PieceType },
  } = network;

  const {
    game: phaserGame,
    components: { ActivePiece },
    scenes: {
      Lobby: { scene },
    },
  } = game;

  const input = createInput(scene.input);

  const subscription = input.click$.subscribe((p) => {
    if (!phaserGame.scene.isActive(scene)) return;
    const entityIndex = getComponentValueStrict(ActivePiece, godEntityIndex)
      .value as EntityIndex;
    const pointer = p as Phaser.Input.Pointer;
    const tilePosition = pixelCoordToTileCoord(
      { x: pointer.worldX, y: pointer.worldY },
      TILE_WIDTH,
      TILE_HEIGHT
    );

    // If move is invalid, don't make it
    const currentPosition = getComponentValueStrict(PiecePosition, entityIndex);
    const pieceType = getComponentValueStrict(PieceType, entityIndex)
      .value as PieceType;
    if (
      !lobby.moveValidator.isMoveValid(currentPosition, tilePosition, pieceType)
    ) {
      console.warn(
        "Not making invalid move",
        currentPosition,
        tilePosition,
        pieceType
      );
      return;
    }

    network.api.movePiece(
      getEntityFromEntityIndex(entityIndex, world),
      tilePosition
    );
  });

  return [subscription];
};

export default createMovementInputSystem;
