import { EntityIndex, getComponentValueStrict } from "@latticexyz/recs";
import { TILE_HEIGHT, TILE_WIDTH } from "../../../constants";
import { createInput, pixelCoordToTileCoord } from "@latticexyz/phaserx";

import { Game } from "../../../types";
import { Network } from "../../../../network/types";
import { Subscription } from "rxjs";
import getEntityFromEntityIndex from "../../../utils/getEntityFromEntityIndex";

const createMovementInputSystem = (
  network: Network,
  game: Game
): Subscription[] => {
  const { godEntityIndex } = network;

  const {
    components: { ActivePiece },
    scenes: { Main },
  } = game;

  const input = createInput(Main.input);

  const subscription = input.click$.subscribe((p) => {
    const entityIndex = getComponentValueStrict(ActivePiece, godEntityIndex)
      .value as EntityIndex;
    const pointer = p as Phaser.Input.Pointer;
    const tilePosition = pixelCoordToTileCoord(
      { x: pointer.worldX, y: pointer.worldY },
      TILE_WIDTH,
      TILE_HEIGHT
    );

    network.api.movePiece(
      getEntityFromEntityIndex(entityIndex, network.world),
      tilePosition
    );
  });

  return [subscription];
};

export default createMovementInputSystem;
