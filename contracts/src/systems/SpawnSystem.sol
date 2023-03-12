// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import { System, IWorld } from "solecs/System.sol";
import { getAddressById } from "solecs/utils.sol";
import { PieceType } from "common/PieceType.sol";
import { Coord } from "std-contracts/components/CoordComponent.sol";
import { OwnerComponent, ID as OwnerComponentID } from "components/OwnerComponent.sol";
import { PieceTypeComponent, ID as PieceTypeComponentID } from "components/PieceTypeComponent.sol";
import { PiecePositionComponent, ID as PiecePositionComponentID } from "components/PiecePositionComponent.sol";

uint256 constant ID = uint256(keccak256("system.Spawn"));

contract SpawnSystem is System {
  constructor(IWorld _world, address _components) System(_world, _components) {}

  /// @notice Spawns a new piece with msg.sender as owner
  function execute(bytes memory arguments) public returns (bytes memory) {
    // Unique entity
    uint256 entityId = world.getUniqueEntityId();

    // Set owner to msg.sender
    OwnerComponent ownerComponent = OwnerComponent(getAddressById(components, OwnerComponentID));
    ownerComponent.set(entityId, msg.sender);

    // Set piece type to pawn
    PieceTypeComponent pieceTypeComponent = PieceTypeComponent(getAddressById(components, PieceTypeComponentID));
    pieceTypeComponent.set(entityId, PieceType.PAWN);

    // Set initial position to (0, 0)
    PiecePositionComponent piecePositionComponent = PiecePositionComponent(
      getAddressById(components, PiecePositionComponentID)
    );
    piecePositionComponent.set(entityId, Coord({ x: 0, y: 0 }));

    return abi.encode(entityId);
  }

  function executeTyped() public returns (uint256) {
    uint256 entityId = abi.decode(execute(abi.encode()), (uint256));
    return entityId;
  }
}
