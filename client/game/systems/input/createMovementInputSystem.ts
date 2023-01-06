import { Game } from "../../types";
import { Network } from "../../../network/types";
import getEntityFromEntityIndex from "../../utils/getEntityFromEntityIndex";
import getNetworkWallet from "../../../network/wallet/getNetworkWallet";
import getOwnedPieceEntityIndex from "../../utils/getOwnedPieceEntityIndex";
import { pixelCoordToTileCoord } from "@latticexyz/phaserx";

const createMovementInputSystem = (network: Network, game: Game) => {
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

  input.click$.subscribe((p) => {
    const pointer = p as Phaser.Input.Pointer;
    const tilePosition = pixelCoordToTileCoord(
      { x: pointer.worldX, y: pointer.worldY },
      tileWidth,
      tileHeight
    );
    console.log("moving");
    console.log(
      getEntityFromEntityIndex(
        getOwnedPieceEntityIndex(
          getNetworkWallet(network).address,
          network.components.Owner,
          network.world
        ),
        network.world
      ),
      game.gameEntity,
      tilePosition
    );
    network.api.movePiece(
      getEntityFromEntityIndex(
        getOwnedPieceEntityIndex(
          getNetworkWallet(network).address,
          network.components.Owner,
          network.world
        ),
        network.world
      ),
      game.gameEntity,
      tilePosition
    );
  });
};

export default createMovementInputSystem;
