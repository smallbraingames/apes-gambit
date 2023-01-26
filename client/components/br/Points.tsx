import { EntityIndex } from "@latticexyz/recs";
import { GameContext } from "../../context/GameContext";
import { Network } from "../../network/types";
import { NetworkContext } from "../../context/NetworkContext";
import { useComponentValueStream } from "@latticexyz/std-client";
import { useContext } from "react";

const PointDisplay = (props: {
  network: Network;
  activePiece: EntityIndex;
}) => {
  const points = useComponentValueStream(
    props.network.components.BRPoints,
    props.activePiece
  );

  return (
    <div>
      <div className="flex">
        <div className="h-10 w-10">
          <img
            alt="Banana"
            src="icons/banana.svg"
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="ml-2">
          <div className="text-xs">BANANAS</div>
          <div className="text-lg font-bold">{points?.value}</div>
        </div>
      </div>
    </div>
  );
};

const Points = () => {
  const network = useContext(NetworkContext);
  const game = useContext(GameContext);

  return (
    <>
      {network.network && game.activePiece && (
        <div className="bg-stone-100 rounded-lg p-4">
          <PointDisplay
            network={network.network}
            activePiece={game.activePiece}
          />
        </div>
      )}
    </>
  );
};

export default Points;
