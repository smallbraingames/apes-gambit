// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { Coord } from "std-contracts/components/CoordComponent.sol";
import { BRGame, BRGameStatus } from "common/BRGame.sol";
import { SpawnSystem, ID as SpawnSystemID } from "systems/SpawnSystem.sol";
import { SetControllerSystem, ID as SetControllerSystemID } from "systems/SetControllerSystem.sol";
import { BRCreateGameSystem, ID as BRCreateGameSystemID } from "systems/BRCreateGameSystem.sol";
import { BRJoinGameSystem, ID as BRJoinGameSystemID } from "systems/BRJoinGameSystem.sol";
import { BRStartGameSystem, ID as BRStartGameSystemID } from "systems/BRStartGameSystem.sol";
import { BRSetPieceTypeSystem, ID as BRSetPieceTypeSystemID } from "systems/BRSetPieceTypeSystem.sol";
import { BRMovePieceSystem, ID as BRMovePieceSystemID } from "systems/BRMovePieceSystem.sol";
import { BRGameComponent, ID as BRGameComponentID } from "components/BRGameComponent.sol";
import { BRIsAliveComponent, ID as BRIsAliveComponentID } from "components/BRIsAliveComponent.sol";
import { BRPointsComponent, ID as BRPointsComponentID } from "components/BRPointsComponent.sol";
import { BRBananasPickedUpComponent, ID as BRBananasPickedUpComponentID } from "components/BRBananasPickedUpComponent.sol";
import { BRAlreadyInGame } from "common/BRErrors.sol";
import { BRLibPiece } from "libraries/BRLibPiece.sol";
import { BRLibMap } from "libraries/BRLibMap.sol";
import { Deploy } from "./Deploy.sol";
import "std-contracts/test/MudTest.t.sol";
import { console } from "forge-std/console.sol";

contract BRMovePieceTest is MudTest {
  constructor() MudTest(new Deploy()) {}

  function testBRMovePiece() public {
    SpawnSystem spawnSystem = SpawnSystem(system(SpawnSystemID));
    BRCreateGameSystem brCreateGameSystem = BRCreateGameSystem(system(BRCreateGameSystemID));
    BRJoinGameSystem brJoinGameSystem = BRJoinGameSystem(system(BRJoinGameSystemID));
    BRStartGameSystem brStartGameSystem = BRStartGameSystem(system(BRStartGameSystemID));
    BRMovePieceSystem brMovePieceSystem = BRMovePieceSystem(system(BRMovePieceSystemID));
    SetControllerSystem setControllerSystem = SetControllerSystem(system(SetControllerSystemID));
    BRGameComponent brGameComponent = BRGameComponent(getAddressById(components, BRGameComponentID));

    // Spawn a new piece
    uint256 piece = spawnSystem.executeTyped();

    // Set the piece's controller to the BRMoveSystem
    address[] memory controllers = new address[](2);
    controllers[0] = system(BRMovePieceSystemID);
    controllers[1] = system(BRSetPieceTypeSystemID);
    setControllerSystem.executeTyped(piece, controllers);

    // Create a new game
    uint256 startTime = block.timestamp;
    uint256 game = brCreateGameSystem.executeTyped(startTime, 0, 100, 100, 50, 1000, 0, 64);

    // Join the game
    brJoinGameSystem.executeTyped(piece, game);

    // Start the game and check it has been started
    brStartGameSystem.executeTyped(game);
    BRGame memory brGame = brGameComponent.getValue(game);
    assertEq(uint8(brGame.status), uint8(BRGameStatus.IN_PROGRESS));

    // Move piece
    brMovePieceSystem.executeTyped(piece, game, Coord({ x: 0, y: 1 }));
  }

  function testBRTakePiece() public {
    SpawnSystem spawnSystem = SpawnSystem(system(SpawnSystemID));
    BRCreateGameSystem brCreateGameSystem = BRCreateGameSystem(system(BRCreateGameSystemID));
    BRJoinGameSystem brJoinGameSystem = BRJoinGameSystem(system(BRJoinGameSystemID));
    BRStartGameSystem brStartGameSystem = BRStartGameSystem(system(BRStartGameSystemID));
    BRMovePieceSystem brMovePieceSystem = BRMovePieceSystem(system(BRMovePieceSystemID));
    SetControllerSystem setControllerSystem = SetControllerSystem(system(SetControllerSystemID));
    BRIsAliveComponent brIsAliveComponent = BRIsAliveComponent(getAddressById(components, BRIsAliveComponentID));
    BRPointsComponent brPointsComponent = BRPointsComponent(getAddressById(components, BRPointsComponentID));

    // Setup
    uint256 piece = spawnSystem.executeTyped();

    // Set the piece's controller to the BRMoveSystem
    address[] memory controllers = new address[](2);
    controllers[0] = system(BRMovePieceSystemID);
    controllers[1] = system(BRSetPieceTypeSystemID);
    setControllerSystem.executeTyped(piece, controllers);

    // Create a new game
    uint256 startTime = block.timestamp;
    uint256 game = brCreateGameSystem.executeTyped(startTime, 0, 100, 100, 50, 2000, 0, 2);

    // Join the game
    brJoinGameSystem.executeTyped(piece, game);
    brMovePieceSystem.executeTyped(piece, game, Coord({ x: 0, y: 1 }));

    // Switch to a new user
    address taker = address(123456);
    vm.startPrank(taker);

    // Spawn a piece for taker, add controller, and join game
    uint256 takerPiece = spawnSystem.executeTyped();
    setControllerSystem.executeTyped(takerPiece, controllers);
    brJoinGameSystem.executeTyped(takerPiece, game);

    // Start the game
    brStartGameSystem.executeTyped(game);

    // Move taker piece one forward to take the original piece
    brMovePieceSystem.executeTyped(takerPiece, game, Coord({ x: 0, y: 1 }));
    assertTrue(!brIsAliveComponent.has(piece));
    assertTrue(!BRLibPiece.isPieceAlive(brIsAliveComponent, piece));
    // Took a pawn, so check value
    assertEq(brPointsComponent.getValue(takerPiece), 1);
  }

  function testBRTakeBanana() public {
    SpawnSystem spawnSystem = SpawnSystem(system(SpawnSystemID));
    BRCreateGameSystem brCreateGameSystem = BRCreateGameSystem(system(BRCreateGameSystemID));
    BRJoinGameSystem brJoinGameSystem = BRJoinGameSystem(system(BRJoinGameSystemID));
    BRStartGameSystem brStartGameSystem = BRStartGameSystem(system(BRStartGameSystemID));
    BRMovePieceSystem brMovePieceSystem = BRMovePieceSystem(system(BRMovePieceSystemID));
    SetControllerSystem setControllerSystem = SetControllerSystem(system(SetControllerSystemID));
    BRPointsComponent brPointsComponent = BRPointsComponent(getAddressById(components, BRPointsComponentID));
    BRGameComponent brGameComponent = BRGameComponent(getAddressById(components, BRGameComponentID));
    BRBananasPickedUpComponent brBananasPickedUpComponent = BRBananasPickedUpComponent(
      getAddressById(components, BRBananasPickedUpComponentID)
    );

    // Setup
    uint256 piece = spawnSystem.executeTyped();

    // Set the piece's controller to the BRMoveSystem
    address[] memory controllers = new address[](2);
    controllers[0] = system(BRMovePieceSystemID);
    controllers[1] = system(BRSetPieceTypeSystemID);
    setControllerSystem.executeTyped(piece, controllers);

    // Create a new game
    uint256 startTime = block.timestamp;
    uint256 game = brCreateGameSystem.executeTyped(startTime, 0, 100, 100, 3, 380, 0, 64);

    // Join the game
    brJoinGameSystem.executeTyped(piece, game);

    // Start the game
    brStartGameSystem.executeTyped(game);

    // Check if bananas are picked up
    // Perlin at positions (0, 1): 430, (0,2): 368, (0, 3): 500
    brMovePieceSystem.executeTyped(piece, game, Coord({ x: 0, y: 1 }));
    assertEq(brPointsComponent.getValue(piece), 1);
    uint256 positionEntity = BRLibMap.createBananaPickedUpComponentEntityFromPosition(Coord({ x: 0, y: 1 }), game);
    assertEq(brBananasPickedUpComponent.getValue(positionEntity), 1);

    // Go back and forth, and make sure only one more banana was picked up (we start at a banana)
    brMovePieceSystem.executeTyped(piece, game, Coord({ x: 0, y: 0 }));
    brMovePieceSystem.executeTyped(piece, game, Coord({ x: 0, y: 1 }));
    assertEq(brPointsComponent.getValue(piece), 2);
    assertEq(brBananasPickedUpComponent.getValue(positionEntity), 1);

    // Go two forward, and ensure just one banana picked up
    brMovePieceSystem.executeTyped(piece, game, Coord({ x: 0, y: 2 }));
    brMovePieceSystem.executeTyped(piece, game, Coord({ x: 0, y: 3 }));
    assertEq(brPointsComponent.getValue(piece), 3);
    uint256 secondPositionEntity = BRLibMap.createBananaPickedUpComponentEntityFromPosition(
      Coord({ x: 0, y: 2 }),
      game
    );
    uint256 thirdPositionEntity = BRLibMap.createBananaPickedUpComponentEntityFromPosition(Coord({ x: 0, y: 3 }), game);
    assertTrue(!brBananasPickedUpComponent.has(secondPositionEntity));
    assertEq(brBananasPickedUpComponent.getValue(thirdPositionEntity), 1);
  }
}
