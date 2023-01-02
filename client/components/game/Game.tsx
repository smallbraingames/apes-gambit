import { useEffect, useState } from "react";

import { Game } from "../../game/types";

const Game = () => {
  const [game, setGame] = useState<Game | undefined>(undefined);

  const setupGame = async () => {
    const createGame = require("../../game/createGame").createGame;
    const game: Game = await createGame();
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
