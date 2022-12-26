// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import { System, IWorld } from "solecs/System.sol";
import { getAddressById } from "solecs/utils.sol";
import { OwnerComponent, ID as OwnerComponentID } from "components/OwnerComponent.sol";
import { ControllerComponent, ID as ControllerComponentID } from "components/ControllerComponent.sol";
import { LibOwner } from "libraries/LibOwner.sol";
import { LibController } from "libraries/LibController.sol";
import { AlreadyHasController } from "common/Errors.sol";

uint256 constant ID = uint256(keccak256("system.SetController"));

contract SetControllerSystem is System {
  constructor(IWorld _world, address _components) System(_world, _components) {}

  function execute(bytes memory arguments) public returns (bytes memory) {
    (uint256 entity, address[] memory controllers) = abi.decode(arguments, (uint256, address[]));
    OwnerComponent ownerComponent = OwnerComponent(getAddressById(components, OwnerComponentID));
    ControllerComponent controllerComponent = ControllerComponent(getAddressById(components, ControllerComponentID));

    // Check if msg.sender owns the entity
    LibOwner.checkIsOwner(ownerComponent, entity, msg.sender);

    // Check that msg.sender does not already have controllers
    if (controllerComponent.has(entity)) {
      revert AlreadyHasController();
    }

    // If so, set controller
    uint256[] memory paddedControllers = new uint256[](controllers.length);
    for (uint256 i = 0; i < controllers.length; i++) {
      paddedControllers[i] = LibController.padAddress(controllers[i]);
    }
    controllerComponent.set(entity, paddedControllers);
  }

  function executeTyped(uint256 entity, address[] memory controllers) public returns (bytes memory) {
    return execute(abi.encode(entity, controllers));
  }
}
