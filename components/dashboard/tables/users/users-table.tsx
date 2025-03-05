"use client";

import { useEffect, useState, useCallback } from "react";
import { useUserColumns } from "./users-table-columns";
import { UsersTableToolbar } from "./users-table-toolbar";
import { User } from "./users-schema";
import { DataTableWrapper } from "../data-table-wrapper";

async function getUsers(): Promise<User[]> {
  const res = await fetch(
    "https://64a6f5fc096b3f0fcc80e3fa.mockapi.io/api/users"
  );
  return res.json();
}

export default function UsersTable() {
  const [data, setData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const users = await getUsers();
      setData(users);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const columns = useUserColumns();

  return (
    <DataTableWrapper
      title="Users"
      description="An user is an identity with long-term credentials that is used to interact with an account."
      count={data.length}
      columns={columns}
      data={data}
      isLoading={isLoading}
      error={error || undefined}
      onRefresh={fetchUsers}
      toolbar={(table) => <UsersTableToolbar<User> table={table} />}
    />
  );
}
