// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { Coord } from "std-contracts/components/CoordComponent.sol";
import { SpawnSystem, ID as SpawnSystemID } from "systems/SpawnSystem.sol";
import { SetControllerSystem, ID as SetControllerSystemID } from "systems/SetControllerSystem.sol";
import { BRCreateGameSystem, ID as BRCreateGameSystemID } from "systems/BRCreateGameSystem.sol";
import { BRJoinGameSystem, ID as BRJoinGameSystemID } from "systems/BRJoinGameSystem.sol";
import { BRStartGameSystem, ID as BRStartGameSystemID } from "systems/BRStartGameSystem.sol";
import { BRMovePieceSystem, ID as BRMovePieceSystemID } from "systems/BRMovePieceSystem.sol";
import { BRSetPieceTypeSystem, ID as BRSetPieceTypeSystemID } from "systems/BRSetPieceTypeSystem.sol";
import { BRRevokeControllerSystem, ID as BRRevokeControllerSystemID } from "systems/BRRevokeControllerSystem.sol";
import { ControllerComponent, ID as ControllerComponentID } from "components/ControllerComponent.sol";
import { BRAlreadyInGame } from "common/BRErrors.sol";
import { BRLibPiece } from "libraries/BRLibPiece.sol";
import { Deploy } from "./Deploy.sol";
import "std-contracts/test/MudTest.t.sol";
import { console } from "forge-std/console.sol";

contract BRRevokeControllerTest is MudTest {
  constructor() MudTest(new Deploy()) {}

  function testBRRevokeController() public {
    SpawnSystem spawnSystem = SpawnSystem(system(SpawnSystemID));
    BRCreateGameSystem brCreateGameSystem = BRCreateGameSystem(system(BRCreateGameSystemID));
    BRJoinGameSystem brJoinGameSystem = BRJoinGameSystem(system(BRJoinGameSystemID));
    SetControllerSystem setControllerSystem = SetControllerSystem(system(SetControllerSystemID));
    BRRevokeControllerSystem brRevokeControllerSystem = BRRevokeControllerSystem(system(BRRevokeControllerSystemID));

    // Spawn a new piece
    uint256 piece = spawnSystem.executeTyped();

    // Set the piece's controller to the BRMoveSystem and the BRPieceTypeSystem
    address[] memory controllers = new address[](2);
    controllers[0] = system(BRMovePieceSystemID);
    controllers[1] = system(BRSetPieceTypeSystemID);
    setControllerSystem.executeTyped(piece, controllers);

    // Create a new game
    uint256 startTime = block.timestamp;
    uint256 game = brCreateGameSystem.executeTyped(startTime, 0);

    // Join the game
    brJoinGameSystem.executeTyped(piece, game);

    // Revoke controllership and check
    brRevokeControllerSystem.executeTyped(piece);
    ControllerComponent controllerComponent = ControllerComponent(getAddressById(components, ControllerComponentID));
    // Piece should have no controllers
    assertTrue(!controllerComponent.has(piece) || controllerComponent.getValue(piece).length == 0);
  }
}
