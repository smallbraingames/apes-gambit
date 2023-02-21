// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import { System, IWorld } from "solecs/System.sol";
import { Coord } from "std-contracts/components/CoordComponent.sol";
import { getAddressById, getSystemAddressById } from "solecs/utils.sol";
import { BRGame, BRGameStatus } from "common/BRGame.sol";
import { PieceType } from "common/PieceType.sol";
import { OwnerComponent, ID as OwnerComponentID } from "components/OwnerComponent.sol";
import { ControllerComponent, ID as ControllerComponentID } from "components/ControllerComponent.sol";
import { BRGameComponent, ID as BRGameComponentID } from "components/BRGameComponent.sol";
import { BRInGameComponent, ID as BRInGameComponentID } from "components/BRInGameComponent.sol";
import { BRIsAliveComponent, ID as BRIsAliveComponentID } from "components/BRIsAliveComponent.sol";
import { BRPiecePositionTrackerComponent, ID as BRPiecePositionTrackerComponentID } from "components/BRPiecePositionTrackerComponent.sol";
import { BRSetPieceTypeSystem, ID as BRSetPieceSystemID } from "systems/BRSetPieceTypeSystem.sol";
import { PiecePositionComponent, ID as PiecePositionComponentID } from "components/PiecePositionComponent.sol";
import { BRLibPiece } from "libraries/BRLibPiece.sol";
import { BRLibGame } from "libraries/BRLibGame.sol";

import { BRPointsComponent, ID as BRPointsComponentID } from "components/BRPointsComponent.sol";

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
    BRSetPieceTypeSystem brSetPieceTypeSystem = BRSetPieceTypeSystem(
      getSystemAddressById(components, BRSetPieceSystemID)
    );
    BRPiecePositionTrackerComponent brPiecePositionTrackerComponent = BRPiecePositionTrackerComponent(
      getAddressById(components, BRPiecePositionTrackerComponentID)
    );
    PiecePositionComponent piecePositionComponent = PiecePositionComponent(
      getAddressById(components, PiecePositionComponentID)
    );

    // Check that piece has the correct owner and controllers
    BRLibPiece.checkPieceOwnerAndControllers(ownerComponent, controllerComponent, piece, msg.sender);

    // Check that game has not started (checks that entity is a game)
    BRLibGame.checkGameNotStarted(brGameComponent, game);

    // Check that piece is not currently in a game
    BRLibGame.checkPieceNotInGame(brInGameComponent, piece);

    // If so, set in game component and alive component
    brInGameComponent.set(piece, game);
    brIsAliveComponent.set(piece);

    // Set points to 0
    BRPointsComponent brPointsComponent = BRPointsComponent(getAddressById(components, BRPointsComponentID));
    brPointsComponent.set(piece, 0);

    // Set piece type to pawn
    brSetPieceTypeSystem.executeTyped(piece, game, PieceType.PAWN);

    // Set tracker to position piece is at
    Coord memory piecePosition = piecePositionComponent.getValue(piece);
    BRLibPiece.checkPositionIsEmpty(brPiecePositionTrackerComponent, piecePosition, game);
    brPiecePositionTrackerComponent.set(
      BRLibPiece.createPiecePositionTrackerComponentEntityFromPosition(piecePosition, game),
      piece
    );
  }

  function executeTyped(uint256 piece, uint256 game) public returns (bytes memory) {
    return execute(abi.encode(piece, game));
  }
}
