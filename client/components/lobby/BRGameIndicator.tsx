import { EntityID, EntityIndex, setComponent } from "@latticexyz/recs";
import { useContext, useEffect, useState } from "react";

import BRGameCountdown from "../BRGameCountdown";
import { GameContext } from "../../context/GameContext";
import { GameStatus } from "../../game/types";
import Image from "next/image";
import { Network } from "../../network/types";
import { Scenes } from "../../game/constants";
import { getEntityIndexFromEntity } from "../../game/utils/resolveEntity";
import joinMainGame from "../../game/utils/setup/joinMainGame";
import { useComponentValue } from "@latticexyz/react";

const JOIN_BUFFER_TIME = 10;

enum JoiningGameState {
  NOT_JOINING,
  JOINING,
  JOINED,
}

const Loading = () => (
  <div role="status">
    <svg
      aria-hidden="true"
      className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-900"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
    <span className="sr-only">Loading...</span>
  </div>
);

const BRGameIndicator = (props: {
  network: Network;
  activePiece: EntityIndex;
  gameEntity?: EntityID;
}) => {
  const {
    world,
    components: { BRGame, BRInGame },
  } = props.network;

  const { game } = useContext(GameContext);

  const [joiningGame, setJoiningGame] = useState<JoiningGameState>(
    JoiningGameState.NOT_JOINING
  );

  let content = <div />;
  if (props.gameEntity === undefined) {
    content = <div className="container">No Battle Royale Game Found</div>;
  }

  const brGame = useComponentValue(
    BRGame,
    getEntityIndexFromEntity(props.gameEntity!, world)
  );

  useEffect(() => {
    let joinGameTimeout: NodeJS.Timeout | undefined;
    if (!brGame || !props.gameEntity) {
      return;
    }
    const timeout = Math.max(
      brGame.startTime! - Date.now() / 1000 - JOIN_BUFFER_TIME,
      0
    );
    joinGameTimeout = setTimeout(async () => {
      setJoiningGame(JoiningGameState.JOINING);
      await joinMainGame(props.network, props.gameEntity!, props.activePiece);
      setJoiningGame(JoiningGameState.JOINED);
      setComponent(game!.components.ActiveScene, props.network.godEntityIndex, {
        value: Scenes.BR,
      });
    }, timeout * 1000);
    () => {
      if (joinGameTimeout) {
        clearTimeout(joinGameTimeout);
      }
    };
  }, [brGame]);

  const inGame = useComponentValue(BRInGame, props.activePiece);

  if (!brGame || brGame.status === GameStatus.OVER) {
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
  } else if (brGame.status === GameStatus.IN_PROGRESS) {
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
  } else if (brGame.status === GameStatus.NOT_STARTED) {
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
            <BRGameCountdown startTime={brGame.startTime} />
          </div>
          {joiningGame === JoiningGameState.JOINING && (
            <div className="flex gap-2">
              {" "}
              <Loading />
              <div>Joining Game</div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return <div className="container w-fit p-4">{content}</div>;
};

export default BRGameIndicator;
