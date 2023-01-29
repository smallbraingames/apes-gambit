import {
  CONTROLLER_COMPONENT_CLASS_NAME,
  disableClickthroughs,
} from "../utils/disableControllers";
import { useContext, useEffect } from "react";

import Image from "next/image";
import { LoadingContext } from "../context/LoadingContext";

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

  useEffect(() => {
    disableClickthroughs();
  }, []);

  if (loadingState === LoadingState.IN_GAME) {
    return <></>;
  }

  return (
    <div className={CONTROLLER_COMPONENT_CLASS_NAME}>
      <div className="bg-green-100 h-full w-full fixed flex items-start justify-center lg:pt-24">
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
          <div className="flex flex-col items-center mt-8">
            <div className="flex items-center gap-2">
              {loadingState === LoadingState.GAME_LOADED ? (
                <button
                  className="w-48 h-16 text-center bg-green-700 text-stone-100 rounded-lg border-b-4 border-r-2 border-green-900 text-xl active:border-b-0 active:border-r-0 active:translate-y-0.5"
                  onClick={() => setLoadingState(LoadingState.IN_GAME)}
                >
                  PLAY
                </button>
              ) : (
                <div className="w-48 h-16 text-center flex justify-center items-center text-stone-100 bg-stone-800 opacity-50 rounded-lg border-stone-900">
                  {" "}
                  Loading...{" "}
                </div>
              )}
              <div
                className={
                  loadingState === LoadingState.GAME_LOADING
                    ? "animate-spin"
                    : "animate-bounce"
                }
              >
                <Image
                  src={
                    loadingState === LoadingState.GAME_LOADING
                      ? "/assets/sprites/main/attack/pawn.svg"
                      : "/assets/sprites/main/attack/queen.svg"
                  }
                  width="80"
                  height="80"
                  alt="Angry"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Title;
