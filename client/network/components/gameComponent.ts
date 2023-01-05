import { Type, World, defineComponent } from "@latticexyz/recs";

export function defineGameComponent(world: World) {
  return defineComponent(
    world,
    {
      startTime: Type.Number,
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
