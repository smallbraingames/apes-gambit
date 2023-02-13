// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { IWorld } from "solecs/World.sol";
import { BRGame, BRGameStatus } from "common/BRGame.sol";
import { IUint256Component } from "solecs/interfaces/IUint256Component.sol";
import { getAddressById } from "solecs/utils.sol";
import { BRIsAliveComponent, ID as BRIsAliveComponentID } from "components/BRIsAliveComponent.sol";
import { BRGameComponent, ID as BRGameComponentID } from "components/BRGameComponent.sol";
import { PiecePositionComponent, ID as PiecePositionComponentID } from "components/PiecePositionComponent.sol";
import { BRLibPiece } from "libraries/BRLibPiece.sol";
import { BRLibGame } from "libraries/BRLibGame.sol";

abstract contract BRLazyUpdater {
  function updateGameState(
    IWorld world,
    uint256 game,
    IUint256Component components
  ) internal {
    BRGameComponent brGameComponent = BRGameComponent(getAddressById(components, BRGameComponentID));
    BRIsAliveComponent brIsAliveComponent = BRIsAliveComponent(getAddressById(components, BRIsAliveComponentID));
    PiecePositionComponent piecePositionComponent = PiecePositionComponent(
      getAddressById(components, PiecePositionComponentID)
    );
    if (BRLibGame.getGame(brGameComponent, game).status == BRGameStatus.IN_PROGRESS) {
      BRLibPiece.killPiecesOutOfBounds(world, brGameComponent, brIsAliveComponent, piecePositionComponent, game);
    }
  }
}
