// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import "std-contracts/components/StringBareComponent.sol";

uint256 constant ID = uint256(keccak256("component.PieceName"));

contract PieceNameComponent is StringBareComponent {
  constructor(address world) StringBareComponent(world, ID) {}
}
