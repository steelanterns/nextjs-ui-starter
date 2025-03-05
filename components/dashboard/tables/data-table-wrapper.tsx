import type React from "react";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "./data-table";
import type { ColumnDef, Table as TableInstance } from "@tanstack/react-table";
import { RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DataTableWrapperProps<TData, TValue> {
  title: string;
  description: string;
  count: number;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean | undefined;
  error?: Error;
  onRefresh: () => void;
  toolbar?:
    | React.ReactNode
    | ((table: TableInstance<TData>) => React.ReactNode);
}

export function DataTableWrapper<TData, TValue>({
  title,
  description,
  count,
  columns,
  data,
  isLoading,
  error,
  onRefresh,
  toolbar,
}: DataTableWrapperProps<TData, TValue>) {
  return (
    <div className="space-y-5 p-4 sm:p-6 md:p-8 bg-card">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
            <Badge variant="secondary" className="py-1">
              {isLoading ? "..." : count}
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          className="ml-auto"
          disabled={isLoading}
        >
          <RefreshCcw
            className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
          />
          {isLoading ? "Refreshing..." : "Refresh"}
        </Button>
      </div>

      <div className="rounded-md overflow-hidden">
        <DataTable
          columns={columns}
          data={data}
          isLoading={isLoading}
          error={error}
          toolbar={toolbar}
        />
      </div>
    </div>
  );
}
