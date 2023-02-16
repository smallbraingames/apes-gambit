import { Assets, RenderDepth } from "../../constants";

import { Coord } from "@latticexyz/utils";
import { Scene } from "../../types";
import { tween } from "@latticexyz/phaserx";

const BUBBLE_PADDING = 50;
const BUBBLE_HEIGHT = 500;

type BubbleConfig = {
  height: number;
  width: number;
  quote: string;
};

const BUBBLE_DISAPPEAR_TIME = 3000;
const BUBBLE_ANIMATION_DURATION = 150;

const createSpeechBubbleManager = (scene: Scene) => {
  let bubblesCreated = 0;

  const displayChatBubbleForPieceSprite = async (
    pieceSprite: Phaser.GameObjects.Sprite,
    quote: string
  ) => {
    const { scene: phaserScene } = scene;
    const bubbleConfig = {
      quote,
      height: BUBBLE_HEIGHT,
      width: BUBBLE_PADDING * 2 + quote.length * 100,
    };
    const { bubble, content } = createSpeechBubble(bubbleConfig);

    // Start tracking
    const updateSpeechBubblePosition = () => {
      const bubbleX = pieceSprite.x - pieceSprite.width / 2;
      const bubbleY =
        pieceSprite.y - pieceSprite.height + bubbleConfig.height / 4;
      bubble.setPosition(bubbleX, bubbleY);
      setContentPosition(content, { x: bubbleX, y: bubbleY }, bubbleConfig);
    };

    phaserScene.events.on("postupdate", updateSpeechBubblePosition);

    await new Promise((r) => setTimeout(r, BUBBLE_DISAPPEAR_TIME));

    await Promise.all([
      tween(
        {
          // @ts-ignore
          targets: bubble,
          duration: BUBBLE_ANIMATION_DURATION,
          props: {
            alpha: 0,
          },
          ease: Phaser.Math.Easing.Sine.Out,
        },
        { keepExistingTweens: true }
      ),
      tween(
        {
          // @ts-ignore
          targets: content,
          duration: BUBBLE_ANIMATION_DURATION,
          props: {
            alpha: 0,
          },
          ease: Phaser.Math.Easing.Sine.Out,
        },
        { keepExistingTweens: true }
      ),
    ]);

    phaserScene.events.off("postupdate", updateSpeechBubblePosition);
  };

  const createSpeechBubble = (config: BubbleConfig) => {
    const { scene: phaserScene } = scene;
    const bubblePadding = BUBBLE_PADDING;
    const bubbleWidth = config.width;
    const bubbleHeight = config.height;
    const arrowHeight = bubbleHeight / 4;

    bubblesCreated++;
    const bubble = phaserScene.add.graphics();

    //  Bubble shadow
    bubble.fillStyle(0x222222, 0.5);
    bubble.fillRoundedRect(6, 6, bubbleWidth, bubbleHeight, 16);

    //  Bubble color
    bubble.fillStyle(0xffffff, 1);

    //  Bubble outline line style
    bubble.lineStyle(4, 0x565656, 1);

    //  Bubble shape and outline
    bubble.strokeRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);
    bubble.fillRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);

    //  Calculate arrow coordinates
    const point1X = Math.floor((bubbleWidth / 7) * 5);
    const point1Y = bubbleHeight;
    const point2X = Math.floor((bubbleWidth / 7) * 6);
    const point2Y = bubbleHeight;
    const point3X = Math.floor((bubbleWidth / 7) * 5);
    const point3Y = Math.floor(bubbleHeight + arrowHeight);

    //  Bubble arrow shadow
    bubble.lineStyle(4, 0x222222, 0.5);
    bubble.lineBetween(point2X - 1, point2Y + 6, point3X + 2, point3Y);

    //  Bubble arrow fill
    bubble.fillTriangle(point1X, point1Y, point2X, point2Y, point3X, point3Y);
    bubble.lineStyle(2, 0x565656, 1);
    bubble.lineBetween(point2X, point2Y, point3X, point3Y);
    bubble.lineBetween(point1X, point1Y, point3X, point3Y);

    const content = phaserScene.add.text(0, 0, config.quote, {
      fontFamily: "Arial",
      // @ts-ignore
      fontSize: 200,
      color: "#000000",
      align: "center",
      wordWrap: { width: bubbleWidth - bubblePadding * 2 },
    });

    bubble.setDepth(RenderDepth.SPEECH);
    content.setDepth(RenderDepth.SPEECH);

    return { bubble, content };
  };

  const getTextureKey = () => `speech#${bubblesCreated}`;

  const setContentPosition = (
    content: Phaser.GameObjects.Text,
    bubblePosition: Coord,
    bubbleConfig: BubbleConfig
  ) => {
    const b = content.getBounds();
    content.setPosition(
      bubblePosition.x + bubbleConfig.width / 2 - b.width / 2,
      bubblePosition.y + bubbleConfig.height / 2 - b.height / 2
    );
  };

  return { displayChatBubbleForPieceSprite };
};

export default createSpeechBubbleManager;
