"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../data-table-column-header";
import { DataTableRowActions } from "../data-table-row-actions";
import { CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDate } from "@/lib/utils";
import { UpdateUserSheet } from "./update-user-sheet";
import { DeleteUsersDialog } from "./delete-users-dialog";
import type { User } from "./users-schema";
import { useRouter } from "next/navigation";

// Create a function that returns the columns and uses the router hook inside it
export function useUserColumns(): ColumnDef<User>[] {
  const router = useRouter();

  const handleUsernameClick = (userId: string) => {
    // do something before navigation
    router.push(`/users/${userId}`);
  };

  const columns: ColumnDef<User>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-0.5"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-0.5"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => {
        const username = row.getValue("name") as string;
        const userId = row.original.id;

        return (
          <button
            onClick={() => handleUsernameClick(userId)}
            className="text-blue-600 hover:text-blue-800 underline text-left font-medium cursor-pointer transition-colors"
            title={`View details for ${username}`}
          >
            {username}
          </button>
        );
      },
      enableSorting: true,
      enableHiding: false,
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("email")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "firstName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="First Name" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex w-[100px] items-center">
            <span>{row.getValue("firstName")}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "lastName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Last Name" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex w-[100px] items-center">
            <span>{row.getValue("lastName")}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "enabled",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const enabled = row.getValue("enabled");
        return (
          <div className="flex w-[100px] items-center">
            {enabled ? (
              <CheckCircle size={20} className="mr-2 text-green-500" />
            ) : (
              <XCircle size={20} className="mr-2 text-red-500" />
            )}
            <span
              className={cn(
                "capitalize",
                enabled ? "text-green-500" : "text-red-500"
              )}
            >
              {enabled ? "Active" : "Inactive"}
            </span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "emailVerified",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email Verified" />
      ),
      cell: ({ row }) => {
        const emailVerified = row.getValue("emailVerified");
        return (
          <div className="flex w-[100px] items-center">
            {emailVerified ? (
              <CheckCircle size={20} className="mr-2 text-green-500" />
            ) : (
              <XCircle size={20} className="mr-2 text-red-500" />
            )}
            <span
              className={cn(
                "capitalize",
                emailVerified ? "text-green-500" : "text-red-500"
              )}
            >
              {emailVerified ? "Verified" : "Not Verified"}
            </span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "lastSeen",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created At" />
      ),
      cell: ({ row }) => {
        const date = new Date(row.getValue("lastSeen"));
        return (
          <div className="flex w-[100px] items-center">
            <span>{formatDate(date)}</span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        const rowDate = new Date(row.getValue(id));
        const [startDate, endDate] = value;
        return rowDate >= startDate && rowDate <= endDate;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original;

        return (
          <DataTableRowActions
            row={row}
            actions={[
              {
                type: "modal",
                label: "Edit",
                modalComponent: (
                  <UpdateUserSheet
                    user={user}
                    open={false}
                    onOpenChange={() => {}}
                  />
                ),
              },
              {
                type: "modal",
                label: "Delete",
                modalComponent: (
                  <DeleteUsersDialog
                    users={[user]}
                    open={false}
                    onOpenChange={() => {}}
                    showTrigger={false}
                  />
                ),
              },
              {
                type: "submenu",
                label: "Change Status",
                currentValue: user.enabled ? "enabled" : "disabled",
                items: [
                  { label: "Enable", value: "enabled" },
                  { label: "Disable", value: "disabled" },
                ],
                onValueChange: (value, rowData) => {
                  // Implement status change logic here
                  console.log(`Changing status to ${value} for user:`, rowData);
                },
              },
            ]}
          />
        );
      },
    },
  ];

  return columns;
}
