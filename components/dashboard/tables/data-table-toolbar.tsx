"use client";

import type React from "react";

import { Cross2Icon } from "@radix-ui/react-icons";
import type { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchColumn?: string;
  searchPlaceholder?: string;
  filters?: React.ReactNode;
  dateRangePicker?: React.ReactNode;
  actions?: React.ReactNode;
}

export function DataTableToolbar<TData>({
  table,
  searchColumn,
  searchPlaceholder = "Search...",
  filters,
  dateRangePicker,
  actions,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-wrap items-center justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        {searchColumn && (
          <Input
            placeholder={searchPlaceholder}
            value={
              (table.getColumn(searchColumn)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) => {
              table.getColumn(searchColumn)?.setFilterValue(event.target.value);
            }}
            className="h-8 w-[150px] lg:w-[250px]"
          />
        )}

        {filters}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}

        {dateRangePicker}
      </div>

      <div className="flex items-center gap-2">
        {actions}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
