import { EntityIndex, getComponentValue } from "@latticexyz/recs";

import { Game } from "../types";

const isActivePiece = (
  game: Game,
  godEntityIndex: EntityIndex,
  piece: EntityIndex
) => {
  const {
    components: { ActivePiece },
  } = game;
  const activePiece = getComponentValue(ActivePiece, godEntityIndex);
  return piece === activePiece?.value;
};

export default isActivePiece;
