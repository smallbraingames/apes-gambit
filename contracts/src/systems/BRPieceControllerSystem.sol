// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import { IWorld, System } from "solecs/System.sol";
import { getAddressById, getSystemAddressById } from "solecs/utils.sol";
import { OwnerComponent, ID as OwnerComponentID } from "components/OwnerComponent.sol";
import { ControllerComponent, ID as ControllerComponentID } from "components/ControllerComponent.sol";
import { RevokeControllerSystem, ID as RevokeControllerSystemID } from "systems/RevokeControllerSystem.sol";
import { BRLibPiece } from "libraries/BRLibPiece.sol";

abstract contract BRPieceControllerSystem is System {
  function revokeController(uint256 piece) public {
    OwnerComponent ownerComponent = OwnerComponent(getAddressById(components, OwnerComponentID));
    ControllerComponent controllerComponent = ControllerComponent(getAddressById(components, ControllerComponentID));
    RevokeControllerSystem revokeControllerSystem = RevokeControllerSystem(
      getSystemAddressById(components, RevokeControllerSystemID)
    );
    BRLibPiece.checkPieceOwnerAndControllers(ownerComponent, controllerComponent, piece, msg.sender);
    revokeControllerSystem.executeTyped(piece);
  }
}
