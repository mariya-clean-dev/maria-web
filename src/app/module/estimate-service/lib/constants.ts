import type {
  PlanOption,
  WeekOfMonth,
  DayOfWeek,
  TimeSlotOption,
} from "./types";

// Updated to match API response format
export const MOCK_API_RESPONSE = {
  status: true,
  message: "price estimation details",
  data: {
    baseCalculatedPrice: 1415,
    estimates: [
      {
        subscriptionTypeId: "4e5f18d6-5afe-4b16-9028-c964f9909f27",
        subscriptionName: "One Time",
        description: "A one time subscription plan",
        discountPercent: 8,
        finalPrice: 1000,
        isPopular: true,
        daysRequired: 1,
      },
      {
        subscriptionTypeId: "4e5f18d6-5afe-4b16-9028-c964f9909f2b",
        subscriptionName: "Bi-Weekly Plan",
        description: "A recurring bi-weekly subscription plan",
        discountPercent: 5,
        finalPrice: 2688.5,
        daysRequired: 2,
      },
      {
        subscriptionTypeId: "5d91f9ca-d65c-4f97-a942-8a80c31c348c",
        subscriptionName: "Weekly Plan",
        description: "A recurring weekly subscription plan",
        discountPercent: 10,
        finalPrice: 5094,
        daysRequired: 4,
      },
      {
        subscriptionTypeId: "6c0dc385-6696-4cfb-b65f-b563283ae3ac",
        subscriptionName: "Monthly Plan",
        description: "A recurring monthly subscription plan",
        discountPercent: 0,
        finalPrice: 1415,
        daysRequired: 1,
      },
    ],
  },
};

export const PLANS: PlanOption[] = MOCK_API_RESPONSE.data.estimates;

export const WEEKS_OF_MONTH: WeekOfMonth[] = [
  "First Week",
  "Second Week",
  "Third Week",
  "Fourth Week",
];
export const DAYS_OF_WEEK: DayOfWeek[] = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

export const TIME_SLOTS: Array<TimeSlotOption[]> = [
  [
    { time: "08:30am" },
    { time: "09:30am" },
    { time: "10:30am" },
    { time: "11:30am" },
    { time: "12:30pm" },
    { time: "01:30pm" },
  ],
  [
    { time: "02:30pm" },
    { time: "03:30pm" },
    { time: "04:30pm" },
    { time: "05:30pm" },
    { time: "06:30pm" },
    { time: "07:30pm" },
  ],
  [
    { time: "08:30pm", isBlocked: true },
    { time: "09:30pm", isBlocked: true },
    { time: "10:30pm" },
    { time: "11:30pm" },
    { time: "12:30am" },
    { time: "01:30am" },
  ],
  [
    { time: "02:30am", isBlocked: true },
    { time: "03:30am", isBlocked: true },
    { time: "04:30am", isBlocked: true },
    { time: "05:30am" },
    { time: "06:30am" },
    { time: "07:30am" },
  ],
];
