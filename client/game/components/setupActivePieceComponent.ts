import {
  Has,
  defineEnterSystem,
  defineUpdateSystem,
  hasComponent,
  setComponent,
} from "@latticexyz/recs";

import { Game } from "../types";
import { Network } from "../../network/types";
import getNetworkWallet from "../../network/wallet/getNetworkWallet";
import getOwnedPieceEntityIndex from "../utils/getOwnedPieceEntityIndex";
import spawnPiece from "../utils/setup/spawnPiece";

const setupActivePieceComponent = async (network: Network, game: Game) => {
  const {
    components: { ActivePiece },
  } = game;

  const {
    world,
    godEntityIndex,
    components: { Owner },
  } = network;

  const setActiveAddressFromBurnerWallet = () => {
    const activeAddress = getNetworkWallet(network).address;
    const ownedPieceEntityIndex = getOwnedPieceEntityIndex(
      activeAddress,
      Owner,
      world
    );
    if (ownedPieceEntityIndex) {
      setComponent(ActivePiece, godEntityIndex, {
        value: ownedPieceEntityIndex,
      });
      return true;
    }
    return false;
  };

  // Define systems
  defineEnterSystem(world, [Has(Owner)], () => {
    setActiveAddressFromBurnerWallet();
  });
  defineUpdateSystem(world, [Has(Owner)], () => {
    setActiveAddressFromBurnerWallet();
  });

  // Spawn piece if necessary
  const hasActivePiece = setActiveAddressFromBurnerWallet();
  if (!hasActivePiece) {
    await spawnPiece(network, game);
    // Poll for active piece
    await new Promise<void>(function (resolve, reject) {
      (function waitForActivePiece() {
        if (hasComponent(ActivePiece, godEntityIndex)) return resolve();
        setTimeout(waitForActivePiece, 500);
      })();
    });
  }
};

export default setupActivePieceComponent;
