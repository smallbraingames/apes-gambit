// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import { System, IWorld } from "solecs/System.sol";
import { getAddressById } from "solecs/utils.sol";
import { OwnerComponent, ID as OwnerComponentID } from "components/OwnerComponent.sol";
import { LibOwner } from "libraries/LibOwner.sol";

uint256 constant ID = uint256(keccak256("system.Spawn"));

contract SpawnSystem is System {
  constructor(IWorld _world, address _components) System(_world, _components) {}

  /// @notice Spawns a new piece with msg.sender as owner
  function execute(bytes memory) public returns (bytes memory) {
    // Unique entity
    uint256 entityId = world.getUniqueEntityId();

    // Set owner
    OwnerComponent ownerComponent = OwnerComponent(getAddressById(components, OwnerComponentID));
    ownerComponent.set(entityId, msg.sender);

    return abi.encode(entityId);
  }

  function executeTyped() public returns (uint256) {
    uint256 entityId = abi.decode(execute(abi.encode()), (uint256));
    return entityId;
  }
}
