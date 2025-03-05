import DashboardClient from "@/components/dashboard/dashboard-client";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";

const Dashboard = async ({ params }: { params: Promise<{ lang: Locale }> }) => {
  const { lang } = await params;
  const { page } = await getDictionary(lang);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
        <DashboardClient />
      </div>
    </div>
  );
};

export default Dashboard;
