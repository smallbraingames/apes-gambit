import { EntityID, EntityIndex } from "@latticexyz/recs";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { Game } from "../game/types";
import { Network } from "../network/types";
import { NetworkContext } from "./NetworkContext";
import { Game as PhaserGame } from "../game/types";
import getBurnerWallet from "../network/wallet/getBurnerWallet";
import getOwnedPieceEntityIndex from "../game/utils/getOwnedPieceEntityIndex";

interface GameContextInterface {
  game?: Game;
  activePiece: EntityIndex | undefined;
}

export const GameContext = createContext<GameContextInterface>({
  game: undefined,
  activePiece: undefined,
});

const GameProvider = (props: { children: ReactNode }) => {
  const network = useContext(NetworkContext);
  const [game, setGame] = useState<PhaserGame | undefined>(undefined);
  const [activePiece, setActivePiece] = useState<EntityIndex | undefined>(
    undefined
  );

  const setupGame = async (network: Network) => {
    const createGame = (await import("../game/createGame")).createGame;
    const params = new URLSearchParams(window.location.search);
    const game: PhaserGame = await createGame(
      network,
      params.get("gameEntity") as EntityID | undefined
    );
    setGame(game);
  };

  useEffect(() => {
    if (network.network) setupGame(network.network);
    return () => {
      if (game) game.disposePhaser();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [network.network]);

  useEffect(() => {
    if (!network.network) return;
    setActivePiece(
      getOwnedPieceEntityIndex(
        getBurnerWallet().address,
        network.network?.components.Owner,
        network.network?.world
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game]);

  return (
    <GameContext.Provider value={{ game, activePiece }}>
      {props.children}
    </GameContext.Provider>
  );
};

export default GameProvider;
