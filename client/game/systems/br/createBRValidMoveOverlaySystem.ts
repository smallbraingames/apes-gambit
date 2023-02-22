import { BR, Game } from "../../types";
import {
  Has,
  defineEnterSystem,
  defineUpdateSystem,
  getComponentValueStrict,
} from "@latticexyz/recs";

import { Network } from "../../../network/types";
import { Subscription } from "rxjs";

const createBRValidMoveOverlaySystem = (
  network: Network,
  game: Game,
  br: BR
): Subscription[] => {
  const {
    godEntityIndex,
    components: { PiecePosition, PieceType },
  } = network;
  const {
    gameWorld,
    components: { BRRechargeTimerComponent },
  } = game;

  const toggleValidMoveOverlays = () => {
    const time = getComponentValueStrict(
      BRRechargeTimerComponent,
      godEntityIndex
    ).value;
    if (time === 0 && !br!.tileOverlayManager.hasValidMoveOverlays()) {
      br!.tileOverlayManager.setValidMoveOverlays();
    } else if (time > 0) {
      br!.tileOverlayManager.clearValidMoveOverlays();
      br!.rechargeOverlayManager.animateRechargeOverlay(time);
    }
  };

  defineEnterSystem(gameWorld, [Has(BRRechargeTimerComponent)], (update) => {
    toggleValidMoveOverlays();
  });

  defineUpdateSystem(gameWorld, [Has(BRRechargeTimerComponent)], (update) => {
    toggleValidMoveOverlays();
  });

  return [];
};

export default createBRValidMoveOverlaySystem;
