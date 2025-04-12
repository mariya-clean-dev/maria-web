"use client";

import { Button } from "@/components/ui/button";
import { formatDayOfWeek, formatWeekOfMonth } from "@/services/heplerFunctions";

import { createColumnHelper } from "@tanstack/react-table";

// Define the booking type
interface Booking {
  id: string;
  type: string;
  price: string;
  subscriptionType?: {
    name: string;
  };
  monthSchedules: Array<{
    weekOfMonth: number;
    dayOfWeek: number;
    time: string;
  }>;
  service: {
    name: string;
  };
  isEco: boolean;
  nextMonthSchedule?: {
    weekOfMonth: number;
    dayOfWeek: number;
    time: string;
  };
}

const columnHelper = createColumnHelper<Booking>();

export const columns = [
  columnHelper.accessor(
    (row) => {
      // Add debugging to see what's coming in
      console.log("Processing row:", row);
      if (row.type === "subscription" && row.subscriptionType) {
        return row.subscriptionType.name;
      }
      return "One Time";
    },
    {
      id: "subscriptionPlan",
      header: "Subscription Plan",
      cell: (info) => (
        <div className="min-w-[150px]">
          <div className="font-medium">{info.getValue()}</div>
          {info.row.original.isEco && (
            <div className="text-[#27AE60] text-sm">Eco service</div>
          )}
        </div>
      ),
      size: 180,
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (!row.monthSchedules || row.monthSchedules.length === 0) return "N/A";
      return row.monthSchedules
        .map(
          (schedule) =>
            `${formatWeekOfMonth(schedule.weekOfMonth)} ${formatDayOfWeek(
              schedule.dayOfWeek
            )}`
        )
        .join(", ");
    },
    {
      id: "bookingDates",
      header: "Booking Dates",
      cell: (info) => {
        const value = info.getValue();
        if (value === "N/A") return <div className="min-w-[180px]">N/A</div>;

        return (
          <div className="min-w-[180px] whitespace-normal">
            {value.split(", ").map((date, index) => (
              <div key={index}>{date}</div>
            ))}
          </div>
        );
      },
      size: 200,
    }
  ),

  columnHelper.accessor("price", {
    header: "Amount",
    cell: (info) => <div className="min-w-[80px]">$ {info.getValue()}</div>,
    size: 120,
  }),

  columnHelper.accessor(
    (row) => {
      if (row.monthSchedules && row.monthSchedules.length > 0) {
        const schedule = row.monthSchedules[0];
        return `${formatWeekOfMonth(schedule.weekOfMonth)} ${formatDayOfWeek(
          schedule.dayOfWeek
        )}`;
      }
      return "N/A";
    },
    {
      id: "previousDate",
      header: "Previous Date",
      cell: (info) => <div className="min-w-[150px]">{info.getValue()}</div>,
      size: 180,
    }
  ),

  columnHelper.accessor(
    (row) => {
      if (row.nextMonthSchedule) {
        return `${formatWeekOfMonth(
          row.nextMonthSchedule.weekOfMonth
        )} ${formatDayOfWeek(row.nextMonthSchedule.dayOfWeek)}`;
      }
      return "N/A";
    },
    {
      id: "upcomingDate",
      header: "Upcoming Date",
      cell: (info) => <div className="min-w-[150px]">{info.getValue()}</div>,
      size: 180,
    }
  ),

  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ({ row, table }) => {
      const booking = row.original;
      const meta = table.options.meta as any;

      return (
        <div className="min-w-[100px]">
          {booking.nextMonthSchedule && (
            <Button
              onClick={() => meta?.handleEditDate(booking)}
              className="bg-[#27AE60] hover:bg-[#27AE60]/90 text-white text-xs px-3 py-1 h-8"
            >
              Edit Date
            </Button>
          )}
        </div>
      );
    },
    size: 120,
  }),
];
