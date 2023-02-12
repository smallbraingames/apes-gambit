import {
  Assets,
  PIECE_SPRITE_SCALE,
  RenderDepth,
  TILE_HEIGHT,
  TILE_WIDTH,
} from "../constants";
import { GameConfig, Scene } from "../types";
import { Perlin, createPerlin } from "@latticexyz/noise";

import { Coord } from "@latticexyz/utils";
import { tileCoordToPixelCoord } from "@latticexyz/phaserx";

const PERLIN_DIGITS = 3;

const createBananaMananger = () => {
  let perlin: Perlin;
  let game: GameConfig;

  const setup = async (gameConfig: GameConfig) => {
    perlin = await createPerlin();
    game = gameConfig;
  };

  const isBananaOnTile = (position: Coord) => {
    const height = Math.floor(
      perlin(
        position.x + game.perlinSeed,
        position.y + game.perlinSeed,
        0,
        game.perlinDenom
      ) *
        10 ** PERLIN_DIGITS
    );
    return height >= game.perlinThresholdBanana;
  };

  const placeBananaOnTile = (tileCoord: Coord, scene: Scene) => {
    const position = tileCoordToPixelCoord(tileCoord, TILE_WIDTH, TILE_HEIGHT);
    const { scene: phaserScene } = scene;
    const sprite = phaserScene.physics.add.sprite(
      position.x,
      position.y,
      Assets.Banana
    );
    sprite.setOrigin(0, 0);
    sprite.setScale(PIECE_SPRITE_SCALE, PIECE_SPRITE_SCALE);
    sprite.setDepth(RenderDepth.PIECE);
  };

  const placeBananas = (scene: Scene, tilemap: Phaser.Tilemaps.Tilemap) => {
    tilemap.forEachTile((tile) => {
      const tileCoord = {
        x: tile.x - tilemap.width / 2,
        y: tile.y - tilemap.height / 2,
      };
      if (!isBananaOnTile(tileCoord)) {
        return;
      }
      placeBananaOnTile(tileCoord, scene);
    });
  };

  return { setup, isBananaOnTile, placeBananas };
};

export default createBananaMananger;
