// Adapted from Dark Seas (https://github.com/0xhank/dark-seas/blob/main/packages/client/src/systems/phaser/camera/registerCameraControls.ts)

import { CAMERA_SCROLL_SPEED, EDGE_PIXEL_SIZE } from "../constants";
import {
  Subscription,
  fromEvent,
  interval,
  map,
  merge,
  scan,
  throttleTime,
} from "rxjs";

import { Camera } from "@latticexyz/phaserx";
import { filterNullish } from "@latticexyz/utils";

const moveCameraFromMouse = (camera: Camera) => {
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
  const sub = rawMouseMove$.subscribe((event) => {
    if (
      // @ts-ignore
      event.target?.nodeName === "BUTTON" ||
      // @ts-ignore
      event.target?.nodeName === "INPUT" ||
      // @ts-ignore

      event.target?.nodeName === "IMG"
    ) {
      console.log("not movings");
      return;
    }
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
  return sub;
};

export default moveCameraFromMouse;
