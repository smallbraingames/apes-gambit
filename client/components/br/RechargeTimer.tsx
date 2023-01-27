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
    <div className="bg-purple-200 p-5">
      <div>recharge time: {rechargeTime?.value}</div>
    </div>
  );
};

export default RechargeTimer;
