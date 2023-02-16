import { EntityID, EntityIndex, getComponentValue } from "@latticexyz/recs";
import { useContext, useEffect, useState } from "react";

import { GameConfig } from "../../game/types";
import { Network } from "../../network/types";
import { SwitchGameState } from "../GameManager";
import { getEntityIndexFromEntity } from "../../game/utils/resolveEntity";
import joinMainGame from "../../game/utils/setup/joinMainGame";

enum GameIndicatatorState {
  LOADING,
  IN_GAME,
  NOT_IN_GAME,
  NO_GAME,
}

const BRGameIndicator = (props: {
  network: Network;
  activePiece: EntityIndex;
  gameEntity?: EntityID;
  switchFromLobbyToBR: SwitchGameState;
}) => {
  const [gameIndicatorState, setGameIndicatorState] = useState(
    GameIndicatatorState.NO_GAME
  );
  const [game, setGame] = useState<GameConfig | undefined>(undefined);
  const {
    world,
    components: { BRGame },
  } = props.network;

  useEffect(() => {
    if (props.gameEntity) {
      const gameEntityIndex = getEntityIndexFromEntity(props.gameEntity, world);
      const gameConfig = getComponentValue(BRGame, gameEntityIndex);
      if (!gameConfig) {
        console.error(
          `Data for game with ID ${props.gameEntity} could not be found`
        );
        setGameIndicatorState(GameIndicatatorState.NO_GAME);
        return;
      }
      setGame(gameConfig);
      setGameIndicatorState(GameIndicatatorState.NOT_IN_GAME);
      return;
    }
    setGameIndicatorState(GameIndicatatorState.NO_GAME);
  }, [props.gameEntity]);

  const handleJoinGame = async () => {
    const previousGameIndicatorState = gameIndicatorState;
    if (props.gameEntity) {
      setGameIndicatorState(GameIndicatatorState.LOADING);
      try {
        await joinMainGame(props.network, props.gameEntity, props.activePiece);
        props.switchFromLobbyToBR();
      } catch (e) {
        console.error("Failed to join game", e);
        setGameIndicatorState(previousGameIndicatorState);
      }
      setGameIndicatorState(GameIndicatatorState.IN_GAME);
    }
  };

  let content: JSX.Element;

  if (gameIndicatorState === GameIndicatatorState.LOADING) {
    content = <div>Loading...</div>;
  } else if (gameIndicatorState === GameIndicatatorState.IN_GAME) {
    content = (
      <div>
        <div onClick={handleJoinGame}>You are already in a game!</div>
        <button onClick={handleJoinGame}>Join Game {props.gameEntity}</button>
      </div>
    );
  } else if (gameIndicatorState === GameIndicatatorState.NOT_IN_GAME) {
    content = (
      <div>
        {/* @ts-ignore */}
        <button onClick={handleJoinGame}>Join Game {props.gameEntity}</button>
        {/* <GameCountdown endTime={parseInt(game.startTime)} /> */}
      </div>
    );
  } else {
    content = <div>No game found</div>;
  }

  return (
    <div className="bg-yellow-50 text-yellow-900 border-r-2 border-b-4 border-yellow-900 rounded-lg px-2 py-2">
      {content}
    </div>
  );
};

export default BRGameIndicator;
