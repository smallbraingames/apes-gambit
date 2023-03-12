// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { PieceType } from "common/PieceType.sol";
import { ControllerComponent, ID as ControllerComponentID } from "components/ControllerComponent.sol";
import { PieceTypeComponent, ID as PieceTypeComponentID } from "components/PieceTypeComponent.sol";
import { SpawnSystem, ID as SpawnSystemID } from "systems/SpawnSystem.sol";
import { SetControllerSystem, ID as SetControllerSystemID } from "systems/SetControllerSystem.sol";
import { SetPieceTypeSystem, ID as SetPieceTypeSystemID } from "systems/SetPieceTypeSystem.sol";
import { CannotControl } from "common/Errors.sol";

import { Deploy } from "./Deploy.sol";
import "std-contracts/test/MudTest.t.sol";
import { console } from "forge-std/console.sol";

contract SetPieceTypeTest is MudTest {
  constructor() MudTest(new Deploy()) {}

  function testSetPieceType() public {
    SpawnSystem spawnSystem = SpawnSystem(system(SpawnSystemID));
    SetControllerSystem setControllerSystem = SetControllerSystem(system(SetControllerSystemID));
    SetPieceTypeSystem setPieceTypeSystem = SetPieceTypeSystem(system(SetPieceTypeSystemID));
    PieceTypeComponent pieceTypeComponent = PieceTypeComponent(component(PieceTypeComponentID));

    // Spawn a new piece and check piece type
    uint256 entityId = spawnSystem.executeTyped();
    assertEq(uint8(pieceTypeComponent.getValue(entityId)), uint8(PieceType.PAWN));

    // Edit piece type as owner and check (then switch back to pawn)
    setPieceTypeSystem.executeTyped(entityId, PieceType.KNIGHT);
    assertEq(uint8(pieceTypeComponent.getValue(entityId)), uint8(PieceType.KNIGHT));
    setPieceTypeSystem.executeTyped(entityId, PieceType.PAWN);

    // Set controller, and make sure owner cannot change piece type
    address controller = address(123456);
    address[] memory controllers = new address[](1);
    controllers[0] = controller;
    setControllerSystem.executeTyped(entityId, controllers);
    vm.expectRevert(CannotControl.selector);
    setPieceTypeSystem.executeTyped(entityId, PieceType.BISHOP);
    assertEq(uint8(pieceTypeComponent.getValue(entityId)), uint8(PieceType.PAWN));

    // Check controller can set piece type
    vm.deal(controller, 1 ether);
    vm.prank(controller);
    setPieceTypeSystem.executeTyped(entityId, PieceType.BISHOP);
    assertEq(uint8(pieceTypeComponent.getValue(entityId)), uint8(PieceType.BISHOP));
  }
}
