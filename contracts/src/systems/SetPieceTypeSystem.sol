// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import { System, IWorld } from "solecs/System.sol";
import { getAddressById } from "solecs/utils.sol";
import { PieceType } from "common/PieceType.sol";
import { OwnerComponent, ID as OwnerComponentID } from "components/OwnerComponent.sol";
import { ControllerComponent, ID as ControllerComponentID } from "components/ControllerComponent.sol";
import { PieceTypeComponent, ID as PieceTypeComponentID } from "components/PieceTypeComponent.sol";
import { LibController } from "libraries/LibController.sol";

uint256 constant ID = uint256(keccak256("system.SetPieceType"));

contract SetPieceTypeSystem is System {
  constructor(IWorld _world, address _components) System(_world, _components) {}

  function execute(bytes memory arguments) public returns (bytes memory) {
    (uint256 entity, PieceType pieceType) = abi.decode(arguments, (uint256, PieceType));

    OwnerComponent ownerComponent = OwnerComponent(getAddressById(components, OwnerComponentID));
    ControllerComponent controllerComponent = ControllerComponent(getAddressById(components, ControllerComponentID));
    PieceTypeComponent pieceTypeComponent = PieceTypeComponent(getAddressById(components, PieceTypeComponentID));

    // Check that msg.sender can control the entity
    LibController.checkCanControl(controllerComponent, ownerComponent, entity, msg.sender);

    // If so, set piece type
    pieceTypeComponent.set(entity, pieceType);
  }

  function executeTyped(uint256 entity, PieceType pieceType) public returns (bytes memory) {
    return execute(abi.encode(entity, pieceType));
  }
}
