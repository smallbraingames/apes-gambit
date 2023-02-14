import { useContext, useEffect, useState } from "react";

import { Coord } from "@latticexyz/utils";
import { NetworkContext } from "../../context/NetworkContext";
import { PieceType } from "../../network/types";
import createActivityUpdateFormatter from "../../utils/createActivityUpdateFormatter";

const ActivityStream = () => {
  const network = useContext(NetworkContext);
  const [activity, setActivity] = useState<JSX.Element[]>([]);

  useEffect(() => {
    if (!network.network) return;

    const activityUpdateFormatter = createActivityUpdateFormatter(
      network.network
    );

    const {
      systemCallStreams,
      components: { PieceType, BRIsAlive, PiecePosition },
    } = network.network;

    const switchSubscription = systemCallStreams[
      "system.BRSetPieceTypeSystem"
    ].subscribe((systemCall) => {
      const pieceTypeUpdates = systemCall.updates.filter(
        (update) => update.component.id === PieceType.id
      );
      pieceTypeUpdates.forEach((pieceTypeUpdate) => {
        const entity = pieceTypeUpdate.entity;
        if (!pieceTypeUpdate.value) {
          console.warn(
            `Recieved piece type update with no value`,
            pieceTypeUpdate
          );
          return;
        }
        const pieceType = pieceTypeUpdate.value.value as PieceType;
        setActivity((a) => [
          ...a,
          activityUpdateFormatter.getPieceTypeUpdate(entity, pieceType),
        ]);
      });
    });

    const moveSubscription = systemCallStreams[
      "system.BRMovePieceSystem"
    ].subscribe((systemCall) => {
      const piecePositionUpdates = systemCall.updates.filter(
        (update) => update.component.id === PiecePosition.id
      );
      const pieceAliveUpdates = systemCall.updates.filter(
        (update) => update.component.id === BRIsAlive.id
      );

      const piecePositionUpdate =
        piecePositionUpdates.length > 0 ? piecePositionUpdates[0] : undefined;
      const pieceAliveUpdate =
        pieceAliveUpdates.length > 0 ? pieceAliveUpdates[0] : undefined;

      if (piecePositionUpdate === undefined) {
        return;
      }

      setActivity((a) => [
        ...a,
        activityUpdateFormatter.getPieceMoveUpdate(
          piecePositionUpdate.entity,
          piecePositionUpdate.value as Coord
        ),
      ]);

      if (pieceAliveUpdate) {
        // PieceAliveUpdates should always signify that the piece died
        // since a piece cannot be set to alive from the BR movement system
        if (pieceAliveUpdate.value && pieceAliveUpdate.value.value) {
          console.warn(
            "Received invalid piece alive update from BRMovePieceSystem",
            pieceAliveUpdate
          );
        }

        setActivity((a) => [
          ...a,
          activityUpdateFormatter.getPieceDeathUpdate(
            piecePositionUpdate.entity,
            pieceAliveUpdate.entity
          ),
        ]);
      }
    });

    return () => {
      moveSubscription.unsubscribe();
      switchSubscription.unsubscribe();
    };
  }, [network]);

  return (
    <div className="bg-yellow-50 p-4 border flex flex-col border-b-4 border-r-2 border-yellow-900 text-yellow-900 rounded-lg w-full overflow-y-auto">
      <p className="mb-2 mt-1 ml-1">ACTIVITY</p>
      <div className="h-full ml-1">
        <div className="flex flex-col h-full flex-col-reverse">
          {[...activity].reverse().map((element, i) => (
            <div key={i}>
              <div>{element}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityStream;
