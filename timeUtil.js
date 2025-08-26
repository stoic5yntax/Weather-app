// Convert UTC timestamp + timezone offset → local date
export const convertToLocalTime = (dt, timezone) => {
  return new Date((dt + timezone) * 1000);
};

// Format full date & time (for current weather time)
export const formatDateTime = (date) => {
  return date.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  });
};

// Format only time (for sunrise/sunset)
export const formatTime = (date) => {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timezone: "UTC",
  });
};
