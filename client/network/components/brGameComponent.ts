import { Type, World, defineComponent } from "@latticexyz/recs";

export function defineBRGameComponent(world: World) {
  return defineComponent(
    world,
    {
      startTime: Type.Number,
      rechargeTime: Type.Number,
      initialGridDim: Type.Number,
      secondsPerGridShrink: Type.Number,
      status: Type.Number,
    },
    {
      id: "BRGame",
      metadata: {
        contractId: "component.BRGame",
      },
    }
  );
}
