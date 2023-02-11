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
  activePiece?: EntityIndex;
  gameEntity?: EntityID;
}

export const GameContext = createContext<GameContextInterface>({
  game: undefined,
  activePiece: undefined,
  gameEntity: undefined,
});

const GameProvider = (props: { children: ReactNode }) => {
  const network = useContext(NetworkContext);
  const [game, setGame] = useState<PhaserGame | undefined>(undefined);
  const [activePiece, setActivePiece] = useState<EntityIndex | undefined>(
    undefined
  );
  const [gameEntity, setGameEntity] = useState<EntityID | undefined>(undefined);

  const setupGame = async (network: Network) => {
    const params = new URLSearchParams(window.location.search);
    const gameEntity = params.get("gameEntity") as EntityID | undefined;
    setGameEntity(gameEntity);

    const createGame = (await import("../game/createGame")).createGame;
    const game: PhaserGame = await createGame(network, gameEntity);

    setGame((prevGame) => {
      if (prevGame) prevGame.game.destroy(true);
      return game;
    });
  };

  useEffect(() => {
    if (network.network) {
      setupGame(network.network);
    }
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
    <GameContext.Provider value={{ game, activePiece, gameEntity }}>
      {props.children}
    </GameContext.Provider>
  );
};

export default GameProvider;
