import { BR, Game } from "../../../types";
import {
  CAMERA_SCROLL_SPEED,
  EDGE_PIXEL_SIZE,
  TILE_HEIGHT,
  TILE_WIDTH,
} from "../../../constants";
import { EntityIndex, getComponentValue } from "@latticexyz/recs";
import {
  Subscription,
  fromEvent,
  interval,
  map,
  merge,
  scan,
  throttleTime,
} from "rxjs";
import { createInput, tileCoordToPixelCoord } from "@latticexyz/phaserx";

import { Network } from "../../../../network/types";
import { filterNullish } from "@latticexyz/utils";
import tweenCamera from "../../../utils/animations/tweenCamera";

const createBRCameraSystem = (
  network: Network,
  game: Game,
  BR: BR
): Subscription[] => {
  const {
    godEntityIndex,
    components: { PiecePosition },
  } = network;
  const {
    components: { ActivePiece },
    scenes: {
      BR: { scene, camera },
    },
  } = game;

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

  // Adapted from Dark Seas (https://github.com/0xhank/dark-seas/blob/main/packages/client/src/systems/phaser/camera/registerCameraControls.ts)
  const getCameraMovementFromPointerPosition = (event: MouseEvent) => {
    const cameraMovement = { x: 0, y: 0 };
    if (event.clientX < EDGE_PIXEL_SIZE) cameraMovement.x = -1;
    if (event.clientY < EDGE_PIXEL_SIZE) cameraMovement.y = -1;
    if (event.clientX > window.innerWidth - EDGE_PIXEL_SIZE)
      cameraMovement.x = 1;
    if (event.clientY > window.innerHeight - EDGE_PIXEL_SIZE)
      cameraMovement.y = 1;

    return new Phaser.Math.Vector2(cameraMovement).normalize();
  };

  const rawMouseMove$ = fromEvent<MouseEvent>(document, "mousemove");
  const screenEdgeCameraMovement$ = merge(interval(2), rawMouseMove$).pipe(
    throttleTime(2),
    scan<number | MouseEvent, MouseEvent | undefined>((acc, event) => {
      if (typeof event == "number") return acc;

      return event;
    }, undefined),
    map((event) => {
      if (!event) return undefined;

      return getCameraMovementFromPointerPosition(event);
    }),
    filterNullish()
  );

  let screenEdgeCameraMoveSub: Subscription | undefined;
  rawMouseMove$.subscribe((event) => {
    const movement = getCameraMovementFromPointerPosition(event as MouseEvent);
    if (movement.length() > 0) {
      if (screenEdgeCameraMoveSub !== undefined) return;

      screenEdgeCameraMoveSub = screenEdgeCameraMovement$.subscribe(
        (cameraMovement) => {
          camera.setScroll(
            camera.phaserCamera.scrollX +
              cameraMovement.x * CAMERA_SCROLL_SPEED,
            camera.phaserCamera.scrollY + cameraMovement.y * CAMERA_SCROLL_SPEED
          );
        }
      );
    } else if (screenEdgeCameraMoveSub !== undefined) {
      screenEdgeCameraMoveSub?.unsubscribe();
      screenEdgeCameraMoveSub = undefined;
    }
  });

  return [centerSubscription];
};

export default createBRCameraSystem;
