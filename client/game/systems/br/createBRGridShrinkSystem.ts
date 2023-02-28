import { BR, Game } from "../../types";
import { Has, HasValue, runQuery } from "@latticexyz/recs";

import { Coord } from "@latticexyz/utils";
import { Network } from "../../../network/types";
import { Subscription } from "rxjs";
import { defineComponentSystemUnsubscribable } from "../../utils/defineComponentSystemUnsubscribable";
import overlayShrinkingGridBoundary from "../../utils/tilemap/overlayShrinkingGridBoundary";

const createBRGridShrinkSystem = (
  network: Network,
  game: Game,
  br: BR
): Subscription[] => {
  const {
    godEntityIndex,
    components: { PiecePosition },
  } = network;
  const {
    gameWorld,
    scenes: { BR },
    components: { BRGridDimComponent },
  } = game;

  const { pieceSpriteManager, IN_GAME_CONSTRAINTS } = br!;

  const cleanupTile = (tileCoord: Coord) => {
    const piecesAtPosition = runQuery([
      ...IN_GAME_CONSTRAINTS,
      HasValue(PiecePosition, { x: tileCoord.x, y: tileCoord.y }),
    ]);
    if (piecesAtPosition.size > 0) {
      const piece = [...piecesAtPosition][0];
      pieceSpriteManager.animateRemovePiece(piece);
    }
  };

  const subscription = defineComponentSystemUnsubscribable(
    gameWorld,
    BRGridDimComponent,
    (update) => {
      const gridDim = update.value[0]?.value;
      if (gridDim === undefined) {
        return;
      }
      overlayShrinkingGridBoundary(BR, godEntityIndex, gridDim, cleanupTile);
    },
    { runOnInit: true }
  );

  return [subscription];
};

export default createBRGridShrinkSystem;
