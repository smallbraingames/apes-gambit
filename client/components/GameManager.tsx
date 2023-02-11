import { useContext, useEffect, useState } from "react";

import BRGame from "./br/BRGame";
import { GameContext } from "../context/GameContext";
import Lobby from "./lobby/Lobby";
import { NetworkContext } from "../context/NetworkContext";
import { Scenes } from "../game/constants";
import revokeGameControllersIfNecessary from "../game/utils/setup/revokeGameControllersIfNecessary";

enum GameState {
  LOADING = "Loading",
  LOBBY = "Lobby",
  BR = "Br",
}

export type SwitchGameState = () => void;

const GameManager = () => {
  const { network } = useContext(NetworkContext);
  const { game, activePiece } = useContext(GameContext);
  const [gameState, setGameState] = useState<GameState>(GameState.LOBBY);

  useEffect(() => {
    // Cleanup extra controllers whenever state changes
    if (network && activePiece) {
      revokeGameControllersIfNecessary(network, activePiece);
    }
  }, [gameState, network, activePiece]);

  const switchFromLobbyToBR = () => {
    if (!game) {
      console.warn("Cannot switch game state before game is loaded");
      return;
    }
    const { game: phaserGame } = game;
    phaserGame.scene.switch(Scenes.Lobby, Scenes.BR);
    setGameState(GameState.BR);
  };

  const switchFromBRToLobby = () => {
    if (!game) {
      console.warn("Cannot switch game state before game is loaded");
      return;
    }
    const { game: phaserGame } = game;
    phaserGame.scene.switch(Scenes.BR, Scenes.Lobby);
    setGameState(GameState.LOBBY);
  };

  let Main;
  if (gameState === GameState.BR) {
    Main = <BRGame />;
  } else if (gameState === GameState.LOADING) {
    Main = <div>Loading...</div>;
  } else {
    Main = <Lobby switchFromLobbyToBR={switchFromLobbyToBR} />;
  }

  return <div>{Main}</div>;
};

export default GameManager;
