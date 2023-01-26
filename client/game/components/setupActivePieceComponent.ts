import { defineComponentSystem, setComponent } from "@latticexyz/recs";

import { Game } from "../types";
import { Network } from "../../network/types";
import getNetworkWallet from "../../network/wallet/getNetworkWallet";
import getOwnedPieceEntityIndex from "../utils/getOwnedPieceEntityIndex";

const setupActivePieceComponent = (network: Network, game: Game) => {
  const {
    gameWorld,
    components: { ActivePiece },
  } = game;

  const {
    world,
    godEntityIndex,
    components: { Owner },
  } = network;

  defineComponentSystem(gameWorld, Owner, () => {
    const activeAddress = getNetworkWallet(network).address;
    const ownedPieceEntityIndex = getOwnedPieceEntityIndex(
      activeAddress,
      Owner,
      world
    );
    console.log("owned piece index", ownedPieceEntityIndex, activeAddress);
    setComponent(ActivePiece, godEntityIndex, { value: ownedPieceEntityIndex });
  });
};

export default setupActivePieceComponent;
