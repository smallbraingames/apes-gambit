// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import { System, IWorld } from "solecs/System.sol";
import { getSystemAddressById } from "solecs/utils.sol";
import { BRPieceControllerSystem } from "common/BRPieceControllerSystem.sol";
import { ID as BRSetPieceSystemID } from "systems/BRSetPieceTypeSystem.sol";
import { ID as BRMovePieceSystemID } from "systems/BRMovePieceSystem.sol";

uint256 constant ID = uint256(keccak256("system.BRRevokeControllerSystem"));

contract BRRevokeControllerSystem is System {
  constructor(IWorld _world, address _components) System(_world, _components) {}

  function execute(bytes memory arguments) public returns (bytes memory) {
    uint256 piece = abi.decode(arguments, (uint256));
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
