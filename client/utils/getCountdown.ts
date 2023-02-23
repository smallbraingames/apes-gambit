const getCountdown = (unixTimestamp: number): string => {
  const now = Date.now();
  const secondsRemaining = Math.floor(unixTimestamp - now / 1000 + 1); // +1 to round up

  if (secondsRemaining <= 0) {
    return "00:00:00";
  }

  const hours = Math.floor(secondsRemaining / 3600);
  const minutes = Math.floor((secondsRemaining % 3600) / 60);
  const seconds = secondsRemaining % 60;

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  const hourString = formatNumber(hours);
  const minuteString = formatNumber(minutes);
  const secondString = formatNumber(seconds);

  return `${hourString}:${minuteString}:${secondString}`;
};

export default getCountdown;
