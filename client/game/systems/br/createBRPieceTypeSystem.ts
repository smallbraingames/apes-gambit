import { Game } from "../../types";
import { Network } from "../../../network/types";
import { Sprites } from "../../constants";
import { Subscription } from "rxjs";
import { defineComponentSystemUnsubscribable } from "../../utils/defineComponentSystemUnsubscribable";
import isActiveGamePiece from "../../utils/isActiveGamePiece";

const createBRPieceTypeSystem = (
  network: Network,
  game: Game
): Subscription => {
  const {
    world,
    components: { PieceType },
  } = network;

  const {
    gameEntity,
    scenes: {
      Main: {
        objectPool,
        config,
        maps: {
          Main: { tileWidth, tileHeight },
        },
      },
    },
  } = game;

  const subscription = defineComponentSystemUnsubscribable(
    world,
    PieceType,
    (update) => {
      console.log("piece type update", update);
    },
    { runOnInit: true }
  );

  return subscription;
};

export default createBRPieceTypeSystem;
