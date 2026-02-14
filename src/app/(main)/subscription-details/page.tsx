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
  TableFooter
} from "@/components/ui/table";
import { columns } from "./components/columns";
import Link from "next/link";
import useGetBookingDetails from "@/queries/services/booking-details/useGetBookingDetails";
import { Loader2, LogOut, LucideArrowLeft } from "lucide-react";
import { DateEditDialog } from "./components/DateEditDialog";
import { useUpdateSchedule } from "@/queries/services/booking-details/useUpdateSchedule";
import useCustomToast from "@/hooks/use-custom-toast";
import axiosInstance from "@/services/axios";

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

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

    const handleCancelSubscription = async (booking: BookingData) => {
    if (!booking.id) {
      showError("Booking ID is missing for cancellation.");
      return;
    }

    if (!window.confirm("Are you sure you want to cancel this subscription? This action cannot be undone.")) {
      return;
    }

    try {
      const response = await axiosInstance.post(`/bookings/${booking.id}/cancel`);

      success("Subscription cancelled successfully!");
      queryClient.invalidateQueries({ queryKey: ["booking-details"] });

    } catch (error: any) {
      console.error("Error canceling subscription:", error);
      const errorMessage = error.response?.data?.message || error.message || "An unknown error occurred during cancellation.";
      showError(errorMessage);
    }
  };

  const table = useReactTable({
    data: bookings,
    columns,
    state: {
      sorting,
      pagination
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    meta: {
      handleEditDate: (booking: BookingData) => {
        setSelectedBooking(booking);
        setIsDateEditOpen(true);
      },
      handleCancelSubscription: handleCancelSubscription
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
      <div className="min-h-screen bg-[#F4F7F9] py-12 pt-25">
        <div className="container mx-auto px-4">
          <div className="max-w-300 mx-auto">
            <h2 className="text-3xl font-bold text-center text-primary mt-8 mb-4">
              Subscription Details
            </h2>
            <p className="text-center text-lg mb-10">
              Showing the details about the current service plan and and reschedule your upcoming service date
            </p>

            <div className="rounded-t-3xl overflow-hidden shadow-[0_7px_29px_rgba(100,100,100,0.2)]">
              <div className="overflow-x-auto ">
                <Table>
                  <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <TableHead
                            key={header.id}
                            style={{ width: header.getSize() }}
                            className="bg-white font-bold text-gray-600 px-8 py-6 uppercase"
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
                              className="px-8 py-4 bg-white"
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

            {/* Pagination Controls */}
            <div className="flex sm:flex-row flex-col items-center justify-between md:gap-2 gap-5 bg-white rounded-b-3xl px-8 py-5 border-t shadow-[0_7px_29px_rgba(100,100,100,0.2)]">
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <p className="text-[#808080] text-[14px]">Show</p>
                <select
                className="ml-2 border rounded-[8px] bg-white px-3 py-2 font-semibold text-[13px]"
                value={table.getState().pagination.pageSize}
                onChange={(e) => table.setPageSize(Number(e.target.value))}
              >
                {[10, 20, 50].map((size) => (
                  <option key={size} value={size}
                  className="font-semibold text-[15px]">
                     {size}
                  </option>
                ))}
              </select>
                </div>
              <span className="ml-4 text-[#808080] text-[14px] font-semibold">
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                className="disabled:bg-[#F1F5F9] disabled:text-[#080808] rounded-lg"
                disabled={!table.getCanPreviousPage()}
                onClick={() => table.previousPage()}
              >
                Previous
              </Button>
              <Button
              className="disabled:bg-[#F1F5F9] disabled:text-[#080808] rounded-lg"
                disabled={!table.getCanNextPage()}
                onClick={() => table.nextPage()}
              >
                Next
              </Button>
              </div>
            </div>

            <div className="flex justify-center items-center gap-4 mt-8">
              <Link href="/">
                <Button variant="outline" className="border-gray-300 p-5 rounded-xl shadow-none">
                  <LucideArrowLeft/> Back to Home 
                </Button>
              </Link>
              <Button
                variant="ghost"
                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-5 rounded-xl shadow-none"
                onClick={() => {
                  sessionStorage.clear();
                  window.location.href = "/";
                }}
              >
                <LogOut/> Logout
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
