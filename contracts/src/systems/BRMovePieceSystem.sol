// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import { System, IWorld } from "solecs/System.sol";
import { getAddressById, getSystemAddressById } from "solecs/utils.sol";
import { BRGame, BRGameStatus } from "common/BRGame.sol";
import { Coord } from "std-contracts/components/CoordComponent.sol";
import { OwnerComponent, ID as OwnerComponentID } from "components/OwnerComponent.sol";
import { ControllerComponent, ID as ControllerComponentID } from "components/ControllerComponent.sol";
import { BRGameComponent, ID as BRGameComponentID } from "components/BRGameComponent.sol";
import { BRInGameComponent, ID as BRInGameComponentID } from "components/BRInGameComponent.sol";
import { BRIsAliveComponent, ID as BRIsAliveComponentID } from "components/BRIsAliveComponent.sol";
import { PiecePositionComponent, ID as PiecePositionComponentID } from "components/PiecePositionComponent.sol";
import { MovePieceSystem, ID as MovePieceSystemID } from "systems/MovePieceSystem.sol";
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
    PiecePositionComponent piecePositionComponent = PiecePositionComponent(
      getAddressById(components, PiecePositionComponentID)
    );
    MovePieceSystem movePieceSystem = MovePieceSystem(getSystemAddressById(components, MovePieceSystemID));

    // Check that this piece can play
    BRLibGame.checkCanPlay(
      ownerComponent,
      controllerComponent,
      brGameComponent,
      brInGameComponent,
      brIsAliveComponent,
      piece,
      game,
      msg.sender
    );

    // Kill collided piece
    (bool hasCollidedPiece, uint256 collidedPiece) = BRLibGame.getPieceAt(
      piecePositionComponent,
      brInGameComponent,
      brIsAliveComponent,
      position,
      game
    );
    if (hasCollidedPiece) {
      brIsAliveComponent.remove(collidedPiece);
    }

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
}
