import { useContext, useEffect, useState } from "react";

import BRGame from "./br/BRGame";
import { GameContext } from "../context/GameContext";
import Lobby from "./lobby/Lobby";
import { NetworkContext } from "../context/NetworkContext";
import { Scenes } from "../game/constants";
import { defineComponentSystemUnsubscribable } from "../game/utils/defineComponentSystemUnsubscribable";

const GameManager = () => {
  const { network } = useContext(NetworkContext);
  const { game } = useContext(GameContext);
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
