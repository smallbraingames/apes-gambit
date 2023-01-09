// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import { PieceType } from "common/PieceType.sol";
import { System, IWorld } from "solecs/System.sol";
import { getAddressById, getSystemAddressById } from "solecs/utils.sol";
import { OwnerComponent, ID as OwnerComponentID } from "components/OwnerComponent.sol";
import { ControllerComponent, ID as ControllerComponentID } from "components/ControllerComponent.sol";
import { BRGameComponent, ID as BRGameComponentID } from "components/BRGameComponent.sol";
import { BRInGameComponent, ID as BRInGameComponentID } from "components/BRInGameComponent.sol";
import { BRIsAliveComponent, ID as BRIsAliveComponentID } from "components/BRIsAliveComponent.sol";
import { BRPointsComponent, ID as BRPointsComponentID } from "components/BRPointsComponent.sol";
import { SetPieceTypeSystem, ID as SetPieceTypeSystemID } from "systems/SetPieceTypeSystem.sol";
import { BRLibPiece } from "libraries/BRLibPiece.sol";

uint256 constant ID = uint256(keccak256("system.BRSetPieceTypeSystem"));

contract BRSetPieceTypeSystem is System {
  constructor(IWorld _world, address _components) System(_world, _components) {}

  /// @notice Spawns a new piece with msg.sender as owner
  function execute(bytes memory arguments) public returns (bytes memory) {
    (uint256 piece, uint256 game, PieceType pieceType) = abi.decode(arguments, (uint256, uint256, PieceType));

    OwnerComponent ownerComponent = OwnerComponent(getAddressById(components, OwnerComponentID));
    ControllerComponent controllerComponent = ControllerComponent(getAddressById(components, ControllerComponentID));
    BRGameComponent brGameComponent = BRGameComponent(getAddressById(components, BRGameComponentID));
    BRInGameComponent brInGameComponent = BRInGameComponent(getAddressById(components, BRInGameComponentID));
    BRIsAliveComponent brIsAliveComponent = BRIsAliveComponent(getAddressById(components, BRIsAliveComponentID));
    BRPointsComponent brPointsComponent = BRPointsComponent(getAddressById(components, BRPointsComponentID));
    SetPieceTypeSystem setPieceTypeSystem = SetPieceTypeSystem(getSystemAddressById(components, SetPieceTypeSystemID));

    // Check that this piece can play
    BRLibPiece.checkCanPlay(
      ownerComponent,
      controllerComponent,
      brGameComponent,
      brInGameComponent,
      brIsAliveComponent,
      piece,
      game,
      msg.sender
    );

    // Decrement points (checks if piece has enough points)
    uint32 pieceTypePoints = BRLibPiece.getPointsFromPieceType(pieceType);
    BRLibPiece.decrementPoints(brPointsComponent, piece, pieceTypePoints);

    // Set piece type
    setPieceTypeSystem.executeTyped(piece, pieceType);
  }

  function executeTyped(
    uint256 piece,
    uint256 game,
    PieceType pieceType
  ) public returns (bytes memory) {
    return execute(abi.encode(piece, game, pieceType));
  }
}
