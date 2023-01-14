import { EntityIndex, getComponentValueStrict } from "@latticexyz/recs";

import { Game } from "../../../types";
import { Network } from "../../../../network/types";
import { Subscription } from "rxjs";
import getEntityFromEntityIndex from "../../../utils/getEntityFromEntityIndex";
import { pixelCoordToTileCoord } from "@latticexyz/phaserx";

const createMovementInputSystem = (
  network: Network,
  game: Game
): Subscription[] => {
  const { godEntityIndex } = network;

  const {
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
    const pointer = p as Phaser.Input.Pointer;
    const tilePosition = pixelCoordToTileCoord(
      { x: pointer.worldX, y: pointer.worldY },
      tileWidth,
      tileHeight
    );

    network.api.movePiece(
      getEntityFromEntityIndex(entityIndex, network.world),
      tilePosition
    );
  });

  return [subscription];
};

export default createMovementInputSystem;
