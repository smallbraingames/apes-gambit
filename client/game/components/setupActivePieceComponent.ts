import {
  Has,
  defineEnterSystem,
  defineUpdateSystem,
  setComponent,
} from "@latticexyz/recs";

import { Game } from "../types";
import { Network } from "../../network/types";
import getNetworkWallet from "../../network/wallet/getNetworkWallet";
import getOwnedPieceEntityIndex from "../utils/getOwnedPieceEntityIndex";

const setupActivePieceComponent = (network: Network, game: Game) => {
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
    }
  };

  defineEnterSystem(world, [Has(Owner)], () => {
    setActiveAddressFromBurnerWallet();
  });
  defineUpdateSystem(world, [Has(Owner)], () => {
    setActiveAddressFromBurnerWallet();
  });
};

export default setupActivePieceComponent;
