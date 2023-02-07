// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { Coord } from "std-contracts/components/CoordComponent.sol";
import { BRGame, BRGameStatus } from "common/BRGame.sol";
import { SpawnSystem, ID as SpawnSystemID } from "systems/SpawnSystem.sol";
import { SetControllerSystem, ID as SetControllerSystemID } from "systems/SetControllerSystem.sol";
import { BRCreateGameSystem, ID as BRCreateGameSystemID } from "systems/BRCreateGameSystem.sol";
import { BRJoinGameSystem, ID as BRJoinGameSystemID } from "systems/BRJoinGameSystem.sol";
import { BRStartGameSystem, ID as BRStartGameSystemID } from "systems/BRStartGameSystem.sol";
import { BRMovePieceSystem, ID as BRMovePieceSystemID } from "systems/BRMovePieceSystem.sol";
import { BRIsAliveComponent, ID as BRIsAliveComponentID } from "components/BRIsAliveComponent.sol";
import { BRPointsComponent, ID as BRPointsComponentID } from "components/BRPointsComponent.sol";
import { BRNotRecharged } from "common/BRErrors.sol";
import { Deploy } from "./Deploy.sol";
import "std-contracts/test/MudTest.t.sol";
import { console } from "forge-std/console.sol";

contract BRPieceRechargeTest is MudTest {
  constructor() MudTest(new Deploy()) {}

  function testBRPieceRecharge() public {
    SpawnSystem spawnSystem = SpawnSystem(system(SpawnSystemID));
    BRCreateGameSystem brCreateGameSystem = BRCreateGameSystem(system(BRCreateGameSystemID));
    BRJoinGameSystem brJoinGameSystem = BRJoinGameSystem(system(BRJoinGameSystemID));
    BRStartGameSystem brStartGameSystem = BRStartGameSystem(system(BRStartGameSystemID));
    BRMovePieceSystem brMovePieceSystem = BRMovePieceSystem(system(BRMovePieceSystemID));
    SetControllerSystem setControllerSystem = SetControllerSystem(system(SetControllerSystemID));

    // Spawn a new piece
    uint256 piece = spawnSystem.executeTyped();

    // Set the piece's controller to the BRMoveSystem
    address[] memory controllers = new address[](1);
    controllers[0] = system(BRMovePieceSystemID);
    setControllerSystem.executeTyped(piece, controllers);

    // Create a new game
    uint256 startTime = block.timestamp;
    uint256 game = brCreateGameSystem.executeTyped(startTime, 5, 100, 100);

    // Join the game
    brJoinGameSystem.executeTyped(piece, game);

    // Start the game and check it has been started
    brStartGameSystem.executeTyped(game);

    // Move piece
    brMovePieceSystem.executeTyped(piece, game, Coord({ x: 0, y: 1 }));

    // Expect revert on moving piece immediately after
    vm.expectRevert(BRNotRecharged.selector);
    brMovePieceSystem.executeTyped(piece, game, Coord({ x: 0, y: 2 }));

    vm.warp(block.timestamp + 5);
    brMovePieceSystem.executeTyped(piece, game, Coord({ x: 0, y: 2 }));
  }
}
