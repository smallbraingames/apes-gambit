// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { Coord } from "std-contracts/components/CoordComponent.sol";
import { BRGame, BRGameStatus } from "common/BRGame.sol";
import { SpawnSystem, ID as SpawnSystemID } from "systems/SpawnSystem.sol";
import { SetControllerSystem, ID as SetControllerSystemID } from "systems/SetControllerSystem.sol";
import { BRCreateGameSystem, ID as BRCreateGameSystemID } from "systems/BRCreateGameSystem.sol";
import { BRJoinGameSystem, ID as BRJoinGameSystemID } from "systems/BRJoinGameSystem.sol";
import { BRSetPieceTypeSystem, ID as BRSetPieceTypeSystemID } from "systems/BRSetPieceTypeSystem.sol";
import { BRStartGameSystem, ID as BRStartGameSystemID } from "systems/BRStartGameSystem.sol";
import { BRMovePieceSystem, ID as BRMovePieceSystemID } from "systems/BRMovePieceSystem.sol";
import { BRGameComponent, ID as BRGameComponentID } from "components/BRGameComponent.sol";
import { BRIsAliveComponent, ID as BRIsAliveComponentID } from "components/BRIsAliveComponent.sol";
import { BRPointsComponent, ID as BRPointsComponentID } from "components/BRPointsComponent.sol";
import { BRPieceDead } from "common/BRErrors.sol";
import { BRLibPiece } from "libraries/BRLibPiece.sol";
import { Deploy } from "./Deploy.sol";
import "std-contracts/test/MudTest.t.sol";
import { console } from "forge-std/console.sol";

contract BRGridShrinkTest is MudTest {
  constructor() MudTest(new Deploy()) {}

  function testBRGridShrink() public {
    SpawnSystem spawnSystem = SpawnSystem(system(SpawnSystemID));
    BRCreateGameSystem brCreateGameSystem = BRCreateGameSystem(system(BRCreateGameSystemID));
    BRJoinGameSystem brJoinGameSystem = BRJoinGameSystem(system(BRJoinGameSystemID));
    BRStartGameSystem brStartGameSystem = BRStartGameSystem(system(BRStartGameSystemID));
    BRMovePieceSystem brMovePieceSystem = BRMovePieceSystem(system(BRMovePieceSystemID));
    SetControllerSystem setControllerSystem = SetControllerSystem(system(SetControllerSystemID));
    BRIsAliveComponent brIsAliveComponent = BRIsAliveComponent(getAddressById(components, BRIsAliveComponentID));

    // Spawn a new piece
    uint256 piece = spawnSystem.executeTyped();

    // Set the piece's controller to the BRMoveSystem and BRSetPieceTypeSystem
    address[] memory controllers = new address[](2);
    controllers[0] = system(BRMovePieceSystemID);
    controllers[1] = system(BRSetPieceTypeSystemID);
    setControllerSystem.executeTyped(piece, controllers);

    // Create a new game
    uint256 startTime = block.timestamp;
    uint256 game = brCreateGameSystem.executeTyped(startTime, 0, 100, 1, 50, 1000, 0, 64);

    // Join the game
    brJoinGameSystem.executeTyped(piece, game);

    address winner = address(12345);
    vm.startPrank(winner);
    uint256 winnerPiece = spawnSystem.executeTyped();
    setControllerSystem.executeTyped(winnerPiece, controllers);
    brJoinGameSystem.executeTyped(winnerPiece, game);

    vm.stopPrank();
    // Start the game
    brStartGameSystem.executeTyped(game);

    // Grid is 200 x 200 right now
    // Move the piece to (0, 5)
    brMovePieceSystem.executeTyped(piece, game, Coord({ x: 0, y: 1 }));
    brMovePieceSystem.executeTyped(piece, game, Coord({ x: 0, y: 2 }));
    brMovePieceSystem.executeTyped(piece, game, Coord({ x: 0, y: 3 }));
    brMovePieceSystem.executeTyped(piece, game, Coord({ x: 0, y: 4 }));
    vm.warp(block.timestamp + 90);
    brMovePieceSystem.executeTyped(piece, game, Coord({ x: 0, y: 5 }));

    // Move forward in time
    vm.warp(block.timestamp + 96);

    // This piece should not be able to move since it is dead, but the piece type will not get set
    vm.expectRevert(BRPieceDead.selector);
    brMovePieceSystem.executeTyped(piece, game, Coord({ x: 0, y: 6 }));

    vm.startPrank(winner);
    brMovePieceSystem.executeTyped(winnerPiece, game, Coord({ x: 0, y: 1 }));
    // Check that lazy update worked and piece is dead
    assertTrue(!brIsAliveComponent.has(piece));
  }
}
