import { Flight } from "@/lib/types";
import { formatMinutes, getTurnaroundPercent } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import { AlertTriangle } from "lucide-react";

interface FlightRowProps {
  flight: Flight;
}

export default function FlightRow({ flight }: FlightRowProps) {
  const percent = getTurnaroundPercent(
    flight.elapsedMinutes,
    flight.turnaroundMinutes,
  );

  return (
    <tr
      className={`
      border-b border-slate-100 dark:border-slate-800
      hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors
      ${flight.kpiBreached ? "bg-red-50/40 dark:bg-red-900/10" : ""}
    `}
    >
      {/* Flight + Carrier */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          {flight.kpiBreached && (
            <AlertTriangle size={13} className="text-red-400 shrink-0" />
          )}
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {flight.flightNumber}
            </p>
            <p className="text-xs text-slate-500">{flight.carrier}</p>
          </div>
        </div>
      </td>

      {/* Route */}
      <td className="px-4 py-3">
        <p className="text-sm text-slate-700 dark:text-slate-300">
          {flight.origin}
        </p>
        <p className="text-xs text-slate-500">{flight.aircraft}</p>
      </td>

      {/* Gate / Stand */}
      <td className="px-4 py-3">
        <p className="text-sm font-mono text-slate-700 dark:text-slate-300">
          {flight.gate}
        </p>
        <p className="text-xs text-slate-500">{flight.stand}</p>
      </td>

      {/* Scheduled / Estimated */}
      <td className="px-4 py-3">
        <p className="text-sm font-mono text-slate-700 dark:text-slate-300">
          {flight.scheduledTime}
        </p>
        {flight.estimatedTime !== flight.scheduledTime && (
          <p className="text-xs text-amber-500">ETA {flight.estimatedTime}</p>
        )}
      </td>

      {/* PAX */}
      <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-300">
        {flight.pax > 0 ? flight.pax : "—"}
      </td>

      {/* Team */}
      <td className="px-4 py-3">
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
          {flight.team}
        </span>
      </td>

      {/* Turnaround progress */}
      <td className="px-4 py-3 min-w-[120px]">
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
            <div
              className={`h-1.5 rounded-full transition-all duration-500 ${
                flight.kpiBreached
                  ? "bg-red-400"
                  : percent > 80
                    ? "bg-amber-400"
                    : "bg-emerald-400"
              }`}
              style={{ width: `${percent}%` }}
            />
          </div>
          <span className="text-xs text-slate-500 shrink-0">
            {formatMinutes(flight.elapsedMinutes)}
          </span>
        </div>
      </td>

      {/* Status */}
      <td className="px-4 py-3">
        <Badge status={flight.status} />
      </td>
    </tr>
  );
}
