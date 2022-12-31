// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import { System, IWorld } from "solecs/System.sol";
import { getAddressById } from "solecs/utils.sol";
import { BRGame, BRGameStatus } from "common/BRGame.sol";
import { BRGameComponent, ID as BRGameComponentID } from "components/BRGameComponent.sol";

uint256 constant ID = uint256(keccak256("system.BRCreateGameSystem"));

contract BRCreateGameSystem is System {
  constructor(IWorld _world, address _components) System(_world, _components) {}

  /// @notice Spawns a new piece with msg.sender as owner
  function execute(bytes memory arguments) public returns (bytes memory) {
    uint256 startTime = abi.decode(arguments, (uint256));

    // Unique entity
    uint256 entityId = world.getUniqueEntityId();

    // Create game
    BRGameComponent brGameComponent = BRGameComponent(getAddressById(components, BRGameComponentID));
    brGameComponent.set(entityId, BRGame({ startTime: startTime, status: BRGameStatus.NOT_STARTED }));

    return abi.encode(entityId);
  }

  function executeTyped(uint256 startTime) public returns (uint256) {
    uint256 entityId = abi.decode(execute(abi.encode(startTime)), (uint256));
    return entityId;
  }
}