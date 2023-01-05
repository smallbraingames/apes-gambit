import { useContext, useEffect, useState } from "react";

import { GameConfig } from "../game/types";
import { NetworkContext } from "../context/NetworkContext";

export default function Dev() {
  const network = useContext(NetworkContext);
  const [games, setGames] = useState<Map<number, GameConfig>>(new Map());

  useEffect(() => {
    if (network.network) {
      network.network.components.Game.update$.subscribe((update) => {
        setGames(
          new Map(games.set(update.entity, update.value[0] as GameConfig))
        );
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [network.network]);

  return (
    <>
      <main>
        <div className="m-12">
          <div className="font-bold text-xl">Super Secret Dev Panel</div>
          <div className="mt-2">
            <h2 className="text-lg font-bold">Games</h2>
            <button
              type="button"
              className="mt-2 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              onClick={() => {
                network.network?.api.createBRGame(
                  Math.floor(new Date().getTime() / 1000)
                );
              }}
            >
              Create Game
            </button>
            <h2 className="text-lg mt-2">Games</h2>
            <div>
              {[...games.entries()].map((game) => {
                const entityIndex = game[0];
                const entity = network.network?.world.entities[entityIndex];
                return (
                  <p key={game[0]}>
                    Start time:{" "}
                    {new Date(game[1].startTime * 1000).toLocaleTimeString()},
                    Status: {game[1].status}, Entity: {entity}, EntityIndex:{" "}
                    {entityIndex}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
