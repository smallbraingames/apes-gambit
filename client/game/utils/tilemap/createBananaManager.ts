import {
  Assets,
  BANANA_SPRITE_ID,
  PIECE_SPRITE_SCALE,
  RenderDepth,
  TILE_HEIGHT,
  TILE_WIDTH,
} from "../../constants";
import {
  EntityID,
  EntityIndex,
  HasValue,
  createEntity,
  getComponentValue,
  runQuery,
  withValue,
} from "@latticexyz/recs";
import { Game, GameConfig, Scene } from "../../types";
import { Perlin, createPerlin } from "@latticexyz/noise";
import { keccak256, solidityKeccak256, toUtf8Bytes } from "ethers/lib/utils";
import { tileCoordToPixelCoord, tween } from "@latticexyz/phaserx";

import { Coord } from "@latticexyz/utils";
import { Network } from "../../../network/types";
import { getEntityIndexFromEntity } from "../resolveEntity";
import { getMoveAnimationDuration } from "../pieces/pieceMoveAnimation";
import setDepthFromCoord from "../setDepthFromCoord";

const PERLIN_DIGITS = 3;

const createBananaMananger = () => {
  let perlin: Perlin;
  let network: Network;
  let game: Game;
  let gameConfig: GameConfig;
  let scene: Scene;
  let gameEntity: EntityID;

  const setup = async (
    networkContext: Network,
    gameContext: Game,
    gameEntityID: EntityID,
    gameConfiguration: GameConfig,
    bananaScene: Scene
  ) => {
    network = networkContext;
    game = gameContext;
    gameConfig = gameConfiguration;
    scene = bananaScene;
    gameEntity = gameEntityID;
    perlin = await createPerlin();
  };

  const isBananaOnTile = (position: Coord) => {
    // Check if banana has been picked up
    const {
      components: { BRBananasPickedUp },
    } = network;
    const bananaPickedUpEntity = getBananaPickedUpEntityIndex(position);
    if (bananaPickedUpEntity) {
      const bananaPickedUp = getComponentValue(
        BRBananasPickedUp,
        bananaPickedUpEntity
      );
      if (bananaPickedUp?.value === 1) {
        return false;
      }
    }

    // Check if perlin noise places banana on tile
    const height = Math.floor(
      perlin(
        position.x + gameConfig.perlinSeed,
        position.y + gameConfig.perlinSeed,
        0,
        gameConfig.perlinDenom
      ) *
        10 ** PERLIN_DIGITS
    );

    return height >= gameConfig.perlinThresholdBanana;
  };

  const getBananaEntityAtPosition = (position: Coord) => {
    const {
      components: { BRBananaComponent },
    } = game;
    const bananaEntities = runQuery([
      HasValue(BRBananaComponent, { x: position.x, y: position.y }),
    ]);
    if (bananaEntities.size === 0) {
      return undefined;
    }
    return [...bananaEntities][0];
  };

  const placeBananaOnTile = (tileCoord: Coord) => {
    const bananaEntity = getBananaEntityAtPosition(tileCoord);
    if (bananaEntity) {
      // Banana already on tile, don't create new sprite
      console.warn(
        "Found banana entity on tile, not placing banana",
        bananaEntity,
        tileCoord
      );
      return;
    }
    createBananaSprites(tileCoord);
  };

  const createBananaSprites = (tileCoord: Coord) => {
    const {
      gameWorld,
      components: { BRBananaComponent },
    } = game;
    const entity = createEntity(gameWorld, [
      withValue(BRBananaComponent, { x: tileCoord.x, y: tileCoord.y }),
    ]);
    const position = tileCoordToPixelCoord(tileCoord, TILE_WIDTH, TILE_HEIGHT);
    const {
      scene: phaserScene,
      objectRegistry: { gameObjectRegistry },
    } = scene;
    // Add Banana
    const bananaSprite = phaserScene.physics.add.sprite(
      position.x,
      position.y,
      Assets.Banana
    );
    bananaSprite.setOrigin(0, 0);
    bananaSprite.setPosition(
      position.x + TILE_WIDTH / 2 - bananaSprite.width / 2,
      position.y + TILE_HEIGHT / 2 - bananaSprite.height / 2 - 250
    );
    setDepthFromCoord(bananaSprite, +TILE_HEIGHT);
    tween(
      {
        targets: bananaSprite,
        duration: 2000,
        props: { x: bananaSprite.x, y: bananaSprite.y - 100 },
        yoyo: true,
        ease: Phaser.Math.Easing.Sine.InOut,
        repeat: -1,
      },
      { keepExistingTweens: false }
    );
    gameObjectRegistry.set(entity, BANANA_SPRITE_ID, bananaSprite);

    // Add under banana sprite
    const underBanana = phaserScene.add.sprite(
      position.x,
      position.y,
      Assets.UnderBanana
    );
    underBanana.setOrigin(0, 0);
    underBanana.setPosition(
      position.x + TILE_WIDTH / 2 - underBanana.width / 2,
      position.y + TILE_HEIGHT / 2 - underBanana.height / 2
    );
    setDepthFromCoord(underBanana, -TILE_HEIGHT - 10);
    gameObjectRegistry.set(entity, `${BANANA_SPRITE_ID}:under`, bananaSprite);
  };

  const placeBananas = (tilemap: Phaser.Tilemaps.Tilemap) => {
    tilemap.forEachTile((tile) => {
      const tileCoord = {
        x: tile.x - tilemap.width / 2,
        y: tile.y - tilemap.height / 2,
      };
      if (!isBananaOnTile(tileCoord)) {
        return;
      }
      placeBananaOnTile(tileCoord);
    });
  };

  const removeBananaAtPosition = (position: Coord) => {
    const bananaEntity = getBananaEntityAtPosition(position);
    if (!bananaEntity) {
      console.warn(
        "Cannot remove banana at position since no banana entity found",
        bananaEntity
      );
      return;
    }
    removeBanana(bananaEntity);
  };

  const animateRemoveBanana = async (entityIndex: EntityIndex) => {
    const {
      camera,
      objectRegistry: { gameObjectRegistry },
    } = scene;
    const banana = gameObjectRegistry.get(entityIndex, BANANA_SPRITE_ID);
    const x = camera.phaserCamera.worldView.left;
    const y = camera.phaserCamera.worldView.top;
    await tween(
      {
        // @ts-ignore
        targets: banana,
        duration: 700,
        props: { x, y, angle: 180 },
        ease: Phaser.Math.Easing.Sine.InOut,
      },
      { keepExistingTweens: false }
    );
    removeBanana(entityIndex);
  };

  const removeBanana = (entityIndex: EntityIndex) => {
    const {
      objectRegistry: { gameObjectRegistry },
    } = scene;
    gameObjectRegistry.remove(entityIndex, BANANA_SPRITE_ID);
  };

  const getBananaPickedUpEntityIndex = (position: Coord) => {
    const {
      world,
      components: { BRBananasPickedUp },
    } = network;
    const componentID = keccak256(toUtf8Bytes(BRBananasPickedUp.id));
    const entityID = solidityKeccak256(
      ["int32", "int32", "uint256", "uint256"],
      [position.x, position.y, gameEntity!, componentID]
    ) as EntityID;
    try {
      return getEntityIndexFromEntity(entityID, world);
    } catch (e) {}
  };

  return {
    setup,
    isBananaOnTile,
    placeBananas,
    removeBanana,
    removeBananaAtPosition,
    getBananaEntityAtPosition,
    animateRemoveBanana,
  };
};

export default createBananaMananger;
