// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import { System, IWorld } from "solecs/System.sol";
import { BRPieceControllerSystem } from "common/BRPieceControllerSystem.sol";
import { BRLazyUpdater } from "common/BRLazyUpdater.sol";
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
import { BRBananasPickedUpComponent, ID as BRBananasPickedUpComponentID } from "components/BRBananasPickedUpComponent.sol";
import { BRPreviousMoveTimestampComponent, ID as BRPreviousMoveTimestampComponentID } from "components/BRPreviousMoveTimestampComponent.sol";
import { BRPiecePositionTrackerComponent, ID as BRPiecePositionTrackerComponentID } from "components/BRPiecePositionTrackerComponent.sol";
import { PieceTypeComponent, ID as PieceTypeComponentID } from "components/PieceTypeComponent.sol";
import { PiecePositionComponent, ID as PiecePositionComponentID } from "components/PiecePositionComponent.sol";
import { MovePieceSystem, ID as MovePieceSystemID } from "systems/MovePieceSystem.sol";
import { BRLibPiece } from "libraries/BRLibPiece.sol";
import { BRLibGame } from "libraries/BRLibGame.sol";
import { BRLibMap } from "libraries/BRLibMap.sol";

uint256 constant ID = uint256(keccak256("system.BRMovePieceSystem"));

contract BRMovePieceSystem is BRPieceControllerSystem {
  constructor(IWorld _world, address _components) System(_world, _components) {}

  function execute(bytes memory arguments) public returns (bytes memory) {
    (uint256 piece, uint256 game, Coord memory position) = abi.decode(arguments, (uint256, uint256, Coord));
    BRGameComponent brGameComponent = BRGameComponent(getAddressById(components, BRGameComponentID));
    BRPreviousMoveTimestampComponent brPreviousMoveTimestampComponent = BRPreviousMoveTimestampComponent(
      getAddressById(components, BRPreviousMoveTimestampComponentID)
    );
    BRPiecePositionTrackerComponent brPiecePositionTrackerComponent = BRPiecePositionTrackerComponent(
      getAddressById(components, BRPiecePositionTrackerComponentID)
    );
    PiecePositionComponent piecePositionComponent = PiecePositionComponent(
      getAddressById(components, PiecePositionComponentID)
    );
    MovePieceSystem movePieceSystem = MovePieceSystem(getSystemAddressById(components, MovePieceSystemID));

    // If the game has not started, just move the piece and return
    if (BRLibGame.getGame(brGameComponent, game).status == BRGameStatus.NOT_STARTED) {
      BRLibPiece.movePiece(
        movePieceSystem,
        piecePositionComponent,
        brPiecePositionTrackerComponent,
        position,
        piece,
        game
      );

      return abi.encode();
    }

    // Check that this piece can play
    checkCanPlay(piece, game);

    // Check if we are recharged enough to move, if so, update the previous move timestamp
    BRLibPiece.checkIsRecharged(brPreviousMoveTimestampComponent, brGameComponent, piece, game);
    brPreviousMoveTimestampComponent.set(piece, block.timestamp);

    // If there is a piece at this position, take it
    takePieceAtPosition(piece, game, position);

    // If there is a banana at this position, take it
    takeBananaAtPosition(piece, game, position);

    // Move piece
    BRLibPiece.movePiece(
      movePieceSystem,
      piecePositionComponent,
      brPiecePositionTrackerComponent,
      position,
      piece,
      game
    );
  }

  function executeTyped(uint256 piece, uint256 game, Coord memory position) public returns (bytes memory) {
    return execute(abi.encode(piece, game, position));
  }

  /// @notice Takes a piece at the given position and increments points
  function takePieceAtPosition(uint256 piece, uint256 game, Coord memory position) private {
    BRIsAliveComponent brIsAliveComponent = BRIsAliveComponent(getAddressById(components, BRIsAliveComponentID));
    BRPointsComponent brPointsComponent = BRPointsComponent(getAddressById(components, BRPointsComponentID));
    PieceTypeComponent pieceTypeComponent = PieceTypeComponent(getAddressById(components, PieceTypeComponentID));
    BRPiecePositionTrackerComponent brPiecePositionTrackerComponent = BRPiecePositionTrackerComponent(
      getAddressById(components, BRPiecePositionTrackerComponentID)
    );
    // Kill collided piece
    (bool hasCollidedPiece, uint256 collidedPiece) = BRLibPiece.getPieceAt(
      brPiecePositionTrackerComponent,
      position,
      game
    );
    if (hasCollidedPiece && collidedPiece != piece) {
      brIsAliveComponent.remove(collidedPiece);
      // Add points based on what type of piece was taken
      PieceType pieceType = pieceTypeComponent.getValue(collidedPiece);
      uint32 pointsGained = BRLibPiece.getPointsFromPieceType(pieceType);
      BRLibPiece.incrementPoints(brPointsComponent, piece, pointsGained);
    }
  }

  /// @notice Picks up a banana at position (if there is one there), and increments points
  function takeBananaAtPosition(uint256 piece, uint256 game, Coord memory position) private {
    BRBananasPickedUpComponent brBananasPickedUpComponent = BRBananasPickedUpComponent(
      getAddressById(components, BRBananasPickedUpComponentID)
    );
    BRGameComponent brGameComponent = BRGameComponent(getAddressById(components, BRGameComponentID));
    BRPointsComponent brPointsComponent = BRPointsComponent(getAddressById(components, BRPointsComponentID));

    if (BRLibMap.isBananaAtPosition(brGameComponent, brBananasPickedUpComponent, game, position)) {
      // Pick up banana
      uint256 positionEntity = BRLibMap.createBananaPickedUpComponentEntityFromPosition(position, game);
      uint32 pickedUpBananas = 1;
      if (brBananasPickedUpComponent.has(positionEntity)) {
        pickedUpBananas += brBananasPickedUpComponent.getValue(positionEntity);
      }
      brBananasPickedUpComponent.set(positionEntity, pickedUpBananas);
      // Increment points
      BRLibPiece.incrementPoints(brPointsComponent, piece, 1);
    }
  }
}
