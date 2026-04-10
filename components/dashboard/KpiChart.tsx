"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { CarrierKpi } from "@/lib/types";

interface KpiChartProps {
  data: CarrierKpi[];
}

export default function KpiChart({ data }: KpiChartProps) {
  return (
    <div
      className="
      bg-white dark:bg-slate-900
      border border-slate-200 dark:border-slate-800
      rounded-xl p-6
    "
    >
      <div className="mb-6">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          Turnaround Performance vs KPI Target
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Average turnaround time per carrier (minutes). Lower is better.
        </p>
      </div>

      <div className="flex gap-4 mb-4">
        <span className="flex items-center gap-2 text-xs text-slate-500">
          <span className="w-3 h-3 rounded-sm bg-blue-400 inline-block" />
          Target
        </span>
        <span className="flex items-center gap-2 text-xs text-slate-500">
          <span className="w-3 h-3 rounded-sm bg-emerald-400 inline-block" />
          Actual (on target)
        </span>
        <span className="flex items-center gap-2 text-xs text-slate-500">
          <span className="w-3 h-3 rounded-sm bg-red-400 inline-block" />
          Actual (breached)
        </span>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={data}
          margin={{ top: 4, right: 16, left: 0, bottom: 4 }}
          barCategoryGap="30%"
          barGap={4}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e2e8f0"
            vertical={false}
          />
          <XAxis
            dataKey="carrier"
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
            unit="m"
            domain={[0, 120]}
          />
          <Tooltip
            cursor={{ fill: "transparent" }}
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "1px solid #334155",
              borderRadius: "8px",
              fontSize: "12px",
              color: "#f1f5f9",
            }}
            labelStyle={{
              color: "#f1f5f9",
              marginBottom: "4px",
              fontWeight: "500",
            }}
            itemStyle={{ color: "#f1f5f9" }}
            formatter={(value: number, name: string) => [
              `${value} min`,
              name === "target" ? "Target" : "Actual",
            ]}
          />
          <ReferenceLine y={0} stroke="#334155" />
          <Bar
            dataKey="target"
            fill="#60a5fa"
            radius={[4, 4, 0, 0]}
            maxBarSize={40}
          />
          <Bar
            dataKey="actual"
            radius={[4, 4, 0, 0]}
            maxBarSize={40}
            shape={(props: any) => {
              const { x, y, width, height, actual, target } = props;
              const breached = actual > target;
              return (
                <rect
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  fill={breached ? "#f87171" : "#34d399"}
                  rx={4}
                  ry={4}
                />
              );
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
