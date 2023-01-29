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
import { defineComponentSystemUnsubscribable } from "../game/utils/defineComponentSystemUnsubscribable";

interface GameContextInterface {
  game?: Game;
  activePiece: EntityIndex | undefined;
}

export const GameContext = createContext<GameContextInterface>({
  game: undefined,
  activePiece: undefined,
});

const GameProvider = (props: {
  brGameEntity: EntityID | undefined;
  children: ReactNode;
}) => {
  const network = useContext(NetworkContext);
  const [game, setGame] = useState<PhaserGame | undefined>(undefined);
  const [activePiece, setActivePiece] = useState<EntityIndex | undefined>(
    undefined
  );

  const setupGame = async (network: Network) => {
    const createGame = (await import("../game/createGame")).createGame;
    const game: PhaserGame = await createGame(network, props.brGameEntity);
    setGame(game);
  };

  useEffect(() => {
    if (network.network) setupGame(network.network);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [network.network]);

  useEffect(() => {
    if (!network.network) return;
    if (game) {
      defineComponentSystemUnsubscribable(
        game.gameWorld,
        game.components.ActivePiece,
        (update) => {
          const activePiece = update.value[0]?.value as EntityIndex;
          setActivePiece(activePiece ? activePiece : (-1 as EntityIndex));
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game]);

  return (
    <GameContext.Provider value={{ game, activePiece }}>
      {props.children}
    </GameContext.Provider>
  );
};

export default GameProvider;
