// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import "std-contracts/components/Uint256BareComponent.sol";

uint256 constant ID = uint256(keccak256("component.BRPiecePositionTracker"));

/// @dev Helper component that gets the BR piece at a given position
/// @dev Entity ID generation handled in BRLibPiece
contract BRPiecePositionTrackerComponent is Uint256BareComponent {
  constructor(address world) Uint256BareComponent(world, ID) {}
}
