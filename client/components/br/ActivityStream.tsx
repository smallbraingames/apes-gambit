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

    systemCallStreams["system.BRSetPieceTypeSystem"].subscribe((systemCall) => {
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

    systemCallStreams["system.BRMovePieceSystem"].subscribe((systemCall) => {
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
  }, [network]);

  return (
    <div className="h-10 w-10 bg-green-200">
      <div>
        {activity.map((element, i) => (
          <div key={i}>{element}</div>
        ))}
      </div>
    </div>
  );
};

export default ActivityStream;
