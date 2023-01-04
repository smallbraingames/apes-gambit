// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import "solecs/Component.sol";
import { BRGame } from "common/BRGame.sol";

uint256 constant ID = uint256(keccak256("component.BRGame"));

contract BRGameComponent is Component {
  constructor(address world) Component(world, ID) {}

  function getSchema() public pure override returns (string[] memory keys, LibTypes.SchemaValue[] memory values) {
    keys = new string[](2);
    values = new LibTypes.SchemaValue[](2);

    keys[0] = "startTime";
    values[0] = LibTypes.SchemaValue.UINT256;

    keys[1] = "status";
    values[1] = LibTypes.SchemaValue.UINT8;
  }

  function set(uint256 entity, BRGame memory value) public virtual {
    set(entity, abi.encode(value));
  }

  function getValue(uint256 entity) public view virtual returns (BRGame memory) {
    BRGame memory value = abi.decode(getRawValue(entity), (BRGame));
    return value;
  }

  function getEntitiesWithValue(BRGame calldata value) public view virtual returns (uint256[] memory) {
    return getEntitiesWithValue(abi.encode(value));
  }
}
