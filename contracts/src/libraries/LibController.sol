// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import { ControllerComponent } from "components/ControllerComponent.sol";
import { OwnerComponent } from "components/OwnerComponent.sol";
import { LibOwner } from "libraries/LibOwner.sol";
import { NotController, AlreadyHasController, CannotControl } from "common/Errors.sol";

library LibController {
  /// @notice Checks if an entity has no controllers
  function checkNoControllers(ControllerComponent controllerComponent, uint256 entity) internal view {
    if (getNumControllers(controllerComponent, entity) > 0) {
      revert AlreadyHasController();
    }
  }

  /// @notice Returns number of controllers of an entity
  function getNumControllers(ControllerComponent controllerComponent, uint256 entity) internal view returns (uint256) {
    if (!controllerComponent.has(entity)) return 0;
    uint256[] memory paddedControllers = controllerComponent.getValue(entity);
    return paddedControllers.length;
  }

  /// @notice Returns whether an address is the controller of an entity
  function isController(
    ControllerComponent controllerComponent,
    uint256 entity,
    address checkAddress
  ) internal view returns (bool) {
    if (!controllerComponent.has(entity)) {
      return false;
    }
    uint256[] memory paddedControllers = controllerComponent.getValue(entity);
    for (uint256 i = 0; i < paddedControllers.length; i++) {
      if (unpadAddress(paddedControllers[i]) == checkAddress) {
        return true;
      }
    }
    return false;
  }

  /// @notice Checks if an address is the controller of an entity
  function checkIsController(
    ControllerComponent controllerComponent,
    uint256 entity,
    address checkAddress
  ) internal view {
    if (!isController(controllerComponent, entity, checkAddress)) {
      revert NotController();
    }
  }

  /// @notice Checks whether an address can control an entity
  /// Checks whether an address is a controller–unless there are no controllers,
  /// in which case, check whether the address is an owner
  function checkCanControl(
    ControllerComponent controllerComponent,
    OwnerComponent ownerComponent,
    uint256 entity,
    address checkAddress
  ) internal view {
    if (isController(controllerComponent, entity, checkAddress)) {
      return;
    }
    if (getNumControllers(controllerComponent, entity) == 0 && LibOwner.isOwner(ownerComponent, entity, checkAddress)) {
      return;
    }
    revert CannotControl();
  }

  /// @notice Remove a controller
  function removeController(
    ControllerComponent controllerComponent,
    uint256 entity,
    address controller
  ) internal {
    uint256[] memory paddedControllers = controllerComponent.getValue(entity);
    if (paddedControllers.length <= 0) {
      revert NotController();
    }
    uint256[] memory newPaddedControllers = new uint256[](paddedControllers.length - 1);
    uint256 index = 0;
    for (uint256 i = 0; i < paddedControllers.length; i++) {
      if (unpadAddress(paddedControllers[i]) != controller) {
        if (index >= paddedControllers.length - 1) {
          revert NotController();
        }
        newPaddedControllers[index] = paddedControllers[i];
        index++;
      }
    }
    controllerComponent.set(entity, newPaddedControllers);
  }

  /// @notice Pads an address as a uint256
  /// @dev This is used in order to use Mud's Uint256ArrayComponent, which we
  /// need to use because an array of addresses is not in Mud's LibTypes
  function padAddress(address a) internal pure returns (uint256) {
    return uint256(uint160(a));
  }

  /// @notice Converts an address padded as a uint256 to an address type
  function unpadAddress(uint256 paddedAddress) internal pure returns (address) {
    return address(uint160(paddedAddress));
  }
}
