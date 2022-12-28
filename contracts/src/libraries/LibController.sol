// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import { ControllerComponent } from "components/ControllerComponent.sol";
import { NotController, AlreadyHasController } from "common/Errors.sol";

library LibController {
  /// @notice Checks if an entity has no controllers
  function checkNoControllers(ControllerComponent controllerComponent, uint256 entity) internal view {
    if (!controllerComponent.has(entity)) return;
    uint256[] memory paddedControllers = controllerComponent.getValue(entity);
    if (paddedControllers.length > 0) {
      revert AlreadyHasController();
    }
  }

  /// @notice Checks if an address is the owner of an entity
  function checkIsController(
    ControllerComponent controllerComponent,
    uint256 entity,
    address checkAddress
  ) internal view {
    if (!controllerComponent.has(entity)) revert NotController();
    uint256[] memory paddedControllers = controllerComponent.getValue(entity);
    for (uint256 i = 0; i < paddedControllers.length; i++) {
      if (unpadAddress(paddedControllers[i]) == checkAddress) {
        return;
      }
    }
    revert NotController();
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
