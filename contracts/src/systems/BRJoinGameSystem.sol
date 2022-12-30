// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import { System, IWorld } from "solecs/System.sol";
import { getAddressById } from "solecs/utils.sol";
import { BRGame, BRGameStatus } from "common/BRGame.sol";
import { OwnerComponent, ID as OwnerComponentID } from "components/OwnerComponent.sol";
import { ControllerComponent, ID as ControllerComponentID } from "components/ControllerComponent.sol";
import { BRGameComponent, ID as BRGameComponentID } from "components/BRGameComponent.sol";
import { BRInGameComponent, ID as BRInGameComponentID } from "components/BRInGameComponent.sol";
import { BRIsAliveComponent, ID as BRIsAliveComponentID } from "components/BRIsAliveComponent.sol";

import { BRLibGame } from "libraries/BRLibGame.sol";

uint256 constant ID = uint256(keccak256("system.BRJoinGameSystem"));

contract BRJoinGameSystem is System {
  constructor(IWorld _world, address _components) System(_world, _components) {}

  function execute(bytes memory arguments) public returns (bytes memory) {
    (uint256 piece, uint256 game) = abi.decode(arguments, (uint256, uint256));
    OwnerComponent ownerComponent = OwnerComponent(getAddressById(components, OwnerComponentID));
    ControllerComponent controllerComponent = ControllerComponent(getAddressById(components, ControllerComponentID));
    BRGameComponent brGameComponent = BRGameComponent(getAddressById(components, BRGameComponentID));
    BRInGameComponent brInGameComponent = BRInGameComponent(getAddressById(components, BRInGameComponentID));
    BRIsAliveComponent brIsAliveComponent = BRIsAliveComponent(getAddressById(components, BRIsAliveComponentID));

    // Check that piece has the correct owner and controllers
    BRLibGame.checkPieceOwnerAndControllers(ownerComponent, controllerComponent, piece, msg.sender);

    // Check that game has not started (checks that entity is a game)
    BRLibGame.checkGameNotStarted(brGameComponent, game);

    // Check that piece is not currently in a game
    BRLibGame.checkPieceNotInGame(brInGameComponent, piece);

    // If so, set in game component and alive component
    brInGameComponent.set(piece, game);
    brIsAliveComponent.set(piece);
  }

  function executeTyped(uint256 piece, uint256 game) public returns (bytes memory) {
    return execute(abi.encode(piece, game));
  }
}
