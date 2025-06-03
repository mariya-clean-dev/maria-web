"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { columns } from "./components/columns";
import Link from "next/link";
import useGetBookingDetails from "@/queries/services/booking-details/useGetBookingDetails";
import { Loader2 } from "lucide-react";
import { DateEditDialog } from "./components/DateEditDialog";
import { useUpdateSchedule } from "@/queries/services/booking-details/useUpdateSchedule";
import useCustomToast from "@/hooks/use-custom-toast";

interface BookingData {
  id: string;
  type: string;
  serviceId: string;
  price: string;
  propertyType: string;
  status: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  service: {
    name: string;
    description: string;
  };
  monthSchedules: Array<{
    id: string;
    weekOfMonth: number;
    dayOfWeek: number;
    time: string;
  }>;
  subscriptionType?: {
    id: string;
    name: string;
    description: string;
  };
  nextMonthSchedule?: {
    id: string;
    weekOfMonth: number;
    dayOfWeek: number;
    time: string;
  };
  isEco: boolean;
}

export default function BookingsPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selectedBooking, setSelectedBooking] = useState<BookingData | null>(
    null
  );
  const [isDateEditOpen, setIsDateEditOpen] = useState(false);

  const { success, showError } = useCustomToast();

  // Get booking data using TanStack Query
  const {
    data: bookingsResponse,
    isLoading,
    isError,
    error,
  } = useGetBookingDetails();

  const { mutate } = useUpdateSchedule();

  // Extract the actual bookings array from the nested response
  const bookings = bookingsResponse?.data || [];

  const table = useReactTable({
    data: bookings,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    meta: {
      handleEditDate: (booking: BookingData) => {
        setSelectedBooking(booking);
        setIsDateEditOpen(true);
      },
    },
  });

  const handleDateEditClose = () => {
    setIsDateEditOpen(false);
    setSelectedBooking(null);
  };

  const handleDateUpdate = async (
    bookingId: string,
    date: any,
    time: string
  ) => {
    const params = {
      bookingId,
      newDate: date,
      time,
    };

    mutate(params, {
      onSuccess: () => {
        success("Booking date updated successfully");
        // Invalidate and refetch the booking details query
        queryClient.invalidateQueries({ queryKey: ["booking-details"] });
      },
      onError: (error) => {
        showError(error);
      },
    });

    handleDateEditClose();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-[#19A4C6] animate-spin mb-4" />
        <p className="text-lg text-gray-700">Loading bookings...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 text-center max-w-md">
          Error loading bookings:{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </div>
        <Button
          onClick={() => router.refresh()}
          className="bg-[#19A4C6] hover:bg-[#19A4C6]/90"
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-white py-12 pt-32">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-[#27AE60] mt-8 mb-4">
              Subscription Details
            </h2>
            <p className="text-center text-lg mb-8">
              Showing the details about the current service plan and can edit
              the upcoming Date
            </p>

            <div className="border rounded-lg overflow-hidden mb-8">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <TableHead
                            key={header.id}
                            style={{ width: header.getSize() }}
                            className="bg-gray-50 font-semibold text-gray-700"
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        ))}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {table.getRowModel().rows.length ? (
                      table.getRowModel().rows.map((row) => (
                        <TableRow
                          key={row.id}
                          data-state={row.getIsSelected() && "selected"}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell
                              key={cell.id}
                              style={{ width: cell.column.getSize() }}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={columns.length}
                          className="h-24 text-center"
                        >
                          No bookings found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <Link href="/">
                <Button variant="outline" className="border-gray-300">
                  Back to Home Page
                </Button>
              </Link>
              <Button
                variant="ghost"
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                onClick={() => {
                  sessionStorage.clear();
                  window.location.href = "/";
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {selectedBooking && (
        <DateEditDialog
          isOpen={isDateEditOpen}
          onClose={handleDateEditClose}
          booking={selectedBooking}
          onUpdate={handleDateUpdate}
        />
      )}
    </>
  );
}
