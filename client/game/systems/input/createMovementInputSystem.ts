import { EntityType, Game } from "../../types";

import { Network } from "../../../network/types";
import getEntityFromEntityIndex from "../../utils/getEntityFromEntityIndex";
import getEntityType from "../../utils/getEntityType";
import getNetworkWallet from "../../../network/wallet/getNetworkWallet";
import getOwnedPieceEntityIndex from "../../utils/getOwnedPieceEntityIndex";
import isActiveGamePiece from "../../utils/isActiveGamePiece";
import isPieceAlive from "../../utils/isPieceAlive";
import { pixelCoordToTileCoord } from "@latticexyz/phaserx";

const createMovementInputSystem = (network: Network, game: Game) => {
  const {
    gameEntity,
    scenes: {
      Main: {
        input,
        maps: {
          Main: { tileWidth, tileHeight },
        },
      },
    },
  } = game;

  input.click$.subscribe((p) => {
    const entityIndex = getOwnedPieceEntityIndex(
      getNetworkWallet(network).address,
      network.components.Owner,
      network.world
    );

    // Check if is active game piece (alive, in right game, piece entity)
    if (!isActiveGamePiece(entityIndex, network, gameEntity)) return;

    const pointer = p as Phaser.Input.Pointer;
    const tilePosition = pixelCoordToTileCoord(
      { x: pointer.worldX, y: pointer.worldY },
      tileWidth,
      tileHeight
    );

    network.api.movePiece(
      getEntityFromEntityIndex(entityIndex, network.world),
      game.gameEntity,
      tilePosition
    );
  });
};

export default createMovementInputSystem;
