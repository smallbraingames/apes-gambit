// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import { System, IWorld } from "solecs/System.sol";
import { getSystemAddressById, getAddressById } from "solecs/utils.sol";
import { BRPieceControllerSystem } from "common/BRPieceControllerSystem.sol";
import { ID as BRSetPieceSystemID } from "systems/BRSetPieceTypeSystem.sol";
import { ID as BRMovePieceSystemID } from "systems/BRMovePieceSystem.sol";
import { BRInGameComponent, ID as BRInGameComponentID } from "components/BRInGameComponent.sol";
import { BRIsAliveComponent, ID as BRIsAliveComponentID } from "components/BRIsAliveComponent.sol";

uint256 constant ID = uint256(keccak256("system.BRLeaveGameSystem"));

contract BRLeaveGameSystem is System {
  constructor(IWorld _world, address _components) System(_world, _components) {}

  function execute(bytes memory arguments) public returns (bytes memory) {
    uint256 piece = abi.decode(arguments, (uint256));
    // Cleanup components
    BRInGameComponent brInGameComponent = BRInGameComponent(getAddressById(components, BRInGameComponentID));
    BRIsAliveComponent brIsAliveComponent = BRIsAliveComponent(getAddressById(components, BRIsAliveComponentID));
    brInGameComponent.remove(piece);
    brIsAliveComponent.remove(piece);

    // Revoke system access
    BRPieceControllerSystem brSetPieceSystem = BRPieceControllerSystem(
      getSystemAddressById(components, BRSetPieceSystemID)
    );
    BRPieceControllerSystem brMovePieceSystem = BRPieceControllerSystem(
      getSystemAddressById(components, BRMovePieceSystemID)
    );
    brSetPieceSystem.revokeController(piece);
    brMovePieceSystem.revokeController(piece);
  }

  function executeTyped(uint256 piece) public returns (bytes memory) {
    return execute(abi.encode(piece));
  }
}
