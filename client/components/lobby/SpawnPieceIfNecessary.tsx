import { LoadingContext, LoadingState } from "../../context/LoadingContext";
import { useContext, useEffect } from "react";

import { GameContext } from "../../context/GameContext";
import { NetworkContext } from "../../context/NetworkContext";
import { getComponentValue } from "@latticexyz/recs";

const ACTIVE_PIECE_SEARCH_PERIOD = 1000;

const SpawnPieceIfNecessary = () => {
  const { network } = useContext(NetworkContext);
  const { game, activePiece } = useContext(GameContext);

  useEffect(() => {
    if (game) {
      setTimeout(() => {
        const activePiece = getComponentValue(
          game.components.ActivePiece,
          network!.godEntityIndex
        );
        if (!activePiece) {
          spawnPiece();
        }
      }, ACTIVE_PIECE_SEARCH_PERIOD);
    }
  }, [game]);

  const spawnPiece = () => {
    if (activePiece) {
      console.warn(
        `Not spawing piece since active piece with entity index ${activePiece}`
      );
      return;
    }
    console.log("Spawning new piece");
    network?.api.spawnPiece();
  };

  return <div></div>;
};

export default SpawnPieceIfNecessary;
