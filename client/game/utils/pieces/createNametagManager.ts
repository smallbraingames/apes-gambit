import { RenderDepth } from "../../constants";
import { Scene } from "../../types";

const NAMETAG_PADDING = 30;
const NAMETAG_HEIGHT = 140;

const createNametagManager = (scene: Scene) => {
  const { scene: phaserScene } = scene;
  const displayNametagForSprite = (
    pieceSprite: Phaser.GameObjects.Sprite,
    nametag: string
  ) => {
    const width = NAMETAG_PADDING * 2 + nametag.length * 70;
    const height = NAMETAG_HEIGHT;

    const back = phaserScene.add.graphics();
    back.fillStyle(0x222222, 0.5);
    back.fillRoundedRect(0, 0, width, height, 20);
    back.fillStyle(0xffffff, 1);
    back.lineStyle(4, 0x565656, 1);
    back.strokeRoundedRect(0, 0, width, height, 16);
    back.fillRoundedRect(0, 0, width, height, 16);

    const content = phaserScene.add.text(0, 0, nametag, {
      fontFamily: "Arial",
      // @ts-ignore
      fontSize: 120,
      color: "#000000",
      align: "center",
      wordWrap: { width: width - NAMETAG_PADDING * 2 },
    });

    back.setDepth(RenderDepth.SPEECH);
    content.setDepth(RenderDepth.SPEECH);

    // Start tracking
    const updateNametagPosition = () => {
      const nametagX = pieceSprite.x + pieceSprite.width / 2 - width / 2;
      const nametagY =
        pieceSprite.y - height / 2 + pieceSprite.height - NAMETAG_PADDING;
      back.setPosition(nametagX, nametagY);
      const b = content.getBounds();
      content.setPosition(
        nametagX + width / 2 - b.width / 2,
        nametagY + height / 2 - b.height / 2
      );
    };

    phaserScene.events.on("postupdate", updateNametagPosition);
  };

  return { displayNametagForSprite };
};

export default createNametagManager;
