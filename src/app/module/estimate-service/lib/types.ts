// Types for service date selection
export type WeekOfMonth =
  | "First Week"
  | "Second Week"
  | "Third Week"
  | "Fourth Week";
export type DayOfWeek = "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";
export type TimeSlot = string;

export interface ServiceDay {
  weekOfMonth: WeekOfMonth | null;
  dayOfWeek: DayOfWeek | null;
  timeSlot: TimeSlot | null;
}

export interface ServiceDates {
  [key: string]: ServiceDay;
}

export interface TimeSlotOption {
  time: string;
  isBlocked?: boolean;
}

// Updated to match API response format
export interface PlanOption {
  recurringTypeId: string;
  title: string;
  description: string;
  discountPercent: number;
  finalPrice: number;
  isPopular?: boolean;
  daysRequired?: number;
}

export interface EstimateResponse {
  status: boolean;
  message: string;
  data: {
    baseCalculatedPrice: number;
    estimates: PlanOption[];
  };
}
