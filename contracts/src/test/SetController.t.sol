// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { SpawnSystem, ID as SpawnSystemID } from "systems/SpawnSystem.sol";
import { SetControllerSystem, ID as SetControllerSystemID } from "systems/SetControllerSystem.sol";
import { ControllerComponent, ID as ControllerComponentID } from "components/ControllerComponent.sol";
import { AlreadyHasController } from "common/Errors.sol";

import { Deploy } from "./Deploy.sol";
import "std-contracts/test/MudTest.t.sol";
import { console } from "forge-std/console.sol";

contract SetControllerTest is MudTest {
  constructor() MudTest(new Deploy()) {}

  function testSetController() public {
    SpawnSystem spawnSystem = SpawnSystem(system(SpawnSystemID));
    SetControllerSystem setControllerSystem = SetControllerSystem(system(SetControllerSystemID));
    ControllerComponent controllerComponent = ControllerComponent(component(ControllerComponentID));

    // Spawn a new piece and check owner
    uint256 entityId = spawnSystem.executeTyped();

    // Set controller and check that it was set correctly
    address[] memory controllers = new address[](1);
    controllers[0] = address(123456);
    setControllerSystem.executeTyped(entityId, controllers);
    assertEq(keccak256(abi.encode(controllerComponent.getValue(entityId))), keccak256(abi.encode(controllers)));

    // Check cannot set another controller
    address[] memory otherControllers = new address[](1);
    otherControllers[0] = address(1234567);
    vm.expectRevert(AlreadyHasController.selector);
    setControllerSystem.executeTyped(entityId, otherControllers);
  }
}
