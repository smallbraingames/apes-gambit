// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

enum BRGameStatus {
  NOT_STARTED,
  IN_PROGRESS,
  OVER
}

struct BRGame {
  uint256 startTime;
  uint32 rechargeTime;
  BRGameStatus status;
}
