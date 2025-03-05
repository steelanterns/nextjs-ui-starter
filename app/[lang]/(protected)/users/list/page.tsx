import UsersTable from "@/components/dashboard/tables/users/users-table";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";

const Users = async ({ params }: { params: Promise<{ lang: Locale }> }) => {
  const { lang } = await params;
  const { page } = await getDictionary(lang);
  return (
    <div className="w-full">
      <UsersTable />
    </div>
  );
};

export default Users;
