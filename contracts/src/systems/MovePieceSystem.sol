// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import { System, IWorld } from "solecs/System.sol";
import { getAddressById } from "solecs/utils.sol";
import { PieceType } from "common/PieceType.sol";
import { Coord } from "std-contracts/components/CoordComponent.sol";
import { OwnerComponent, ID as OwnerComponentID } from "components/OwnerComponent.sol";
import { ControllerComponent, ID as ControllerComponentID } from "components/ControllerComponent.sol";
import { PieceTypeComponent, ID as PieceTypeComponentID } from "components/PieceTypeComponent.sol";
import { PiecePositionComponent, ID as PiecePositionComponentID } from "components/PiecePositionComponent.sol";
import { LibController } from "libraries/LibController.sol";
import { LibMove } from "libraries/LibMove.sol";

uint256 constant ID = uint256(keccak256("system.MovePiece"));

contract MovePieceSystem is System {
  constructor(IWorld _world, address _components) System(_world, _components) {}

  function execute(bytes memory arguments) public returns (bytes memory) {
    (uint256 entity, Coord memory position) = abi.decode(arguments, (uint256, Coord));

    OwnerComponent ownerComponent = OwnerComponent(getAddressById(components, OwnerComponentID));
    ControllerComponent controllerComponent = ControllerComponent(getAddressById(components, ControllerComponentID));
    PieceTypeComponent pieceTypeComponent = PieceTypeComponent(getAddressById(components, PieceTypeComponentID));
    PiecePositionComponent piecePositionComponent = PiecePositionComponent(
      getAddressById(components, PiecePositionComponentID)
    );

    // Check that msg.sender can control the entity
    LibController.checkCanControl(controllerComponent, ownerComponent, entity, msg.sender);

    // Check that move is valid
    Coord memory startPosition = piecePositionComponent.getValue(entity);
    PieceType pieceType = pieceTypeComponent.getValue(entity);
    LibMove.checkValidMove(startPosition, position, pieceType);

    // If so, set position
    piecePositionComponent.set(entity, position);
  }

  function executeTyped(uint256 entity, Coord memory position) public returns (bytes memory) {
    return execute(abi.encode(entity, position));
  }
}
