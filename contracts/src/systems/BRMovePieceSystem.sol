// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import { System, IWorld } from "solecs/System.sol";
import { getAddressById, getSystemAddressById } from "solecs/utils.sol";
import { BRGame, BRGameStatus } from "common/BRGame.sol";
import { Coord } from "std-contracts/components/CoordComponent.sol";
import { PieceType } from "common/PieceType.sol";
import { OwnerComponent, ID as OwnerComponentID } from "components/OwnerComponent.sol";
import { ControllerComponent, ID as ControllerComponentID } from "components/ControllerComponent.sol";
import { BRGameComponent, ID as BRGameComponentID } from "components/BRGameComponent.sol";
import { BRInGameComponent, ID as BRInGameComponentID } from "components/BRInGameComponent.sol";
import { BRIsAliveComponent, ID as BRIsAliveComponentID } from "components/BRIsAliveComponent.sol";
import { BRPointsComponent, ID as BRPointsComponentID } from "components/BRPointsComponent.sol";
import { PieceTypeComponent, ID as PieceTypeComponentID } from "components/PieceTypeComponent.sol";
import { PiecePositionComponent, ID as PiecePositionComponentID } from "components/PiecePositionComponent.sol";
import { MovePieceSystem, ID as MovePieceSystemID } from "systems/MovePieceSystem.sol";
import { BRLibPiece } from "libraries/BRLibPiece.sol";
import { BRLibGame } from "libraries/BRLibGame.sol";

uint256 constant ID = uint256(keccak256("system.BRMovePieceSystem"));

contract BRMovePieceSystem is System {
  constructor(IWorld _world, address _components) System(_world, _components) {}

  function execute(bytes memory arguments) public returns (bytes memory) {
    (uint256 piece, uint256 game, Coord memory position) = abi.decode(arguments, (uint256, uint256, Coord));
    OwnerComponent ownerComponent = OwnerComponent(getAddressById(components, OwnerComponentID));
    ControllerComponent controllerComponent = ControllerComponent(getAddressById(components, ControllerComponentID));
    BRGameComponent brGameComponent = BRGameComponent(getAddressById(components, BRGameComponentID));
    BRInGameComponent brInGameComponent = BRInGameComponent(getAddressById(components, BRInGameComponentID));
    BRIsAliveComponent brIsAliveComponent = BRIsAliveComponent(getAddressById(components, BRIsAliveComponentID));
    MovePieceSystem movePieceSystem = MovePieceSystem(getSystemAddressById(components, MovePieceSystemID));

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

    takePieceAtPosition(piece, game, position);

    // Move piece
    movePieceSystem.executeTyped(piece, position);
  }

  function executeTyped(
    uint256 piece,
    uint256 game,
    Coord memory position
  ) public returns (bytes memory) {
    return execute(abi.encode(piece, game, position));
  }

  /// @notice Takes a piece at the given position and increments points
  function takePieceAtPosition(
    uint256 piece,
    uint256 game,
    Coord memory position
  ) private {
    BRInGameComponent brInGameComponent = BRInGameComponent(getAddressById(components, BRInGameComponentID));
    BRIsAliveComponent brIsAliveComponent = BRIsAliveComponent(getAddressById(components, BRIsAliveComponentID));
    BRPointsComponent brPointsComponent = BRPointsComponent(getAddressById(components, BRPointsComponentID));
    PiecePositionComponent piecePositionComponent = PiecePositionComponent(
      getAddressById(components, PiecePositionComponentID)
    );
    PieceTypeComponent pieceTypeComponent = PieceTypeComponent(getAddressById(components, PieceTypeComponentID));

    // Kill collided piece
    (bool hasCollidedPiece, uint256 collidedPiece) = BRLibPiece.getPieceAt(
      piecePositionComponent,
      brInGameComponent,
      brIsAliveComponent,
      position,
      game
    );
    if (hasCollidedPiece) {
      brIsAliveComponent.remove(collidedPiece);
      // Add points based on what type of piece was taken
      PieceType pieceType = pieceTypeComponent.getValue(collidedPiece);
      uint32 pointsGained = BRLibPiece.getPointsFromPieceType(pieceType);
      BRLibPiece.incrementPoints(brPointsComponent, piece, pointsGained);
    }
  }
}
