import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { GameContext } from "./GameContext";
import { NetworkContext } from "./NetworkContext";

export enum LoadingState {
  // Loading game and network
  GAME_LOADING,
  // Loaded game, awaiting player to enter
  GAME_LOADED,
  // Player in game, do not display overlay
  IN_GAME,
}

interface LoadingContextInterface {
  loadingState: LoadingState;
  setLoadingState: Dispatch<SetStateAction<LoadingState>>;
}

export const LoadingContext = createContext<LoadingContextInterface>({
  loadingState: LoadingState.GAME_LOADING,
  setLoadingState: () => {},
});

const LoadingProvider = (props: { children: ReactNode }) => {
  const network = useContext(NetworkContext);
  const game = useContext(GameContext);
  const [loadingState, setLoadingState] = useState(LoadingState.GAME_LOADED);

  useEffect(() => {
    if (network.network !== undefined && game.game !== undefined) {
      setLoadingState(LoadingState.GAME_LOADED);
    } else {
      setLoadingState(LoadingState.GAME_LOADING);
    }
  }, [network.network, game.game]);

  if (loadingState === LoadingState.IN_GAME) {
    return null;
  }

  return (
    <LoadingContext.Provider value={{ loadingState, setLoadingState }}>
      {props.children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
