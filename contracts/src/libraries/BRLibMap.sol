// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { Coord } from "std-contracts/components/CoordComponent.sol";
import { BRGame } from "common/BRGame.sol";
import { BRGameComponent } from "components/BRGameComponent.sol";
import { BRBananasPickedUpComponent, ID as BRBananasPickedUpComponentID } from "components/BRBananasPickedUpComponent.sol";
import { BRLibGame } from "libraries/BRLibGame.sol";

import { Perlin } from "noise/Perlin.sol";

library BRLibMap {
  /// @notice Returns whether there is banana at a given location
  function isBananaAtPosition(
    BRGameComponent brGameComponent,
    BRBananasPickedUpComponent brBananasPickedUpComponent,
    uint256 game,
    Coord memory position
  ) internal view returns (bool) {
    BRGame memory brGame = BRLibGame.getGame(brGameComponent, game);
    int128 perlin = getPerlinAtPosition(brGameComponent, game, position);
    if (perlin >= brGame.perlinThresholdBanana) {
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
  ) internal view returns (int128) {
    BRGame memory brGame = BRLibGame.getGame(brGameComponent, game);
    return
      Perlin.noise2d(
        position.x + int32(uint32(brGame.perlinSeed)),
        position.y + int32(uint32(brGame.perlinSeed)),
        brGame.perlinDenom,
        brGame.perlinPrecision
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
