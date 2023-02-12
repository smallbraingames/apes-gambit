import {
  EntityIndex,
  getComponentValue,
  getComponentValueStrict,
} from "@latticexyz/recs";
import { TILE_HEIGHT, TILE_WIDTH } from "../../../constants";
import { createInput, pixelCoordToTileCoord } from "@latticexyz/phaserx";

import { Game } from "../../../types";
import { Network } from "../../../../network/types";
import { Subscription } from "rxjs";
import { getEntityFromEntityIndex } from "../../../utils/resolveEntity";

const createMovementInputSystem = (
  network: Network,
  game: Game
): Subscription[] => {
  const { world, godEntityIndex } = network;

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

    network.api.movePiece(
      getEntityFromEntityIndex(entityIndex, world),
      tilePosition
    );
  });

  return [subscription];
};

export default createMovementInputSystem;
