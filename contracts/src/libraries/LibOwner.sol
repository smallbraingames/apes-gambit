// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import { OwnerComponent } from "components/OwnerComponent.sol";
import { NotOwner } from "common/Errors.sol";

library LibOwner {
  /// @notice Returns whether an address is the owner of an entity
  function isOwner(
    OwnerComponent ownerComponent,
    uint256 entity,
    address checkAddress
  ) internal view returns (bool) {
    if (!ownerComponent.has(entity)) {
      return false;
    }
    address current = ownerComponent.getValue(entity);
    if (current != checkAddress) {
      return false;
    }
    return true;
  }

  /// @notice Checks if an address is the owner of an entity
  function checkIsOwner(
    OwnerComponent ownerComponent,
    uint256 entity,
    address checkAddress
  ) internal view {
    if (!isOwner(ownerComponent, entity, checkAddress)) {
      revert NotOwner();
    }
  }
}
