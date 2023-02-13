import { BR, Game } from "../../../types";
import { EntityIndex, getComponentValueStrict } from "@latticexyz/recs";
import { Network, PieceType } from "../../../../network/types";
import { TILE_HEIGHT, TILE_WIDTH } from "../../../constants";
import { createInput, pixelCoordToTileCoord } from "@latticexyz/phaserx";

import { Subscription } from "rxjs";
import { getEntityFromEntityIndex } from "../../../utils/resolveEntity";
import isLiveGamePiece from "../../../utils/isLiveGamePiece";

const createBRMovementInputSystem = (
  network: Network,
  game: Game,
  br: BR
): Subscription[] => {
  const {
    godEntityIndex,
    components: { PiecePosition, PieceType },
  } = network;
  const {
    game: phaserGame,
    gameEntity,
    components: { ActivePiece },
    scenes: {
      BR: { scene },
    },
  } = game;

  const input = createInput(scene.input);

  const subscription = input.click$.subscribe((p) => {
    if (!phaserGame.scene.isActive(scene)) return;
    const entityIndex = getComponentValueStrict(ActivePiece, godEntityIndex)
      .value as EntityIndex;
    // Check if is active game piece (alive, in right game, piece entity)
    if (!isLiveGamePiece(entityIndex, network, gameEntity!)) return;

    const pointer = p as Phaser.Input.Pointer;
    const tilePosition = pixelCoordToTileCoord(
      { x: pointer.worldX, y: pointer.worldY },
      TILE_WIDTH,
      TILE_HEIGHT
    );

    // If move is invalid, don't make it
    const currentPosition = getComponentValueStrict(PiecePosition, entityIndex);
    const pieceType = getComponentValueStrict(PieceType, entityIndex)
      .value as PieceType;
    if (
      !br!.moveValidator.isMoveValid(currentPosition, tilePosition, pieceType)
    ) {
      console.warn(
        "Not making invalid move",
        currentPosition,
        tilePosition,
        pieceType
      );
      return;
    }

    network.api.br.moveBRPiece(
      getEntityFromEntityIndex(entityIndex, network.world),
      game.gameEntity!,
      tilePosition
    );
  });

  return [subscription];
};

export default createBRMovementInputSystem;
