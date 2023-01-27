import { useContext, useEffect, useState } from "react";

import { GameContext } from "../../context/GameContext";
import { NetworkContext } from "../../context/NetworkContext";
import { getComponentValueStrict } from "@latticexyz/recs";
import { getEntityIndexFromEntity } from "../../game/utils/resolveEntity";
import { useComponentValue } from "@latticexyz/react";

const RechargeTimer = () => {
  const networkContext = useContext(NetworkContext);
  const game = useContext(GameContext);
  const {
    components: { BRPreviousMoveTimestamp, BRGame },
    network: { clock },
    world,
  } = networkContext.network!;
  const activePiece = game.activePiece!;
  const previousMoveTimestamp = useComponentValue(
    BRPreviousMoveTimestamp,
    activePiece
  );

  const [rechargeTime, setRechargeTime] = useState(0);

  useEffect(() => {
    const gameConfig = getComponentValueStrict(
      BRGame,
      getEntityIndexFromEntity(game.game!.gameEntity!, world)
    );
    const rechargeSubscription = clock.time$.subscribe((update) => {
      if (previousMoveTimestamp) {
        console.log(
          parseInt(gameConfig.rechargeTime.toString()) -
            (Math.floor(update / 1000) - previousMoveTimestamp.value),
          previousMoveTimestamp.value,
          update
        );
        setRechargeTime(
          Math.max(
            gameConfig.rechargeTime -
              (Math.floor(update / 1000) - previousMoveTimestamp.value),
            0
          )
        );
      }
    });
    return () => {
      rechargeSubscription.unsubscribe();
    };
  }, [previousMoveTimestamp]);

  return (
    <div className="bg-purple-200 p-5">
      <div>recharge time: {rechargeTime}</div>
    </div>
  );
};

export default RechargeTimer;
