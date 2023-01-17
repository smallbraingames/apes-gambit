import { useContext, useEffect, useState } from "react";

import { NetworkContext } from "../../context/NetworkContext";
import { PieceType } from "../../network/types";
import { getFormattedPieceTypeUpdate } from "../../utils/getFormattedActivityUpdate";

const ActivityStream = () => {
  const network = useContext(NetworkContext);

  const [activity, setActivity] = useState<JSX.Element[]>([]);

  useEffect(() => {
    if (!network.network) return;

    const {
      systemCallStreams,
      components: { PieceType },
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
  }, [network]);

  return (
    <div>
      <div>
        {activity.map((element, i) => (
          <div key={i}>{element}</div>
        ))}
      </div>
    </div>
  );
};

export default ActivityStream;
