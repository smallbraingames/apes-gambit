// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import { System } from "solecs/System.sol";
import { getSystemAddressById, getAddressById } from "solecs/utils.sol";
import { OwnerComponent, ID as OwnerComponentID } from "components/OwnerComponent.sol";
import { ControllerComponent, ID as ControllerComponentID } from "components/ControllerComponent.sol";
import { BRGameComponent, ID as BRGameComponentID } from "components/BRGameComponent.sol";
import { BRInGameComponent, ID as BRInGameComponentID } from "components/BRInGameComponent.sol";
import { BRIsAliveComponent, ID as BRIsAliveComponentID } from "components/BRIsAliveComponent.sol";
import { PiecePositionComponent, ID as PiecePositionComponentID } from "components/PiecePositionComponent.sol";
import { RevokeControllerSystem, ID as RevokeControllerSystemID } from "systems/RevokeControllerSystem.sol";
import { BRNotRevokeSystem } from "common/BRErrors.sol";
import { BRLibPiece } from "libraries/BRLibPiece.sol";

uint256 constant BR_REVOKE_SYSTEM_ID = uint256(keccak256("system.BRLeaveGameSystem"));

abstract contract BRPieceControllerSystem is System {
  function revokeController(uint256 piece) public {
    if (msg.sender != getSystemAddressById(components, BR_REVOKE_SYSTEM_ID)) {
      revert BRNotRevokeSystem();
    }
    RevokeControllerSystem revokeControllerSystem = RevokeControllerSystem(
      getSystemAddressById(components, RevokeControllerSystemID)
    );
    revokeControllerSystem.executeTyped(piece);
  }

  /// @notice Check if the piece can play
  function checkCanPlay(uint256 piece, uint256 game) internal view {
    OwnerComponent ownerComponent = OwnerComponent(getAddressById(components, OwnerComponentID));
    ControllerComponent controllerComponent = ControllerComponent(getAddressById(components, ControllerComponentID));
    PiecePositionComponent piecePositionComponent = PiecePositionComponent(
      getAddressById(components, PiecePositionComponentID)
    );
    BRGameComponent brGameComponent = BRGameComponent(getAddressById(components, BRGameComponentID));
    BRInGameComponent brInGameComponent = BRInGameComponent(getAddressById(components, BRInGameComponentID));
    BRIsAliveComponent brIsAliveComponent = BRIsAliveComponent(getAddressById(components, BRIsAliveComponentID));

    // Check that this piece can play
    BRLibPiece.checkCanPlay(
      ownerComponent,
      controllerComponent,
      piecePositionComponent,
      brGameComponent,
      brInGameComponent,
      brIsAliveComponent,
      piece,
      game,
      msg.sender
    );
  }
}
