import { EntityIndex, getComponentValueStrict } from "@latticexyz/recs";
import { TILE_HEIGHT, TILE_WIDTH } from "../../../constants";
import { createInput, pixelCoordToTileCoord } from "@latticexyz/phaserx";

import { Game } from "../../../types";
import { Network } from "../../../../network/types";
import { Subscription } from "rxjs";
import { getEntityFromEntityIndex } from "../../../utils/resolveEntity";
import isLiveGamePiece from "../../../utils/isLiveGamePiece";

const createBRMovementInputSystem = (
  network: Network,
  game: Game
): Subscription[] => {
  const { godEntityIndex } = network;
  const {
    game: phaserGame,
    gameEntity,
    components: { ActivePiece },
    scenes: {
      BR: { scene },
    },
  } = game;

  const input = createInput(scene.input);

  const subscription = input.click$.subscribe((p) => {
    if (!phaserGame.scene.isActive(scene)) return;
    const entityIndex = getComponentValueStrict(ActivePiece, godEntityIndex)
      .value as EntityIndex;
    // Check if is active game piece (alive, in right game, piece entity)
    if (!isLiveGamePiece(entityIndex, network, gameEntity!)) return;

    const pointer = p as Phaser.Input.Pointer;
    const tilePosition = pixelCoordToTileCoord(
      { x: pointer.worldX, y: pointer.worldY },
      TILE_WIDTH,
      TILE_HEIGHT
    );

    console.log("moving br piece");
    network.api.br.moveBRPiece(
      getEntityFromEntityIndex(entityIndex, network.world),
      game.gameEntity!,
      tilePosition
    );
  });

  return [subscription];
};

export default createBRMovementInputSystem;
