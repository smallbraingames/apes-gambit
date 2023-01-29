import { Camera, tween } from "@latticexyz/phaserx";

const tweenCamera = async (
  camera: Camera,
  x: number,
  y: number,
  duration: number
) => {
  return tween({
    // @ts-ignore
    targets: camera.phaserCamera,
    props: {
      scrollX: x,
      scrollY: y,
    },
    duration,
    ease: "Sine.easeInOut",
  });
};

export default tweenCamera;
