// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { Coord } from "std-contracts/components/CoordComponent.sol";
import { BRGame } from "common/BRGame.sol";
import { BRGameComponent } from "components/BRGameComponent.sol";
import { BRBananasPickedUpComponent, ID as BRBananasPickedUpComponentID } from "components/BRBananasPickedUpComponent.sol";
import { BRLibGame } from "libraries/BRLibGame.sol";
import { ABDKMath64x64 as Math } from "abdk-libraries-solidity/ABDKMath64x64.sol";

import { Perlin } from "noise/Perlin.sol";

uint8 constant PERLIN_DIGITS = 3;

library BRLibMap {
  /// @notice Returns whether there is banana at a given location
  function isBananaAtPosition(
    BRGameComponent brGameComponent,
    BRBananasPickedUpComponent brBananasPickedUpComponent,
    uint256 game,
    Coord memory position
  ) internal view returns (bool) {
    BRGame memory brGame = BRLibGame.getGame(brGameComponent, game);
    int256 perlin = getPerlinAtPosition(brGameComponent, game, position);
    if (perlin >= int256(uint256(brGame.perlinThresholdBanana))) {
      uint256 positionEntity = createBananaPickedUpComponentEntityFromPosition(position, game);
      if (!brBananasPickedUpComponent.has(positionEntity)) {
        return true;
      }
      uint32 bananasPickedUp = brBananasPickedUpComponent.getValue(positionEntity);
      // Currently, bananas do not regenerate
      if (bananasPickedUp < 1) {
        return true;
      }
    }
    return false;
  }

  // @notice Gets 2D perlin noise for a given game at a given position
  function getPerlinAtPosition(
    BRGameComponent brGameComponent,
    uint256 game,
    Coord memory position
  ) internal view returns (int256) {
    BRGame memory brGame = BRLibGame.getGame(brGameComponent, game);
    return
      Math.muli(
        Perlin.noise2d(
          position.x + int32(uint32(brGame.perlinSeed)),
          position.y + int32(uint32(brGame.perlinSeed)),
          brGame.perlinDenom,
          brGame.perlinPrecision
        ),
        int256(10)**PERLIN_DIGITS
      );
  }

  /// @notice Get position-indexed entity ID for a component
  function createBananaPickedUpComponentEntityFromPosition(Coord memory position, uint256 game)
    internal
    pure
    returns (uint256)
  {
    return uint256(keccak256(abi.encode(position, game, BRBananasPickedUpComponentID)));
  }
}
