import { useContext, useEffect, useState } from "react";

import { EntityID } from "@latticexyz/recs";
import { Network } from "../../network/types";
import { NetworkContext } from "../../context/NetworkContext";
import { Game as PhaserGame } from "../../game/types";
import getBurnerWallet from "../../network/wallet/getBurnerWallet";
import getOwnedPieceEntityIndex from "../../game/utils/getOwnedPieceEntityIndex";
import joinGame from "../../game/utils/joinGame";

const CONTROL_COMPONENTS_ID = "controllers";

const Game = () => {
  const network = useContext(NetworkContext);
  const [game, setGame] = useState<PhaserGame | undefined>(undefined);

  const setupGame = async (network: Network) => {
    console.log("setting up game");
    const createGame = (await import("../../game/createGame")).createGame;
    const game: PhaserGame = await createGame(
      network,
      "0x944998273e477b495144fb8794c914197f3ccb46be2900f4698fd0ef743c9695" as EntityID
    );
    setGame(game);
    // Disable clickthroughs on components
    const controllers = document.getElementById(CONTROL_COMPONENTS_ID)!;
    for (const eventName of [
      "mouseup",
      "mousedown",
      "touchstart",
      "touchmove",
      "touchend",
      "touchcancel",
    ]) {
      controllers.addEventListener(eventName, (e) => e.stopPropagation());
    }
  };
  useEffect(() => {
    if (network.network) setupGame(network.network);
    return () => {
      if (game) game.disposePhaser();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [network.network]);

  const handleJoinGame = (e: any) => {
    const pieceEntity = getOwnedPieceEntityIndex(
      getBurnerWallet().address,
      network.network!.components.Owner,
      network.network!.world
    );
    joinGame(pieceEntity, game!.gameEntity!, network.network!);
  };

  return (
    <>
      <div id={CONTROL_COMPONENTS_ID}>
        <div className="absolute bg-green-200 p-4">
          <button onClick={handleJoinGame}>Join Game</button>
        </div>
      </div>
    </>
  );
};

export default Game;
