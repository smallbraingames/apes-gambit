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
          {/* Commented out because I don't think we need it, if we provide clear instructions to players pre-game. */}
          {/* <div className="label">BANANAS</div> */}
          <div className="bignumber flex items-center">
            {points?.value || "00"}
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
        <div className="bg-yellow-400 bg-opacity-90 rounded-lg p-4 max-w-md">
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
