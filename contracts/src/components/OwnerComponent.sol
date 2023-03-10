// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import "std-contracts/components/AddressBareComponent.sol";

uint256 constant ID = uint256(keccak256("component.Owner"));

contract OwnerComponent is AddressBareComponent {
  constructor(address world) AddressBareComponent(world, ID) {}
}
