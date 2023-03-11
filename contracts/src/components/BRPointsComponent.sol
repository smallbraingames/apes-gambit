// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import "std-contracts/components/Uint32BareComponent.sol";

uint256 constant ID = uint256(keccak256("component.BRPoints"));

contract BRPointsComponent is Uint32BareComponent {
  constructor(address world) Uint32BareComponent(world, ID) {}
}
