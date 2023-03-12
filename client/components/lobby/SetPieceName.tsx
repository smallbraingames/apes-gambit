import { useContext, useEffect, useMemo, useState } from "react";

import { GameContext } from "../../context/GameContext";
import { Loading } from "./BRGameIndicator";
import { NetworkContext } from "../../context/NetworkContext";
import { defineComponentSystemUnsubscribable } from "../../game/utils/defineComponentSystemUnsubscribable";
import { getEntityFromEntityIndex } from "../../game/utils/resolveEntity";

const SetPieceName = () => {
  const { network } = useContext(NetworkContext);
  const { activePiece } = useContext(GameContext);
  const [hasName, setHasName] = useState(false);
  const [nameToSet, setNameToSet] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!network || !activePiece) {
      return;
    }
    const {
      world,
      components: { PieceName },
    } = network;
    const pieceNameSub = defineComponentSystemUnsubscribable(
      world,
      PieceName,
      (update) => {
        const entity = update.entity;
        if (entity === activePiece) {
          const name = update.value[0]?.value;
          if (name) {
            setHasName(true);
          }
        }
      }
    );

    return () => {
      pieceNameSub.unsubscribe();
    };
  }, [network, activePiece]);

  const setName = async () => {
    if (!network || !activePiece) {
      return;
    }
    const {
      world,
      api: { setPieceName },
    } = network;
    try {
      setLoading(true);
      await setPieceName(
        getEntityFromEntityIndex(activePiece, world),
        nameToSet
      );
    } catch (e) {
      console.error("Error setting piece name", e);
    }
    setLoading(false);
  };

  if (hasName) {
    return <></>;
  }

  return (
    <div className="flex flex-col gap-2 container p-4 ">
      <h1 className="font-bold text-lg">Name your Piece</h1>
      <div className="flex gap-2">
        <input
          className="rounded-lg bg-yellow-50 text-yellow-900 p-4 focus:outline-none w-36"
          type="text"
          value={nameToSet}
          onChange={(e) => setNameToSet(e.target.value)}
          placeholder="Name"
        />
        <div className="w-full flex items-center">
          {!loading ? (
            <button className="button w-full h-full" onClick={setName}>
              Set Name
            </button>
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </div>
  );
};

export default SetPieceName;
