import { EntityIndex, getComponentValueStrict } from "@latticexyz/recs";

import { Game } from "../../../types";
import { Network } from "../../../../network/types";
import { Subscription } from "rxjs";
import getEntityFromEntityIndex from "../../../utils/getEntityFromEntityIndex";
import isActiveGamePiece from "../../../utils/isActiveGamePiece";
import { pixelCoordToTileCoord } from "@latticexyz/phaserx";

const createBRMovementInputSystem = (
  network: Network,
  game: Game
): Subscription => {
  const { godEntityIndex } = network;
  const {
    gameEntity,
    components: { ActivePiece },
    scenes: {
      Main: {
        input,
        maps: {
          Main: { tileWidth, tileHeight },
        },
      },
    },
  } = game;

  const subscription = input.click$.subscribe((p) => {
    const entityIndex = getComponentValueStrict(ActivePiece, godEntityIndex)
      .value as EntityIndex;
    // Check if is active game piece (alive, in right game, piece entity)
    if (!isActiveGamePiece(entityIndex, network, gameEntity!)) return;

    const pointer = p as Phaser.Input.Pointer;
    const tilePosition = pixelCoordToTileCoord(
      { x: pointer.worldX, y: pointer.worldY },
      tileWidth,
      tileHeight
    );

    network.api.br.moveBRPiece(
      getEntityFromEntityIndex(entityIndex, network.world),
      game.gameEntity!,
      tilePosition
    );
  });

  return subscription;
};

export default createBRMovementInputSystem;
