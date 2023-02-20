// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import { PieceType } from "common/PieceType.sol";
import { BRGame, BRGameStatus } from "common/BRGame.sol";
import { System, IWorld } from "solecs/System.sol";
import { BRPieceControllerSystem } from "common/BRPieceControllerSystem.sol";
import { getAddressById, getSystemAddressById } from "solecs/utils.sol";
import { OwnerComponent, ID as OwnerComponentID } from "components/OwnerComponent.sol";
import { PiecePositionComponent, ID as PiecePositionComponentID } from "components/PiecePositionComponent.sol";
import { ControllerComponent, ID as ControllerComponentID } from "components/ControllerComponent.sol";
import { BRGameComponent, ID as BRGameComponentID } from "components/BRGameComponent.sol";
import { BRInGameComponent, ID as BRInGameComponentID } from "components/BRInGameComponent.sol";
import { BRIsAliveComponent, ID as BRIsAliveComponentID } from "components/BRIsAliveComponent.sol";
import { BRPointsComponent, ID as BRPointsComponentID } from "components/BRPointsComponent.sol";
import { SetPieceTypeSystem, ID as SetPieceTypeSystemID } from "systems/SetPieceTypeSystem.sol";
import { ID as BRJoinGameSystemID } from "systems/BRJoinGameSystem.sol";
import { ID as BRLeaveGameSystemID } from "systems/BRLeaveGameSystem.sol";
import { BRLibPiece } from "libraries/BRLibPiece.sol";
import { BRLibGame } from "libraries/BRLibPiece.sol";

uint256 constant ID = uint256(keccak256("system.BRSetPieceTypeSystem"));

contract BRSetPieceTypeSystem is BRPieceControllerSystem {
  constructor(IWorld _world, address _components) System(_world, _components) {}

  /// @notice Spawns a new piece with msg.sender as owner
  /// @dev Logic split up this way to avoid stack too deep errors
  function execute(bytes memory arguments) public returns (bytes memory) {
    (uint256 piece, uint256 game, PieceType pieceType) = abi.decode(arguments, (uint256, uint256, PieceType));

    // If the piece is in this game, the game is over, allow piece to be set back to pawn
    bool setToPawn = setPieceTypeToPawnIfEndGameSystem(piece, game);
    if (setToPawn) {
      return abi.encode();
    }

    // Else, try to set the piece type
    setPieceTypeChecked(piece, game, pieceType);
  }

  function executeTyped(
    uint256 piece,
    uint256 game,
    PieceType pieceType
  ) public returns (bytes memory) {
    return execute(abi.encode(piece, game, pieceType));
  }

  function setPieceTypeChecked(
    uint256 piece,
    uint256 game,
    PieceType pieceType
  ) private {
    BRPointsComponent brPointsComponent = BRPointsComponent(getAddressById(components, BRPointsComponentID));
    SetPieceTypeSystem setPieceTypeSystem = SetPieceTypeSystem(getSystemAddressById(components, SetPieceTypeSystemID));
    // Check that this piece can play
    checkCanPlay(piece, game);

    // Decrement points (checks if piece has enough points)
    uint32 pieceTypePoints = BRLibPiece.getPointsFromPieceType(pieceType);
    BRLibPiece.decrementPoints(brPointsComponent, piece, pieceTypePoints);

    // Set piece type
    setPieceTypeSystem.executeTyped(piece, pieceType);
  }

  function setPieceTypeToPawnIfEndGameSystem(uint256 piece, uint256 game) private returns (bool) {
    if (
      msg.sender != getSystemAddressById(components, BRLeaveGameSystemID) &&
      msg.sender != getSystemAddressById(components, BRJoinGameSystemID)
    ) {
      return false;
    }
    SetPieceTypeSystem setPieceTypeSystem = SetPieceTypeSystem(getSystemAddressById(components, SetPieceTypeSystemID));
    setPieceTypeSystem.executeTyped(piece, PieceType.PAWN);
    return true;
  }
}
