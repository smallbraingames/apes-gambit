import { EntityID, EntityIndex, defineComponentSystem } from "@latticexyz/recs";
import { useContext, useEffect, useState } from "react";

import { GameConfig } from "../game/types";
import { NetworkContext } from "../context/NetworkContext";
import { getEntityFromEntityIndex } from "../game/utils/resolveEntity";

const GAME_START_TIME = Math.floor(new Date().getTime() / 1000);
const GAME_RECHARGE_TIME = 5;
const GAME_INITIAL_GRID_DIM = 100;
const GAME_SECONDS_PER_GRID_SHRINK = 10;

export default function Dev() {
  const network = useContext(NetworkContext);
  const [games, setGames] = useState<Map<number, GameConfig>>(new Map());

  useEffect(() => {
    if (network.network) {
      defineComponentSystem(
        network.network.world,
        network.network.components.BRGame,
        (update) => {
          setGames(
            new Map(games.set(update.entity, update.value[0] as GameConfig))
          );
        }
      );
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
                network.network?.api.br.createBRGame(
                  GAME_START_TIME,
                  GAME_RECHARGE_TIME,
                  GAME_INITIAL_GRID_DIM,
                  GAME_SECONDS_PER_GRID_SHRINK
                );
              }}
            >
              Create Game
            </button>
            <h2 className="text-lg mt-2">Games</h2>
            <div>
              {[...games.entries()].map((game) => {
                const entityIndex = game[0] as EntityIndex;
                let entity = "-";
                // Hack because of proxies
                if (network.network!.world.entities[entityIndex]) {
                  entity = getEntityFromEntityIndex(
                    entityIndex,
                    network.network!.world
                  );
                }
                return (
                  <p key={game[0]}>
                    Start time:{" "}
                    {new Date(game[1].startTime * 1000).toLocaleTimeString()},
                    Status: {game[1].status}, Entity: {entity}, EntityIndex:{" "}
                    {entityIndex}, Recharge time: {game[1].rechargeTime}, Grid
                    initial size: {game[1].initialGridDim}, Seconds per grid
                    shrink: {game[1].secondsPerGridShrink}
                    <button
                      onClick={() => {
                        network.network?.api.br.startBRGame(entity as EntityID);
                      }}
                      className="ml-2 mt-2 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                      Start Game
                    </button>
                    <button
                      onClick={() => {
                        network.network?.api.br.endBRGame(entity as EntityID);
                      }}
                      className="ml-2 mt-2 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                      End Game
                    </button>
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
