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
  const {
    godEntityIndex,
    components: { BRInGame },
  } = network;

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

    // If piece is in a game, try to move within that game
    // If not, use base system
    const pieceGameID = getComponentValue(BRInGame, entityIndex);
    const pieceEntity = getEntityFromEntityIndex(entityIndex, network.world);
    if (!pieceGameID) {
      network.api.movePiece(pieceEntity, tilePosition);
      return;
    }
    // @ts-ignore
    network.api.br.moveBRPiece(pieceEntity, pieceGameID.value, tilePosition);
  });

  return [subscription];
};

export default createMovementInputSystem;
