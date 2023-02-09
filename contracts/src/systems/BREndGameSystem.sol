// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import { System, IWorld } from "solecs/System.sol";
import { getAddressById } from "solecs/utils.sol";
import { BRGameComponent, ID as BRGameComponentID } from "components/BRGameComponent.sol";
import { BRGame, BRGameStatus } from "common/BRGame.sol";

uint256 constant ID = uint256(keccak256("system.BREndGameSystem"));

contract BREndGameSystem is System {
  constructor(IWorld _world, address _components) System(_world, _components) {}

  function execute(bytes memory arguments) public returns (bytes memory) {
    uint256 gameEntity = abi.decode(arguments, (uint256));
    BRGameComponent brGameComponent = BRGameComponent(getAddressById(components, BRGameComponentID));
    BRGame memory game = brGameComponent.getValue(gameEntity);
    brGameComponent.set(
      gameEntity,
      BRGame({
        startTime: game.startTime,
        rechargeTime: game.rechargeTime,
        initialGridDim: game.initialGridDim,
        secondsPerGridShrink: game.secondsPerGridShrink,
        perlinDenom: game.perlinDenom,
        perlinThresholdBanana: game.perlinThresholdBanana,
        perlinSeed: game.perlinSeed,
        perlinPrecision: game.perlinPrecision,
        status: BRGameStatus.OVER
      })
    );
  }

  function executeTyped(uint256 game) public returns (bytes memory) {
    return execute(abi.encode(game));
  }
}
