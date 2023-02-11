import { EntityIndex } from "@latticexyz/recs";
import { GameContext } from "../../context/GameContext";
import { Network } from "../../network/types";
import { SwitchGameState } from "../GameManager";
import joinMainGame from "../../game/utils/setup/joinMainGame";
import { useContext } from "react";

const BRGameIndicator = (props: {
  network: Network;
  activePiece: EntityIndex;
  switchFromLobbyToBR: SwitchGameState;
}) => {
  const { gameEntity } = useContext(GameContext);

  const handleJoinGame = async () => {
    if (gameEntity) {
      await joinMainGame(props.network, gameEntity, props.activePiece);
      props.switchFromLobbyToBR();
    }
  };

  return (
    <div className="bg-yellow-50 text-yellow-900 border-r-2 border-b-4 border-yellow-400  rounded-lg px-2 py-1">
      {/* @ts-ignore */}
      <button onClick={handleJoinGame}>Join Game {gameEntity}</button>
      {/* <GameCountdown endTime={parseInt(game.startTime)} /> */}
    </div>
  );
};

export default BRGameIndicator;
