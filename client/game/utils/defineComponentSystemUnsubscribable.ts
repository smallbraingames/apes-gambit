import {
  Component,
  ComponentUpdate,
  Schema,
  World,
  getComponentEntities,
  toUpdateStream,
} from "@latticexyz/recs";
import { EMPTY, Observable, Subscription, concat, from } from "rxjs";

function defineRxSystemUnsubscribable<T>(
  world: World,
  observable$: Observable<T>,
  system: (event: T) => void
): Subscription {
  const subscription = observable$.subscribe(system);
  return subscription;
}

export function defineComponentSystemUnsubscribable<S extends Schema>(
  world: World,
  component: Component<S>,
  system: (update: ComponentUpdate<S>) => void,
  options: { runOnInit?: boolean } = { runOnInit: true }
): Subscription {
  const initial$ = options?.runOnInit
    ? from(getComponentEntities(component)).pipe(toUpdateStream(component))
    : EMPTY;
  return defineRxSystemUnsubscribable(
    world,
    concat(initial$, component.update$),
    system
  );
}
