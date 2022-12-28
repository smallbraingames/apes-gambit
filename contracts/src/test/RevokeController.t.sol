// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { SpawnSystem, ID as SpawnSystemID } from "systems/SpawnSystem.sol";
import { SetControllerSystem, ID as SetControllerSystemID } from "systems/SetControllerSystem.sol";
import { RevokeControllerSystem, ID as RevokeControllerSystemID } from "systems/RevokeControllerSystem.sol";
import { ControllerComponent, ID as ControllerComponentID } from "components/ControllerComponent.sol";
import { LibController } from "libraries/LibController.sol";
import { NotController } from "common/Errors.sol";

import { Deploy } from "./Deploy.sol";
import "std-contracts/test/MudTest.t.sol";
import { console } from "forge-std/console.sol";

contract RevokeControllerTest is MudTest {
  constructor() MudTest(new Deploy()) {}

  function testRevokeController() public {
    SpawnSystem spawnSystem = SpawnSystem(system(SpawnSystemID));
    SetControllerSystem setControllerSystem = SetControllerSystem(system(SetControllerSystemID));
    RevokeControllerSystem revokeControllerSystem = RevokeControllerSystem(system(RevokeControllerSystemID));
    ControllerComponent controllerComponent = ControllerComponent(component(ControllerComponentID));

    // Spawn a new piece
    uint256 entityId = spawnSystem.executeTyped();

    // Set controller
    address[] memory controllers = new address[](1);
    controllers[0] = address(this);
    setControllerSystem.executeTyped(entityId, controllers);

    // Revoke controller, and check there are no controllers
    revokeControllerSystem.executeTyped(entityId);
    LibController.checkNoControllers(controllerComponent, entityId);

    // Check cannot revoke controller again
    vm.expectRevert(NotController.selector);
    revokeControllerSystem.executeTyped(entityId);
  }
}
