import { useContext, useEffect, useState } from "react";

import { BigNumber } from "ethers";
import { EntityID } from "@latticexyz/recs";
import { Network } from "../../network/types";
import { NetworkContext } from "../../context/NetworkContext";
import { Game as PhaserGame } from "../../game/types";
import getOwnedPieceEntityIndex from "../../game/utils/getOwnedPieceEntityIndex";
import joinGame from "../../game/utils/joinGame";

const Game = () => {
  const network = useContext(NetworkContext);
  const [game, setGame] = useState<PhaserGame | undefined>(undefined);

  const setupGame = async (network: Network) => {
    const createGame = (await import("../../game/createGame")).createGame;
    const game: PhaserGame = await createGame(
      network,
      "0x55f448fdea98c4d29eb340757ef0a66cd03dbb9538908a6a81d96026b71ec475" as EntityID
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

  const handleJoinGame = () => {
    const pieceEntity = getOwnedPieceEntityIndex(
      "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
      network.network!.components.Owner,
      network.network!.world
    );
    joinGame(pieceEntity, game!.gameEntity, network.network!);
  };

  return (
    <>
      <div>
        <button onClick={handleJoinGame}>Join Game</button>
      </div>
    </>
  );
};

export default Game;
