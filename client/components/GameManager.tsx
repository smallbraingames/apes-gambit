import { useContext, useEffect, useState } from "react";

import BRGame from "./br/BRGame";
import { GameContext } from "../context/GameContext";
import Lobby from "./lobby/Lobby";
import { NetworkContext } from "../context/NetworkContext";
import { Scenes } from "../game/constants";
import { defineComponentSystemUnsubscribable } from "../game/utils/defineComponentSystemUnsubscribable";
import revokeGameControllersIfNecessary from "../game/utils/setup/revokeGameControllersIfNecessary";

const GameManager = () => {
  const { network } = useContext(NetworkContext);
  const { game, activePiece } = useContext(GameContext);
  const [gameState, setGameState] = useState(Scenes.Lobby);

  useEffect(() => {
    if (!game || !network) {
      return;
    }
    const gameStateSub = defineComponentSystemUnsubscribable(
      game.gameWorld,
      game.components.ActiveScene,
      (update) => {
        const state = update.value[0]?.value;
        if (state) {
          setGameState(state as Scenes);
        }
      }
    );

    return () => {
      gameStateSub.unsubscribe();
    };
  }, [game, network]);

  useEffect(() => {
    // Cleanup extra controllers whenever state changes
    if (network && activePiece) {
      revokeGameControllersIfNecessary(network, activePiece);
    }
  }, [network, activePiece]);

  if (!game || !network) {
    return <div></div>;
  }

  let Main;
  if (gameState === Scenes.BR) {
    Main = <BRGame />;
  } else {
    Main = <Lobby />;
  }

  return <div>{Main}</div>;
};

export default GameManager;
