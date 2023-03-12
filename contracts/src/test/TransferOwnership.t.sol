// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { SpawnSystem, ID as SpawnSystemID } from "systems/SpawnSystem.sol";
import { TransferOwnerSystem, ID as TransferOwnerSystemID } from "systems/TransferOwnerSystem.sol";
import { OwnerComponent, ID as OwnerComponentID } from "components/OwnerComponent.sol";
import { NotOwner } from "common/Errors.sol";

import { Deploy } from "./Deploy.sol";
import "std-contracts/test/MudTest.t.sol";
import { console } from "forge-std/console.sol";

contract TransferOwnerTest is MudTest {
  constructor() MudTest(new Deploy()) {}

  function testTransferOwnership() public {
    SpawnSystem spawnSystem = SpawnSystem(system(SpawnSystemID));
    TransferOwnerSystem transferOwnerSystem = TransferOwnerSystem(system(TransferOwnerSystemID));
    OwnerComponent ownerComponent = OwnerComponent(component(OwnerComponentID));

    // Spawn a new piece and check owner
    uint256 entityId = spawnSystem.executeTyped();
    assertEq(ownerComponent.getValue(entityId), address(this));

    // Transfer ownership to another address
    address otherAddress = address(123456);
    transferOwnerSystem.executeTyped(entityId, otherAddress);
    assertEq(ownerComponent.getValue(entityId), otherAddress);

    // Check Original owner cannot transfer ownership
    vm.expectRevert(NotOwner.selector);
    transferOwnerSystem.executeTyped(entityId, address(this));

    // Transfer back to original player
    vm.startPrank(otherAddress);
    transferOwnerSystem.executeTyped(entityId, address(this));
    assertEq(ownerComponent.getValue(entityId), address(this));
  }
}
