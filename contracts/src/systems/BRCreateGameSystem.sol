// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import { System, IWorld } from "solecs/System.sol";
import { getAddressById } from "solecs/utils.sol";
import { BRGame, BRGameStatus } from "common/BRGame.sol";
import { BRGameComponent, ID as BRGameComponentID } from "components/BRGameComponent.sol";

uint256 constant ID = uint256(keccak256("system.BRCreateGameSystem"));

contract BRCreateGameSystem is System {
  constructor(IWorld _world, address _components) System(_world, _components) {}

  /// @notice Spawns a new piece with msg.sender as owner
  function execute(bytes memory arguments) public returns (bytes memory) {
    (
      uint256 startTime,
      uint32 rechargeTime,
      uint16 initialGridDim,
      uint16 secondsPerGridShrink,
      int256 perlinDenom,
      uint16 perlinThresholdBanana,
      uint16 perlinSeed,
      uint8 perlinPrecision
    ) = abi.decode(arguments, (uint256, uint32, uint16, uint16, int256, uint16, uint16, uint8));

    // Unique entity
    uint256 entityId = world.getUniqueEntityId();

    // Create game
    BRGameComponent brGameComponent = BRGameComponent(getAddressById(components, BRGameComponentID));
    brGameComponent.set(
      entityId,
      BRGame({
        startTime: startTime,
        rechargeTime: rechargeTime,
        initialGridDim: initialGridDim,
        secondsPerGridShrink: secondsPerGridShrink,
        perlinDenom: perlinDenom,
        perlinThresholdBanana: perlinThresholdBanana,
        perlinSeed: perlinSeed,
        perlinPrecision: perlinPrecision,
        status: BRGameStatus.NOT_STARTED
      })
    );

    return abi.encode(entityId);
  }

  function executeTyped(
    uint256 startTime,
    uint32 rechargeTime,
    uint32 initialGridDim,
    uint32 secondsPerGridShrink,
    int256 perlinDenom,
    uint16 perlinThresholdBanana,
    uint16 perlinSeed,
    uint8 perlinPrecision
  ) public returns (uint256) {
    uint256 entityId = abi.decode(
      execute(
        abi.encode(
          startTime,
          rechargeTime,
          initialGridDim,
          secondsPerGridShrink,
          perlinDenom,
          perlinThresholdBanana,
          perlinSeed,
          perlinPrecision
        )
      ),
      (uint256)
    );
    return entityId;
  }
}
