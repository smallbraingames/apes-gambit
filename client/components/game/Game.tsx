import { useEffect, useState } from "react";

import { Game as PhaserGame } from "../../game/types";

const Game = () => {
  const [game, setGame] = useState<PhaserGame | undefined>(undefined);

  const setupGame = async () => {
    const createGame = (await import("../../game/createGame")).createGame;
    const game: PhaserGame = await createGame();
    setGame(game);
  };
  useEffect(() => {
    setupGame();
    return () => {
      if (game) game.disposePhaser();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default Game;
