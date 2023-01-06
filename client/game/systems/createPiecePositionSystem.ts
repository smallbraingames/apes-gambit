import { Game } from "../types";
import { Network } from "../../network/types";
import { Sprites } from "../constants";
import { defineComponentSystem } from "@latticexyz/recs";
import isActiveGamePiece from "../utils/isActiveGamePiece";
import { tileCoordToPixelCoord } from "@latticexyz/phaserx";

const createPiecePositionSystem = (network: Network, game: Game) => {
  const {
    world,
    components: { PiecePosition },
  } = network;

  const {
    gameEntity,
    scenes: {
      Main: {
        objectPool,
        config,
        maps: {
          Main: { tileWidth, tileHeight },
        },
      },
    },
  } = game;

  defineComponentSystem(
    world,
    PiecePosition,
    (update) => {
      if (!isActiveGamePiece(update.entity, network, gameEntity)) return;

      const position = update.value[0];
      if (!position) {
        objectPool.remove(update.entity);
        return;
      }
      const object = objectPool.get(update.entity, "Sprite");
      const { x, y } = tileCoordToPixelCoord(position, tileWidth, tileHeight);
      const sprite = config.sprites[Sprites.Pawn];

      object.setComponent({
        id: PiecePosition.id,
        once: (gameObject) => {
          console.log(`setting ${update.entity} to ${x},${y}`);
          gameObject.setTexture(sprite.assetKey);
          gameObject.setPosition(x, y);
        },
      });
    },
    { runOnInit: true }
  );
};

export default createPiecePositionSystem;
