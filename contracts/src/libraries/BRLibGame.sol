// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { BRGame, BRGameStatus } from "common/BRGame.sol";
import { OwnerComponent } from "components/OwnerComponent.sol";
import { ControllerComponent } from "components/ControllerComponent.sol";
import { BRGameComponent } from "components/BRGameComponent.sol";
import { BRInGameComponent } from "components/BRInGameComponent.sol";
import { BRIncorrectControllers, BRGameNotStarted, BREntityNotGame, BRGameAlreadyStarted, BRAlreadyInGame } from "common/BRErrors.sol";
import { LibOwner } from "libraries/LibOwner.sol";

library BRLibGame {
  /// @notice Gets the game at an entity
  function getGame(BRGameComponent brGameComponent, uint256 game) internal view returns (BRGame memory) {
    if (!brGameComponent.has(game)) {
      revert BREntityNotGame();
    }
    BRGame memory brGame = brGameComponent.getValue(game);
    return brGame;
  }

  /// @notice Checks if a game has not yet started
  function checkGameNotStarted(BRGameComponent brGameComponent, uint256 game) internal view {
    BRGame memory brGame = getGame(brGameComponent, game);
    if (brGame.status != BRGameStatus.NOT_STARTED) {
      revert BRGameAlreadyStarted();
    }
  }

  /// @notice Checks that a piece is not in a game
  function checkPieceNotInGame(BRInGameComponent brInGameComponent, uint256 piece) internal view {
    if (brInGameComponent.has(piece)) {
      revert BRAlreadyInGame();
    }
  }

  /// @notice Checks whether a piece has the correct associated controllers and that the passed owner
  /// is the correct owner, used to validate that the called of BR contracts has authority to move or
  /// modify the piece they are trying to
  function checkPieceOwnerAndControllers(
    OwnerComponent ownerComponent,
    ControllerComponent controllerComponent,
    uint256 entity,
    address ownerCheckAddress
  ) internal view {
    LibOwner.checkIsOwner(ownerComponent, entity, ownerCheckAddress);
    checkPieceControllers(controllerComponent, entity);
  }

  /// @notice Checks whether a piece has the correct associated controllers
  function checkPieceControllers(ControllerComponent controllerComponent, uint256 entity) internal view {}
}
