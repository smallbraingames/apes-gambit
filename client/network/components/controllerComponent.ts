import { Type, World, defineComponent } from "@latticexyz/recs";

export function defineControllerComponent(world: World) {
  return defineComponent(
    world,
    {
      value: Type.NumberArray,
    },
    {
      id: "Controller",
      metadata: {
        contractId: "component.Controller",
      },
    }
  );
}
