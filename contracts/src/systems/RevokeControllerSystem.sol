// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import { System, IWorld } from "solecs/System.sol";
import { getAddressById } from "solecs/utils.sol";
import { OwnerComponent, ID as OwnerComponentID } from "components/OwnerComponent.sol";
import { ControllerComponent, ID as ControllerComponentID } from "components/ControllerComponent.sol";
import { LibController } from "libraries/LibController.sol";
import { AlreadyHasController } from "common/Errors.sol";

uint256 constant ID = uint256(keccak256("system.RevokeController"));

contract RevokeControllerSystem is System {
  constructor(IWorld _world, address _components) System(_world, _components) {}

  function execute(bytes memory arguments) public returns (bytes memory) {
    uint256 entity = abi.decode(arguments, (uint256));
    ControllerComponent controllerComponent = ControllerComponent(getAddressById(components, ControllerComponentID));

    // Check if msg.sender is a controller of the entity
    LibController.checkIsController(controllerComponent, entity, msg.sender);

    // If so, remove controller
    LibController.removeController(controllerComponent, entity, msg.sender);
  }

  function executeTyped(uint256 entity) public returns (bytes memory) {
    return execute(abi.encode(entity));
  }
}
