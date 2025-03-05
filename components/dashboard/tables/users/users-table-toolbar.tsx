"use client";

import { DownloadIcon } from "@radix-ui/react-icons";
import type { Table } from "@tanstack/react-table";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { userStatuses, emailVerificationStatuses } from "./data";
import { DataTableFacetedFilter } from "../data-table-faceted-filter";
import { CalendarDatePicker } from "../calendar-date-picker";
import { CreateUserDialog } from "./create-user-dialog";
import { exportTableToCSV } from "@/lib/export";
import { DataTableToolbar } from "../data-table-toolbar";
import { DeleteUsersDialog } from "./delete-users-dialog";
import type { User } from "./users-schema";

interface UsersTableToolbarProps<TData extends User> {
  table: Table<TData>;
}

export function UsersTableToolbar<TData extends User>({
  table,
}: UsersTableToolbarProps<TData>) {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(),
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDateSelect = ({ from, to }: { from: Date; to: Date }) => {
    setDateRange({ from, to });
    // Filter table data based on selected date range
    table.getColumn("createdTimestamp")?.setFilterValue([from, to]);
  };

  // Get selected rows
  const selectedRows = table.getFilteredSelectedRowModel().rows;
  const selectedUsers = selectedRows.map((row) => row.original);

  // Define filters
  const filters = (
    <>
      {table.getColumn("enabled") && (
        <DataTableFacetedFilter
          column={table.getColumn("enabled")}
          title="Status"
          options={userStatuses}
        />
      )}
      {table.getColumn("emailVerified") && (
        <DataTableFacetedFilter
          column={table.getColumn("emailVerified")}
          title="Email Verification"
          options={emailVerificationStatuses}
        />
      )}
    </>
  );

  // Define date range picker
  const dateRangePicker = (
    <CalendarDatePicker
      date={dateRange}
      onDateSelect={handleDateSelect}
      className="h-9 w-[250px]"
      variant="outline"
    />
  );

  // Define actions
  const actions = (
    <>
      {selectedRows.length > 0 ? (
        <DeleteUsersDialog
          users={selectedUsers}
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onSuccess={() => {
            // Refresh data or clear selection after successful deletion
            table.resetRowSelection();
          }}
        />
      ) : null}
      <CreateUserDialog />
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          exportTableToCSV(table, {
            filename: "users",
            excludeColumns: ["select", "actions"],
          })
        }
      >
        <DownloadIcon className="mr-2 size-4" aria-hidden="true" />
        Export
      </Button>
    </>
  );

  return (
    <DataTableToolbar
      table={table}
      searchColumn="name"
      searchPlaceholder="Filter by username..."
      filters={filters}
      dateRangePicker={dateRangePicker}
      actions={actions}
    />
  );
}
