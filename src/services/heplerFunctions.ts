// Helper function to convert week name to number
export const weekOfMonthToNumber = (weekName: string | null): number => {
  if (!weekName) return 0;

  const weekMap: Record<string, number> = {
    "First Week": 1,
    "Second Week": 2,
    "Third Week": 3,
    "Fourth Week": 4,
  };

  return weekMap[weekName] || 0;
};

// Helper function to convert day name to number
export const dayOfWeekToNumber = (dayName: string | null): number => {
  if (!dayName) return 0;

  const dayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  return dayMap[dayName] || 0;
};

// Helper function to format time from 24-hour to 12-hour format
export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(":");
  const hour = Number.parseInt(hours, 10);
  const ampm = hour >= 12 ? "pm" : "am";
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:${minutes}${ampm}`;
};

// Helper function to extract area size from homeSize string
export const extractAreaSize = (homeSize: string): number => {
  const matches = homeSize.match(/(\d+)\s*-\s*(\d+)/);
  if (matches && matches[2]) {
    return Number.parseInt(matches[2], 10);
  }
  return 0;
};

// Helper function to convert time from 12-hour format to 24-hour format
export const convertTo24HourFormat = (time: string | null): string => {
  if (!time) return "";

  // Handle formats like "9:00am", "10:30pm"
  const matches = time.match(/(\d+):(\d+)([ap]m)/);
  if (!matches) return "";

  let hours = Number.parseInt(matches[1], 10);
  const minutes = matches[2];
  const period = matches[3];

  // Convert to 24-hour format
  if (period === "pm" && hours < 12) {
    hours += 12;
  } else if (period === "am" && hours === 12) {
    hours = 0;
  }

  // Format with leading zeros
  return `${hours.toString().padStart(2, "0")}:${minutes}`;
};
