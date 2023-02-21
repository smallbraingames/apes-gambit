// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import { System, IWorld } from "solecs/System.sol";
import { getAddressById } from "solecs/utils.sol";
import { BRIsAliveComponent, ID as BRIsAliveComponentID } from "components/BRIsAliveComponent.sol";
import { PiecePositionComponent, ID as PiecePositionComponentID } from "components/PiecePositionComponent.sol";
import { BRGameComponent, ID as BRGameComponentID } from "components/BRGameComponent.sol";
import { BRGame, BRGameStatus } from "common/BRGame.sol";
import { BRLibPiece } from "libraries/BRLibPiece.sol";
import { BRLibGame } from "libraries/BRLibGame.sol";

uint256 constant ID = uint256(keccak256("system.BRKillOutOfBoundsPiecesSystem"));

contract BRKillOutOfBoundsPiecesSystem is System {
  constructor(IWorld _world, address _components) System(_world, _components) {}

  function execute(bytes memory arguments) public returns (bytes memory) {
    uint256 gameEntity = abi.decode(arguments, (uint256));
    BRGameComponent brGameComponent = BRGameComponent(getAddressById(components, BRGameComponentID));
    BRIsAliveComponent brIsAliveComponent = BRIsAliveComponent(getAddressById(components, BRIsAliveComponentID));
    PiecePositionComponent piecePositionComponent = PiecePositionComponent(
      getAddressById(components, PiecePositionComponentID)
    );
    if (BRLibGame.getGame(brGameComponent, gameEntity).status == BRGameStatus.IN_PROGRESS) {
      BRLibPiece.killPiecesOutOfBounds(world, brGameComponent, brIsAliveComponent, piecePositionComponent, gameEntity);
    }
  }

  function executeTyped(uint256 game) public returns (bytes memory) {
    return execute(abi.encode(game));
  }
}
