import { EntityIndex } from "@latticexyz/recs";
import { Game } from "../../game/types";
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
      <div>Points: {points?.value}</div>
    </div>
  );
};

const Points = () => {
  const network = useContext(NetworkContext);
  const game = useContext(GameContext);

  return (
    <>
      {network.network && game.activePiece && (
        <div>
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
