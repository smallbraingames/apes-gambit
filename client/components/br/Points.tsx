import { EntityIndex } from "@latticexyz/recs";
import { GameContext } from "../../context/GameContext";
import { Network } from "../../network/types";
import { NetworkContext } from "../../context/NetworkContext";
import { useComponentValue } from "@latticexyz/react";
import { useContext } from "react";

const PointDisplay = (props: {
  network: Network;
  activePiece: EntityIndex;
}) => {
  const points = useComponentValue(
    props.network.components.BRPoints,
    props.activePiece
  );

  return (
    <div>
      <div className="flex items-center">
        <div className="h-10 w-10">
          <img
            alt="Banana"
            src="icons/banana.svg"
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="ml-2">
          <div className="bignumber flex items-center">
            {points?.value || "0"}
          </div>
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
        <div className="bg-yellow-50 px-2 py-3 rounded-lg text-yellow-900 border border-b-4 border-r-2 border-yellow-900">
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
