// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

enum BRGameStatus {
  NOT_STARTED,
  IN_PROGRESS,
  OVER
}

struct BRGame {
  uint256 startTime;
  BRGameStatus status;
}
