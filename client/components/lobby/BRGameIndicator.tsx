import { EntityID, EntityIndex, getComponentValue } from "@latticexyz/recs";
import { GameConfig, GameStatus } from "../../game/types";
import { useEffect, useState } from "react";

import Image from "next/image";
import { Network } from "../../network/types";
import getCountdown from "../../utils/getCountdown";
import { getEntityIndexFromEntity } from "../../game/utils/resolveEntity";
import { useComponentValue } from "@latticexyz/react";

const TIME_UPDATE_INTERVAL = 1000;

const BRCountdown = (props: { startTime: number }) => {
  const [countdown, setCountdown] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdown(props.startTime));
    }, TIME_UPDATE_INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      Battle Royale starts in{" "}
      <span className="font-bold font-mono">{countdown}</span>
    </div>
  );
};

const BRGameIndicator = (props: {
  network: Network;
  activePiece: EntityIndex;
  gameEntity?: EntityID;
}) => {
  const {
    world,
    components: { BRGame, BRInGame },
  } = props.network;

  let content = <div />;
  if (props.gameEntity === undefined) {
    content = <div className="container">No Batt</div>;
  }

  const game = useComponentValue(
    BRGame,
    getEntityIndexFromEntity(props.gameEntity!, world)
  );

  const inGame = useComponentValue(BRInGame, props.activePiece);

  if (!game || game.status === GameStatus.OVER) {
    content = (
      <div className="flex items-center gap-3 mr-1">
        <div>
          <Image
            src={"/assets/sprites/temple-full.png"}
            width="40"
            height="40"
            alt="Battle Royale Entrance"
          />
        </div>
        <div>
          <p> No Battle Royale games found </p>
        </div>
      </div>
    );
  } else if (game.status === GameStatus.IN_PROGRESS) {
    const isInGame =
      inGame?.value.toString().toLowerCase() ===
      props.gameEntity?.toString().toLowerCase();
    content = (
      <div className="flex items-center gap-3 mr-1">
        <div>
          <Image
            src={"/assets/sprites/temple-full.png"}
            width="40"
            height="40"
            alt="Battle Royale Entrance"
          />
        </div>
        <div>
          <p> Battle Royale in progress </p>
          <div className="opacity-90 text-sm">
            {" "}
            {isInGame
              ? "You are in this game, click the entrance to join"
              : "You are not in this game"}
          </div>
        </div>
      </div>
    );
  } else if (game.status === GameStatus.NOT_STARTED) {
    content = (
      <div className="flex items-center gap-3 mr-1">
        <div>
          <Image
            src={"/assets/sprites/temple-full.png"}
            width="40"
            height="40"
            alt="Battle Royale Entrance"
          />
        </div>
        <div>
          <div>
            <BRCountdown startTime={game.startTime} />
          </div>
          <div className="opacity-90 text-sm">Enter the temple to join</div>
        </div>
      </div>
    );
  }

  return <div className="container w-fit p-4">{content}</div>;
};

export default BRGameIndicator;
