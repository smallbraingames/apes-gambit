import {
  getFormattedPieceDeathUpdate,
  getFormattedPieceTypeUpdate,
} from "../../utils/getFormattedActivityUpdate";
import { useContext, useEffect, useState } from "react";

import { NetworkContext } from "../../context/NetworkContext";
import { PieceType } from "../../network/types";

const ActivityStream = () => {
  const network = useContext(NetworkContext);
  const [activity, setActivity] = useState<JSX.Element[]>([]);

  useEffect(() => {
    if (!network.network) return;

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
          getFormattedPieceTypeUpdate(entity, pieceType),
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

      if (piecePositionUpdate === undefined || pieceAliveUpdate === undefined) {
        return;
      }

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
        getFormattedPieceDeathUpdate(
          piecePositionUpdate.entity,
          pieceAliveUpdate.entity
        ),
      ]);
    });
    return () => {
      moveSubscription.unsubscribe();
      switchSubscription.unsubscribe();
    };
  }, [network]);

  return (
    <div className="bg-yellow-50 h-48 p-4 border flex flex-col border-b-4 border-r-2 border-yellow-900 text-yellow-900 rounded-lg">
      <p className="mb-3 ml-1">ACTIVITY</p>
      <div className="h-full">
        <div className="flex flex-col flex-col-reverse h-32 overflow-scroll scrollbar-hide mb-9">
          {activity.reverse().map((element, i) => (
            <div key={i}>
              <div className="font-bold">{element}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityStream;
