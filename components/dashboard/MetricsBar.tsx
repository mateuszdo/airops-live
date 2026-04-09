import { DashboardStats } from "@/lib/types";
import { Plane, Clock, AlertTriangle, CheckCircle } from "lucide-react";

interface MetricsBarProps {
  stats: DashboardStats;
}

const cards = (stats: DashboardStats) => [
  {
    label: "Total flights",
    value: stats.totalFlights,
    icon: Plane,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    label: "On time",
    value: stats.onTime,
    icon: CheckCircle,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    label: "Delayed",
    value: stats.delayed,
    icon: Clock,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    label: "KPI breaches",
    value: stats.kpiBreaches,
    icon: AlertTriangle,
    color: "text-red-400",
    bg: "bg-red-500/10",
  },
];

export default function MetricsBar({ stats }: MetricsBarProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards(stats).map(({ label, value, icon: Icon, color, bg }) => (
        <div
          key={label}
          className="
            bg-white dark:bg-slate-900
            border border-slate-200 dark:border-slate-800
            rounded-xl p-4 flex items-center gap-4
          "
        >
          <div className={`p-2 rounded-lg ${bg}`}>
            <Icon size={18} className={color} />
          </div>
          <div>
            <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              {value}
            </p>
            <p className="text-xs text-slate-500">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
