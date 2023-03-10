import { EntityIndex, getComponentValue } from "@latticexyz/recs";
import { Game, Lobby } from "../../../types";
import { TILE_HEIGHT, TILE_WIDTH } from "../../../constants";
import { createInput, tileCoordToPixelCoord } from "@latticexyz/phaserx";

import { Network } from "../../../../network/types";
import { Subscription } from "rxjs";
import { moveCameraOnDrag } from "../../../utils/cameraMouseMovement";
import tweenCamera from "../../../utils/animations/tweenCamera";

const createCameraSystem = (
  network: Network,
  game: Game,
  lobby: Lobby
): Subscription[] => {
  const {
    godEntityIndex,
    components: { PiecePosition },
  } = network;
  const {
    components: { ActivePiece },
    scenes: {
      Lobby: { scene, camera },
    },
  } = game;

  moveCameraOnDrag(game.scenes.Lobby);

  const input = createInput(scene.input);

  // Subscription to center game
  const centerSubscription = input.keyboard$.subscribe((key) => {
    if (key.keyCode === 67 && key.isDown) {
      const activePiece = getComponentValue(ActivePiece, godEntityIndex)?.value;
      if (!activePiece) return;
      const activePiecePosition = getComponentValue(
        PiecePosition,
        activePiece as EntityIndex
      );
      if (!activePiecePosition) {
        return;
      }
      const { x, y } = tileCoordToPixelCoord(
        activePiecePosition,
        TILE_WIDTH,
        TILE_HEIGHT
      );
      tweenCamera(camera, x, y, 1000);
    }
  });

  return [centerSubscription];
};

export default createCameraSystem;
