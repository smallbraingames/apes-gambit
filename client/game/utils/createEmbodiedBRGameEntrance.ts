import { Assets, TILE_HEIGHT, TILE_WIDTH } from "../constants";
import {
  EntityID,
  EntityIndex,
  getComponentValueStrict,
} from "@latticexyz/recs";
import { Game, Scene } from "../types";

import { Coord } from "@latticexyz/utils";
import { Network } from "../../network/types";
import joinMainGame from "./setup/joinMainGame";
import setDepthFromCoord from "./setDepthFromCoord";
import { tileCoordToPixelCoord } from "@latticexyz/phaserx";

const createEmbodiedBRGameEntrance = (
  network: Network,
  game: Game,
  position: Coord,
  scene: Scene
) => {
  const { x, y } = tileCoordToPixelCoord(position, TILE_HEIGHT, TILE_WIDTH);
  const sprite = scene.scene.add.sprite(x, y, Assets.TempleFull);
  sprite.setScale(2);
  setDepthFromCoord(sprite);
  sprite.setPosition(x, y - sprite.height * (2.5 / 8));
  const { godEntityIndex } = network;

  const {
    components: { ActivePiece, EmbodiedBRGameEntity },
  } = game;

  const gameEntity = getComponentValueStrict(
    EmbodiedBRGameEntity,
    godEntityIndex
  ).value;

  let outline: Phaser.GameObjects.Graphics | undefined;
  sprite.setInteractive();
  sprite.on("pointerdown", () => {
    const activePiece = getComponentValueStrict(
      ActivePiece,
      godEntityIndex
    ).value;
    joinMainGame(network, gameEntity as EntityID, activePiece as EntityIndex);
  });
  sprite.on("pointerover", () => {
    outline = setOutline(sprite);
  });
  sprite.on("pointerout", () => {
    if (outline) {
      outline.destroy();
      outline = undefined;
    }
  });

  const setOutline = (
    sprite: Phaser.GameObjects.Sprite,
    thickness = 2,
    color = 0xffffff
  ) => {
    const outline = new Phaser.GameObjects.Graphics(scene.scene);
    outline.lineStyle(thickness, color);
    outline.strokeRectShape(sprite.getBounds());
    scene.scene.add.existing(outline);
    return outline;
  };
};

export default createEmbodiedBRGameEntrance;
