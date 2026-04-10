"use client";

import { useLiveFlights } from "@/hooks/useLiveFlights";
import Header from "@/components/layout/Header";
import MetricsBar from "@/components/dashboard/MetricsBar";
import StatusBoard from "@/components/dashboard/StatusBoard";
import KpiChart from "@/components/dashboard/KpiChart";

export default function DashboardPage() {
  const { flights, stats, kpiData, lastUpdated } = useLiveFlights();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Header lastUpdated={lastUpdated} />
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        <MetricsBar stats={stats} />
        <StatusBoard flights={flights} />
        <KpiChart data={kpiData} />
      </main>
    </div>
  );
}
