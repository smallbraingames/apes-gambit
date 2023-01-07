import { useContext, useEffect, useState } from "react";

import { EntityID } from "@latticexyz/recs";
import JoinGame from "./JoinGame";
import { Network } from "../../network/types";
import { NetworkContext } from "../../context/NetworkContext";
import { Game as PhaserGame } from "../../game/types";
import SpawnPiece from "./SpawnPiece";

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

const Game = () => {
  const network = useContext(NetworkContext);
  const [game, setGame] = useState<PhaserGame | undefined>(undefined);

  const setupGame = async (network: Network) => {
    const createGame = (await import("../../game/createGame")).createGame;
    const params = new URLSearchParams(window.location.search);
    const game: PhaserGame = await createGame(
      network,
      params.get("gameEntity") as EntityID | undefined
    );
    setGame(game);
  };

  useEffect(() => {
    if (network.network) setupGame(network.network);
    return () => {
      if (game) game.disposePhaser();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [network.network]);

  return (
    <>
      {game && (
        <>
          <SpawnPiece />
          <JoinGame game={game} />
        </>
      )}
    </>
  );
};

export default Game;
