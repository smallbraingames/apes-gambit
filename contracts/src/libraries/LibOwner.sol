// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import { OwnerComponent } from "components/OwnerComponent.sol";
import { NotOwner } from "common/Errors.sol";

library LibOwner {
  /// @notice Checks if an address is the owner of an entity
  function checkIsOwner(
    OwnerComponent ownerComponent,
    uint256 entity,
    address checkAddress
  ) internal view {
    if (!ownerComponent.has(entity)) revert NotOwner();
    address current = ownerComponent.getValue(entity);
    if (current != checkAddress) revert NotOwner();
  }
}
