// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { PieceType } from "common/PieceType.sol";
import { Coord } from "std-contracts/components/CoordComponent.sol";
import { PiecePositionComponent, ID as PiecePositionComponentID } from "components/PiecePositionComponent.sol";
import { SpawnSystem, ID as SpawnSystemID } from "systems/SpawnSystem.sol";
import { MovePieceSystem, ID as MovePieceSystemID } from "systems/MovePieceSystem.sol";

import { InvalidMove } from "common/Errors.sol";
import { CannotControl } from "common/Errors.sol";

import { Deploy } from "./Deploy.sol";
import "std-contracts/test/MudTest.t.sol";
import { console } from "forge-std/console.sol";

contract MovePieceTest is MudTest {
  constructor() MudTest(new Deploy()) {}

  function testMovePawn() public {
    SpawnSystem spawnSystem = SpawnSystem(system(SpawnSystemID));
    MovePieceSystem movePieceSystem = MovePieceSystem(system(MovePieceSystemID));
    PiecePositionComponent piecePositionComponent = PiecePositionComponent(
      getAddressById(components, PiecePositionComponentID)
    );

    // Spawn a new piece and check position
    uint256 entityId = spawnSystem.executeTyped();
    Coord memory spawnPosition = piecePositionComponent.getValue(entityId);
    assertEq(spawnPosition.x, 0);
    assertEq(spawnPosition.y, 0);

    // Move piece and check position
    movePieceSystem.executeTyped(entityId, Coord({ x: 0, y: 1 }));
    Coord memory advancedPosition = piecePositionComponent.getValue(entityId);
    assertEq(advancedPosition.x, 0);
    assertEq(advancedPosition.y, 1);

    // Check invalid move
    vm.expectRevert(InvalidMove.selector);
    movePieceSystem.executeTyped(entityId, Coord({ x: 0, y: 3 }));

    // Check invalid controller
    vm.prank(address(123456));
    vm.expectRevert(CannotControl.selector);
    movePieceSystem.executeTyped(entityId, Coord({ x: 0, y: 2 }));
  }
}
