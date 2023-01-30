// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import { System } from "solecs/System.sol";
import { getSystemAddressById } from "solecs/utils.sol";
import { RevokeControllerSystem, ID as RevokeControllerSystemID } from "systems/RevokeControllerSystem.sol";
import { BRNotRevokeSystem } from "common/BRErrors.sol";

uint256 constant BR_REVOKE_SYSTEM_ID = uint256(keccak256("system.BRRevokeControllerSystem"));

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
}
