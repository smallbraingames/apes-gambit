// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { BRGame, BRGameStatus } from "common/BRGame.sol";
import { SpawnSystem, ID as SpawnSystemID } from "systems/SpawnSystem.sol";
import { BRCreateGameSystem, ID as BRCreateGameSystemID } from "systems/BRCreateGameSystem.sol";
import { BRJoinGameSystem, ID as BRJoinGameSystemID } from "systems/BRJoinGameSystem.sol";
import { BRGameComponent, ID as BRGameComponentID } from "components/BRGameComponent.sol";
import { BRInGameComponent, ID as BRInGameComponentID } from "components/BRInGameComponent.sol";
import { BRAlreadyInGame } from "common/BRErrors.sol";

import { Deploy } from "./Deploy.sol";
import "std-contracts/test/MudTest.t.sol";
import { console } from "forge-std/console.sol";

contract BRJoinGameTest is MudTest {
  constructor() MudTest(new Deploy()) {}

  function testBRJoinGameController() public {
    SpawnSystem spawnSystem = SpawnSystem(system(SpawnSystemID));
    BRCreateGameSystem brCreateGameSystem = BRCreateGameSystem(system(BRCreateGameSystemID));
    BRJoinGameSystem brJoinGameSystem = BRJoinGameSystem(system(BRJoinGameSystemID));
    BRGameComponent brGameComponent = BRGameComponent(getAddressById(components, BRGameComponentID));
    BRInGameComponent brInGameComponent = BRInGameComponent(getAddressById(components, BRInGameComponentID));

    // Spawn a new piece
    uint256 piece = spawnSystem.executeTyped();

    // Start a new game
    uint256 startTime = block.timestamp;
    uint256 game = brCreateGameSystem.executeTyped(startTime, 0);
    BRGame memory brGame = brGameComponent.getValue(game);
    assertEq(uint8(brGame.status), uint8(BRGameStatus.NOT_STARTED));
    assertEq(brGame.startTime, startTime);

    // Piece joins the new game
    brJoinGameSystem.executeTyped(piece, game);
    assertEq(brInGameComponent.getValue(piece), game);

    // Piece cannot rejoin game
    vm.expectRevert(BRAlreadyInGame.selector);
    brJoinGameSystem.executeTyped(piece, game);
  }
}
