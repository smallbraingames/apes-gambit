import {
  CONTROLLER_COMPONENT_CLASS_NAME,
  disableClickthroughs,
} from "../../utils/disableControllers";
import { CauseOfDeath, Game, GameStatus } from "../../game/types";
import {
  EntityIndex,
  Has,
  HasValue,
  Not,
  getComponentValueStrict,
} from "@latticexyz/recs";
import { useContext, useEffect, useMemo, useState } from "react";

import { GameContext } from "../../context/GameContext";
import { Network } from "../../network/types";
import { Subscription } from "rxjs";
import { defineComponentSystemUnsubscribable } from "../../game/utils/defineComponentSystemUnsubscribable";
import { getEntityIndexFromEntity } from "../../game/utils/resolveEntity";
import { getPieceDisplay } from "../../utils/createActivityUpdateFormatter";
import revokeGameControllersIfNecessary from "../../game/utils/setup/revokeGameControllersIfNecessary";
import { useEntityQuery } from "@latticexyz/react";

type PieceDeadInfo = {
  piece: EntityIndex;
  cause: CauseOfDeath;
  order: number;
};

const PieceInfo = (props: { network: Network; info: PieceDeadInfo }) => {
  return (
    <div className="flex gap-1">
      <div className="grayscale">
        {getPieceDisplay(props.info.piece, props.network)}
      </div>
      <div>
        {props.info.cause === CauseOfDeath.TAKEN ? "(taken)" : "(boundary)"}
      </div>
    </div>
  );
};

const Winner = (props: { network: Network; piece: EntityIndex }) => {
  return (
    <div className="font-bold flex text-2xl gap-1">
      {getPieceDisplay(props.piece, props.network, 8)} <div>WINS</div>
    </div>
  );
};

const GameEnd = (props: { network: Network; game: Game }) => {
  const network = props.network;
  const game = props.game;
  const { gameEntity, activePiece } = useContext(GameContext);

  const [gameStatus, setGameStatus] = useState(GameStatus.NOT_STARTED);
  const [deadPieces, setDeadPieces] = useState<PieceDeadInfo[]>([]);

  const {
    components: { BRInGame, BRIsAlive },
  } = network!;

  const {
    components: { BRPieceDeadContext },
  } = game;

  const deadPieceEntities = useEntityQuery(
    useMemo(
      () => [
        Has(BRPieceDeadContext),
        // @ts-ignore
        HasValue(BRInGame, { value: gameEntity }),
      ],
      [BRInGame, BRPieceDeadContext]
    )
  );

  const alivePieceEntities = useEntityQuery(
    useMemo(
      () => [
        HasValue(BRInGame, { value: gameEntity as number | undefined }),
        HasValue(BRIsAlive, { value: true }),
        Not(BRPieceDeadContext),
      ],
      [BRInGame, BRIsAlive, BRPieceDeadContext]
    )
  );

  useEffect(() => {
    disableClickthroughs();
  }, []);

  useEffect(() => {
    const {
      components: { BRPieceDeadContext },
    } = game;
    const pieceDeadInfos = deadPieceEntities.map((piece) => {
      const deadContext = getComponentValueStrict(BRPieceDeadContext, piece);
      return {
        piece,
        isAlive: false,
        cause: deadContext.cause,
        order: deadContext.order,
      };
    });
    setDeadPieces(pieceDeadInfos);
  }, [deadPieceEntities]);

  useEffect(() => {
    let gameStatusSub: Subscription;
    if (gameEntity) {
      const {
        world,
        components: { BRGame },
      } = network;
      gameStatusSub = defineComponentSystemUnsubscribable(
        world,
        BRGame,
        (update) => {
          const game = update.value[0];
          if (
            update.entity === getEntityIndexFromEntity(gameEntity, world) &&
            game
          ) {
            setGameStatus(game.status);
          }
        }
      );
    }
    return () => {
      if (gameStatusSub) {
        gameStatusSub.unsubscribe();
      }
    };
  }, [gameEntity]);

  if (gameStatus !== GameStatus.OVER) {
    return <></>;
  }

  const leaveGame = () => {
    if (network && activePiece) {
      revokeGameControllersIfNecessary(network, activePiece);
    }
  };

  let winner =
    alivePieceEntities.length > 0 ? alivePieceEntities[0] : undefined;

  // If there is no winner yet, then the winner is the last piece taken by the boundary
  // (since the winner could not have been taken by another piece)

  if (!winner) {
    const sortedBoundaryDeadPieces = deadPieces
      .filter((piece) => piece.cause === CauseOfDeath.BOUNDARY)
      .sort((a, b) => a.order - b.order);
    if (sortedBoundaryDeadPieces.length > 0) {
      winner =
        sortedBoundaryDeadPieces[sortedBoundaryDeadPieces.length - 1].piece;
    }
  }

  return (
    <div className={CONTROLLER_COMPONENT_CLASS_NAME}>
      <div className="h-full w-full fixed flex items-center justify-center bg-yellow-900 bg-opacity-60">
        <div className="container p-4 flex flex-col items-center w-fit gap-2">
          {winner && <Winner piece={winner} network={props.network} />}
          <div className="w-full flex flex-col mb-2">
            <div className="mb-1">Players</div>
            {deadPieces.map((deadPiece) => (
              <PieceInfo
                network={network}
                key={deadPiece.piece}
                info={deadPiece}
              />
            ))}
          </div>
          <div className="button p-2" onClick={leaveGame}>
            Back to Lobby
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameEnd;
