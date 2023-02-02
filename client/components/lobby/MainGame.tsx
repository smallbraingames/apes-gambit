import {
  ComponentValue,
  EntityIndex,
  Type,
  getComponentValueStrict,
} from "@latticexyz/recs";
import { useEffect, useState } from "react";

import { Duration } from "luxon";
import { Network } from "../../network/types";
import Router from "next/router";
import { getEntityIndexFromEntity } from "../../game/utils/resolveEntity";
import { useComponentValue } from "@latticexyz/react";

const COUNTDOWN_INTERVAL = 1000;

const GameCountdown = (props: { endTime: number }) => {
  const [time, setTime] = useState("-");

  useEffect(() => {
    const interval = setInterval(() => {
      const difference = props.endTime * 1000 - Date.now();
      if (difference < 0) {
        return;
      }
      setTime(Duration.fromMillis(difference).toFormat("hh mm ss"));
    }, COUNTDOWN_INTERVAL);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return <p>Game starts in {time}</p>;
};

const MainGame = (props: { network: Network; activePiece: EntityIndex }) => {
  const gameEntity = useComponentValue(
    props.network.components.BRInGame,
    props.activePiece
  );
  let game:
    | ComponentValue<
        {
          startTime: Type.Number;
          rechargeTime: Type.Number;
          status: Type.Number;
        },
        undefined
      >
    | undefined = undefined;

  if (gameEntity) {
    game = getComponentValueStrict(
      props.network.components.BRGame,
      getEntityIndexFromEntity(
        // @ts-ignore
        gameEntity.value as EntityID,
        props.network.world
      )
    );
  }

  if (!game) {
    return (
      <div className="bg-yellow-50 text-yellow-900 border-r-2 border-b-4 border-yellow-400  rounded-lg px-2 py-1">
        <p>Not in game</p>
      </div>
    );
  }

  return (
    <div className="bg-yellow-50 text-yellow-900 border-r-2 border-b-4 border-yellow-400  rounded-lg px-2 py-1">
      {/* @ts-ignore */}
      <GameCountdown endTime={parseInt(game.startTime)} />
    </div>
  );
};

export default MainGame;
