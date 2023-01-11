export const CONTROLLER_COMPONENT_CLASS_NAME = "controller";

// Disable clickthroughs on components to allow react components to overlay on Phaser
export const disableClickthroughs = () => {
  const controllers = document.getElementsByClassName(
    CONTROLLER_COMPONENT_CLASS_NAME
  )!;
  for (const eventName of [
    "mouseup",
    "mousedown",
    "touchstart",
    "touchmove",
    "touchend",
    "touchcancel",
  ]) {
    for (const controller of controllers) {
      controller.addEventListener(eventName, (e) => e.stopPropagation());
    }
  }
};
