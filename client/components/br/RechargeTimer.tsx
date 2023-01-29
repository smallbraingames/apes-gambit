import { GameContext } from "../../context/GameContext";
import { NetworkContext } from "../../context/NetworkContext";
import { useComponentValue } from "@latticexyz/react";
import { useContext } from "react";

const RechargeTimer = () => {
  const game = useContext(GameContext);
  const network = useContext(NetworkContext);
  const rechargeTime = useComponentValue(
    game.game!.components.BRRechargeTimerComponent,
    network.network?.godEntityIndex
  );

  return (
    <div className="bg-green-600 flex p-1 rounded-full items-center w-48 h-16 my-1 border border-green-900 opacity-95">
      <div className="w-full h-full rounded-full flex items-center justify-center bg-green-400">
        <div className="bignumber flex items-center">{rechargeTime?.value}</div>
      </div>
    </div>
  );
};

export default RechargeTimer;
