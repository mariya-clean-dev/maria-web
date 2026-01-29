"use client";

import { Button } from "@/components/ui/button";
import { formatDayOfWeek, formatWeekOfMonth } from "@/services/heplerFunctions";

import { createColumnHelper } from "@tanstack/react-table";

// Define the booking type
interface Booking {
  id: string;
  type: string;
  price: string;
  createdAt: string;
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
    startTime: string;
    weekOfMonth: number;
    dayOfWeek: number;
    time: string;
  };
  status: string
}

const columnHelper = createColumnHelper<Booking>();

export const columns = [
  columnHelper.accessor(
    (row) => {
      // Add debugging to see what's coming in
      if (row.type === "recurring") {
        return row.type;
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
      const date = new Date(row.createdAt);
      const day = String(date.getUTCDate()).padStart(2, "0");
      const month = date.toLocaleString("en-US", {
        month: "short",
        timeZone: "UTC",
      });
      const year = date.getUTCFullYear();
      return `${day}-${month}-${year}`; // e.g., "30-Jun-2025"
    },
    {
      id: "bookingDate",
      header: "Booked Date",
      cell: (info) => (
        <div className="min-w-[150px]">{info.getValue()}</div>
      ),
      size: 180,
    }
  ),


  columnHelper.accessor("price", {
    header: "Amount",
    cell: (info) => <div className="min-w-[80px]">$ {info.getValue()}</div>,
    size: 120,
  }),

  // columnHelper.accessor(
  //   (row) => {
  //     if (row.monthSchedules && row.monthSchedules.length > 0) {
  //       const schedule = row.monthSchedules[0];
  //       return `${formatWeekOfMonth(schedule.weekOfMonth)} ${formatDayOfWeek(
  //         schedule.dayOfWeek
  //       )}`;
  //     }
  //     return "N/A";
  //   },
  //   {
  //     id: "previousDate",
  //     header: "Previous Date",
  //     cell: (info) => <div className="min-w-[150px]">{info.getValue()}</div>,
  //     size: 180,
  //   }
  // ),

  columnHelper.accessor(
    (row) => {
      if (row.nextMonthSchedule?.startTime) {
        const date = new Date(row.nextMonthSchedule.startTime);
        const formatted = `${date.getUTCDate().toString().padStart(2, "0")}-${date.toLocaleString("en-US", {
          month: "short",
          timeZone: "UTC",
        })}-${date.getUTCFullYear()} ${String(date.getUTCHours()).padStart(2, "0")}:${String(date.getUTCMinutes()).padStart(2, "0")}`;
        return formatted;
      }
      return "N/A";
    },
    {
      id: "scheduledTime",
      header: "Scheduled Time",
      cell: (info) => (
        <div className="min-w-[180px]">{info.getValue()}</div>
      ),
      size: 180,
    }
  ),

columnHelper.accessor("status", {
  header: "Status",
  cell: (info) => {
    const status = info.getValue();
    const formattedStatus = status === "canceled" ? "Cancelled" : status;
    return <div className="min-w-[80px]">{formattedStatus}</div>;
  },
  size: 120,
}),

  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ({ row, table }) => {
      const booking = row.original;
      const meta = table.options.meta as any;

      return (
        <div className="min-w-[100px]">
          {booking.nextMonthSchedule && booking.status !== "cancelled" && booking.status !== "completed" && (
            <Button
              onClick={() => meta?.handleEditDate(booking)}
              className="bg-[#27AE60] hover:bg-[#27AE60]/90 text-white text-xs px-3 py-1 h-8"
            >
              Edit Date
            </Button>
          )}
          {booking.type === "recurring" && booking.status !== "canceled" && booking.status !== "completed" && (
            <Button
              onClick={() => meta?.handleCancelSubscription(booking)}
              className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 h-8 ms-1"
            >
              Cancel
            </Button>
          )}
        </div>
      );
    },
    size: 120,
  }),
];
