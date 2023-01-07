import { CONTROLLER_COMPONENT_CLASS_NAME, disableClickthroughs } from "./Game";
import { useContext, useEffect } from "react";

import { Game } from "../../game/types";
import { NetworkContext } from "../../context/NetworkContext";
import getBurnerWallet from "../../network/wallet/getBurnerWallet";
import getOwnedPieceEntityIndex from "../../game/utils/getOwnedPieceEntityIndex";
import joinGame from "../../game/utils/joinGame";

const JoinGame = (props: { game: Game }) => {
  const network = useContext(NetworkContext);

  useEffect(() => {
    disableClickthroughs();
  }, []);

  const handleJoinGame = () => {
    const pieceEntity = getOwnedPieceEntityIndex(
      getBurnerWallet().address,
      network.network!.components.Owner,
      network.network!.world
    );
    joinGame(pieceEntity, props.game.gameEntity!, network.network!);
  };

  return (
    <div className={CONTROLLER_COMPONENT_CLASS_NAME}>
      <button className="bg-green-500 p-5" onClick={handleJoinGame}>
        Join Game
      </button>
    </div>
  );
};

export default JoinGame;
