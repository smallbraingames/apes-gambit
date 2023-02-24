import { useEffect, useState } from "react";

import getCountdown from "../utils/getCountdown";

const TIME_UPDATE_INTERVAL = 1000;

const BRGameCountdown = (props: { startTime: number }) => {
  const [countdown, setCountdown] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdown(props.startTime));
    }, TIME_UPDATE_INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      Battle Royale starts in{" "}
      <span className="font-bold font-mono">{countdown}</span>
    </div>
  );
};

export default BRGameCountdown;
