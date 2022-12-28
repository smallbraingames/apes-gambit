// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import "solecs/Component.sol";
import { PieceType } from "common/PieceType.sol";

uint256 constant ID = uint256(keccak256("component.PieceType"));

contract PieceTypeComponent is Component {
  constructor(address world) Component(world, ID) {}

  function getSchema() public pure override returns (string[] memory keys, LibTypes.SchemaValue[] memory values) {
    keys = new string[](1);
    values = new LibTypes.SchemaValue[](1);

    keys[0] = "value";
    values[0] = LibTypes.SchemaValue.UINT8;
  }

  function set(uint256 entity, PieceType value) public virtual {
    set(entity, abi.encode(value));
  }

  function getValue(uint256 entity) public view virtual returns (PieceType) {
    PieceType value = abi.decode(getRawValue(entity), (PieceType));
    return value;
  }

  function getEntitiesWithValue(PieceType value) public view virtual returns (uint256[] memory) {
    return getEntitiesWithValue(abi.encode(value));
  }
}
