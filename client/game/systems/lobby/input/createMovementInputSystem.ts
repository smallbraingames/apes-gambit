import { Game } from "../../../types";
import { Network } from "../../../../network/types";
import { Subscription } from "rxjs";
import getEntityFromEntityIndex from "../../../utils/getEntityFromEntityIndex";
import getNetworkWallet from "../../../../network/wallet/getNetworkWallet";
import getOwnedPieceEntityIndex from "../../../utils/getOwnedPieceEntityIndex";
import { pixelCoordToTileCoord } from "@latticexyz/phaserx";

const createMovementInputSystem = (
  network: Network,
  game: Game
): Subscription => {
  const {
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
    const entityIndex = getOwnedPieceEntityIndex(
      getNetworkWallet(network).address,
      network.components.Owner,
      network.world
    );

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

  return subscription;
};

export default createMovementInputSystem;
