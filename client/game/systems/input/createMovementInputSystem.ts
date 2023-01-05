import { Game } from "../../types";
import { Network } from "../../../network/types";
import getEntityFromEntityIndex from "../../utils/getEntityFromEntityIndex";
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
    console.log(`Got input with position ${JSON.stringify(tilePosition)}`);
    network.api.movePiece(
      getEntityFromEntityIndex(
        getOwnedPieceEntityIndex(
          "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
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
