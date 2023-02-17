import { Scenes, TILE_HEIGHT, TILE_WIDTH } from "../game/constants";
import { useContext, useEffect } from "react";

import { GameContext } from "../context/GameContext";
import { NetworkContext } from "../context/NetworkContext";
import { getComponentValueStrict } from "@latticexyz/recs";

//import { tileCoordToPixelCoord } from "@latticexyz/phaserx";
//import tweenCamera from "../game/utils/tweenCamera";

const CenterActivePieceOnLoad = (props: { scene: Scenes }) => {
  const { network } = useContext(NetworkContext);
  const { game, activePiece } = useContext(GameContext);

  useEffect(() => {
    if (game && activePiece) {
      const piecePosition = getComponentValueStrict(
        network!.components.PiecePosition,
        activePiece
      );
      if (piecePosition) {
        if (props.scene === Scenes.Lobby) {
          game.scenes.Lobby.camera.centerOnCoord(
            piecePosition,
            TILE_WIDTH,
            TILE_HEIGHT
          );
        } else {
          game.scenes.BR.camera.centerOnCoord(
            piecePosition,
            TILE_WIDTH,
            TILE_HEIGHT
          );
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game, activePiece]);
  return <></>;
};

export default CenterActivePieceOnLoad;
