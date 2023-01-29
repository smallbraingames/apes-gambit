import {
  CONTROLLER_COMPONENT_CLASS_NAME,
  disableClickthroughs,
} from "../utils/disableControllers";
import { useContext, useEffect, useState } from "react";

import { GameContext } from "../context/GameContext";
import Image from "next/image";
import { LoadingContext } from "../context/LoadingContext";
import { NetworkContext } from "../context/NetworkContext";

enum LoadingState {
  // Loading game and network
  GAME_LOADING,
  // Loaded game, awaiting player to enter
  GAME_LOADED,
  // Player in game, do not display overlay
  IN_GAME,
}

const Title = () => {
  const { loadingState, setLoadingState } = useContext(LoadingContext);
  const { network } = useContext(NetworkContext);
  const { setupGame, game } = useContext(GameContext);

  useEffect(() => {
    if (network && !game) setupGame(network);
  }, [network, game]);

  useEffect(() => {
    disableClickthroughs();
  }, []);

  if (loadingState === LoadingState.IN_GAME) {
    return <></>;
  }

  return (
    <div className={CONTROLLER_COMPONENT_CLASS_NAME}>
      <div className="bg-stone-900 h-full w-full fixed flex items-start justify-center">
        <div className="flex flex-col justify-center rounded-xl w-full max-w-2xl p-8">
          <div className="flex flex-wrap justify-center">
            <Image
              src="/img-ag-logo.png"
              width="560"
              height="300"
              alt="Ape's Gambit"
            />
            {/* <div className="transform -translate-y-12">
            <Image
              src="/img-ag-logo--pieces.png"
              width="360"
              height="200"
              alt="Ape Frens"
            />
          </div> */}
          </div>
          <div className="flex flex-col items-center">
            <button
              className="btn btn-primary"
              onClick={() => setLoadingState(LoadingState.IN_GAME)}
            >
              Play
            </button>
            <button className="btn btn-secondary">Help</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Title;
