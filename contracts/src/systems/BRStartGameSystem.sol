// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import { System, IWorld } from "solecs/System.sol";
import { getAddressById } from "solecs/utils.sol";
import { BRGameComponent, ID as BRGameComponentID } from "components/BRGameComponent.sol";
import { BRLibGame } from "libraries/BRLibGame.sol";

uint256 constant ID = uint256(keccak256("system.BRStartGameSystem"));

contract BRStartGameSystem is System {
  constructor(IWorld _world, address _components) System(_world, _components) {}

  function execute(bytes memory arguments) public returns (bytes memory) {
    uint256 game = abi.decode(arguments, (uint256));
    BRGameComponent brGameComponent = BRGameComponent(getAddressById(components, BRGameComponentID));

    // Starts the game if it can be started
    BRLibGame.startGameChecked(brGameComponent, game);
  }

  function executeTyped(uint256 game) public returns (bytes memory) {
    return execute(abi.encode(game));
  }
}
