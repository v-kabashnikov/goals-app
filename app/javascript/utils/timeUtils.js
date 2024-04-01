export const convertToTotalMinutes = (days, hours, minutes) => {
  return Number(days) * 1440 + Number(hours) * 60 + Number(minutes);
};

export const convertMinutesToTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (hours === 0) {
    return `${remainingMinutes.toString().padStart(2, "0")} minutes`;
  }
  return `${hours.toString().padStart(2, "0")} hours ${remainingMinutes
    .toString()
    .padStart(2, "0")} minutes`;
};

const intervalsInMinutes = {
  hourly: 60,
  daily: 1440, // 24 * 60
  weekly: 10080, // 7 * 24 * 60
  monthly: 43200, // 30 * 24 * 60, simplified approximation
};

export const timeUntilNextTracking = (lastTrackedAt, trackingInterval) => {
  const lastTrackedDate = new Date(lastTrackedAt);
  const now = new Date();
  const differenceInMinutes = (now - lastTrackedDate) / 60000;
  const intervalMinutes = intervalsInMinutes[trackingInterval];

  const minutesLeft = intervalMinutes - differenceInMinutes;
  if (minutesLeft <= 0) {
    return null; // Tracking available now
  }

  const hoursLeft = Math.floor(minutesLeft / 60);
  const minutesLeftOver = Math.floor(minutesLeft % 60);
  return `${hoursLeft} hours and ${minutesLeftOver} minutes until next track`;
};
