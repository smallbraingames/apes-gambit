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
  uint16 initialGridDim;
  uint16 secondsPerGridShrink;
  int256 perlinDenom;
  int128 perlinThresholdBanana;
  uint16 perlinSeed;
  uint8 perlinPrecision;
  BRGameStatus status;
}
