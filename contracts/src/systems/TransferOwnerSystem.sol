// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import { System, IWorld } from "solecs/System.sol";
import { getAddressById } from "solecs/utils.sol";
import { OwnerComponent, ID as OwnerComponentID } from "components/OwnerComponent.sol";
import { LibOwner } from "libraries/LibOwner.sol";

uint256 constant ID = uint256(keccak256("system.TransferOwner"));

contract TransferOwnerSystem is System {
  constructor(IWorld _world, address _components) System(_world, _components) {}

  function execute(bytes memory arguments) public returns (bytes memory) {
    (uint256 entity, address newOwner) = abi.decode(arguments, (uint256, address));
    OwnerComponent ownerComponent = OwnerComponent(getAddressById(components, OwnerComponentID));

    // Check if msg.sender owns the entity
    LibOwner.checkIsOwner(ownerComponent, entity, msg.sender);

    // If so, transfer ownership
    ownerComponent.set(entity, newOwner);
  }

  function executeTyped(uint256 entity, address newOwner) public returns (bytes memory) {
    return execute(abi.encode(entity, newOwner));
  }
}
