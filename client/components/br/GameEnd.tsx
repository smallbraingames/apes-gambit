import {
  CONTROLLER_COMPONENT_CLASS_NAME,
  disableClickthroughs,
} from "../../utils/disableControllers";
import { useContext, useEffect, useState } from "react";

import { GameContext } from "../../context/GameContext";
import { GameStatus } from "../../game/types";
import { NetworkContext } from "../../context/NetworkContext";
import { Subscription } from "rxjs";
import { defineComponentSystemUnsubscribable } from "../../game/utils/defineComponentSystemUnsubscribable";
import { getEntityIndexFromEntity } from "../../game/utils/resolveEntity";
import revokeGameControllersIfNecessary from "../../game/utils/setup/revokeGameControllersIfNecessary";

const GameEnd = () => {
  const { network } = useContext(NetworkContext);
  const { game, gameEntity, activePiece } = useContext(GameContext);

  const [gameStatus, setGameStatus] = useState(GameStatus.NOT_STARTED);

  useEffect(() => {
    disableClickthroughs();
  }, []);

  useEffect(() => {
    let gameStatusSub: Subscription;
    if (network && game && gameEntity) {
      const {
        world,
        components: { BRGame },
      } = network;
      gameStatusSub = defineComponentSystemUnsubscribable(
        world,
        BRGame,
        (update) => {
          const game = update.value[0];
          if (
            update.entity === getEntityIndexFromEntity(gameEntity, world) &&
            game
          ) {
            setGameStatus(game.status);
          }
        }
      );
    }
    return () => {
      if (gameStatusSub) {
        gameStatusSub.unsubscribe();
      }
    };
  }, [network, game, gameEntity]);

  if (gameStatus !== GameStatus.OVER) {
    return <></>;
  }

  const leaveGame = () => {
    if (network && activePiece) {
      revokeGameControllersIfNecessary(network, activePiece);
    }
  };

  return (
    <div className={CONTROLLER_COMPONENT_CLASS_NAME}>
      <div className="h-full w-full fixed flex items-center justify-center bg-yellow-900 bg-opacity-60">
        <div className="container p-4 flex flex-col items-center w-48 h-32 ">
          <div>
            <h1 className="font-bold text-lg mb-2">Game Over</h1>
          </div>
          <div className="button p-2" onClick={leaveGame}>
            Back to Lobby
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameEnd;
