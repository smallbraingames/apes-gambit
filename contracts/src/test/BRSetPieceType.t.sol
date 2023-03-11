// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { Coord } from "std-contracts/components/CoordComponent.sol";
import { PieceType } from "common/PieceType.sol";
import { SpawnSystem, ID as SpawnSystemID } from "systems/SpawnSystem.sol";
import { SetControllerSystem, ID as SetControllerSystemID } from "systems/SetControllerSystem.sol";
import { BRCreateGameSystem, ID as BRCreateGameSystemID } from "systems/BRCreateGameSystem.sol";
import { BRJoinGameSystem, ID as BRJoinGameSystemID } from "systems/BRJoinGameSystem.sol";
import { BRStartGameSystem, ID as BRStartGameSystemID } from "systems/BRStartGameSystem.sol";
import { BRMovePieceSystem, ID as BRMovePieceSystemID } from "systems/BRMovePieceSystem.sol";
import { BRSetPieceTypeSystem, ID as BRSetPieceTypeSystemID } from "systems/BRSetPieceTypeSystem.sol";
import { PieceTypeComponent, ID as PieceTypeComponentID } from "components/PieceTypeComponent.sol";
import { BRNotEnoughPoints } from "common/BRErrors.sol";
import { BRLibPiece } from "libraries/BRLibPiece.sol";
import { Deploy } from "./Deploy.sol";
import "std-contracts/test/MudTest.t.sol";
import { console } from "forge-std/console.sol";

contract BRMovePieceTest is MudTest {
  constructor() MudTest(new Deploy()) {}

  function testBRSetPieceType() public {
    BRCreateGameSystem brCreateGameSystem = BRCreateGameSystem(system(BRCreateGameSystemID));
    BRStartGameSystem brStartGameSystem = BRStartGameSystem(system(BRStartGameSystemID));
    BRMovePieceSystem brMovePieceSystem = BRMovePieceSystem(system(BRMovePieceSystemID));
    BRSetPieceTypeSystem brSetPieceTypeSystem = BRSetPieceTypeSystem(system(BRSetPieceTypeSystemID));
    PieceTypeComponent pieceTypeComponent = PieceTypeComponent(getAddressById(components, PieceTypeComponentID));

    // Create a new game
    uint256 startTime = block.timestamp;
    uint256 game = brCreateGameSystem.executeTyped(startTime, 0, 100, 100, 50, 1000, 0, 64);

    // Setup players
    address one = address(223456);
    address two = address(323456);
    address three = address(43456);

    // Move pieces to locations
    Coord memory oneLocation = Coord({ x: -1, y: 0 });
    Coord memory twoLocation = Coord({ x: 0, y: 1 });
    Coord memory threeLocation = Coord({ x: 1, y: 0 });

    vm.startPrank(one);
    uint256 onePiece = spawnPieceAndJoinGame(game);
    brMovePieceSystem.executeTyped(onePiece, game, oneLocation);
    vm.stopPrank();

    vm.startPrank(two);
    uint256 twoPiece = spawnPieceAndJoinGame(game);
    brMovePieceSystem.executeTyped(twoPiece, game, twoLocation);
    vm.stopPrank();

    vm.startPrank(three);
    uint256 threePiece = spawnPieceAndJoinGame(game);
    brMovePieceSystem.executeTyped(threePiece, game, threeLocation);
    vm.stopPrank();

    // Players join game
    uint256 takerPiece = spawnPieceAndJoinGame(game);

    // Start game
    brStartGameSystem.executeTyped(game);

    // Take three pieces, upgrade, and check
    brMovePieceSystem.executeTyped(takerPiece, game, Coord({ x: 0, y: 0 }));
    brMovePieceSystem.executeTyped(takerPiece, game, oneLocation);
    brMovePieceSystem.executeTyped(takerPiece, game, twoLocation);
    vm.expectRevert(BRNotEnoughPoints.selector);
    brSetPieceTypeSystem.executeTyped(takerPiece, game, PieceType.KNIGHT);
    brMovePieceSystem.executeTyped(takerPiece, game, threeLocation);
    brSetPieceTypeSystem.executeTyped(takerPiece, game, PieceType.KNIGHT);
    assertEq(uint8(pieceTypeComponent.getValue(takerPiece)), uint8(PieceType.KNIGHT));
    vm.expectRevert(BRNotEnoughPoints.selector);
    brSetPieceTypeSystem.executeTyped(takerPiece, game, PieceType.BISHOP);
  }

  function spawnPieceAndJoinGame(uint256 game) private returns (uint256) {
    SpawnSystem spawnSystem = SpawnSystem(system(SpawnSystemID));
    SetControllerSystem setControllerSystem = SetControllerSystem(system(SetControllerSystemID));
    BRJoinGameSystem brJoinGameSystem = BRJoinGameSystem(system(BRJoinGameSystemID));
    address[] memory controllers = new address[](2);
    controllers[0] = system(BRMovePieceSystemID);
    controllers[1] = system(BRSetPieceTypeSystemID);
    uint256 piece = spawnSystem.executeTyped("test");
    setControllerSystem.executeTyped(piece, controllers);
    brJoinGameSystem.executeTyped(piece, game);
    return piece;
  }
}
