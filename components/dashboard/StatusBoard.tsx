"use client";

import { useState } from "react";
import { Flight } from "@/lib/types";
import FlightRow from "./Flightrow";
import FilterBar from "@/components/ui/FilterBar";

interface StatusBoardProps {
  flights: Flight[];
}

export default function StatusBoard({ flights }: StatusBoardProps) {
  const [carrierFilter, setCarrierFilter] = useState("All");
  const [gateFilter, setGateFilter] = useState("All");
  const [teamFilter, setTeamFilter] = useState("All");

  const carriers = [
    "All",
    ...Array.from(new Set(flights.map((f) => f.carrier))),
  ];
  const gates = [
    "All",
    ...Array.from(new Set(flights.map((f) => f.gate))).sort(),
  ];
  const teams = [
    "All",
    ...Array.from(new Set(flights.map((f) => f.team))).sort(),
  ];

  const filtered = flights.filter((f) => {
    if (carrierFilter !== "All" && f.carrier !== carrierFilter) return false;
    if (gateFilter !== "All" && f.gate !== gateFilter) return false;
    if (teamFilter !== "All" && f.team !== teamFilter) return false;
    return true;
  });

  return (
    <div
      className="
      bg-white dark:bg-slate-900
      border border-slate-200 dark:border-slate-800
      rounded-xl overflow-hidden
    "
    >
      <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          Flight Status Board
        </h2>
        <span className="text-xs text-slate-500">
          {filtered.length} flights
        </span>
      </div>

      <FilterBar
        carriers={carriers}
        selectedCarrier={carrierFilter}
        onCarrierChange={setCarrierFilter}
        gates={gates}
        selectedGate={gateFilter}
        onGateChange={setGateFilter}
        teams={teams}
        selectedTeam={teamFilter}
        onTeamChange={setTeamFilter}
      />

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800">
              {[
                "Flight",
                "Route",
                "Gate",
                "STD",
                "ETD",
                "ATD",
                "PAX",
                "Team",
                "Turnaround",
                "Status",
              ].map((col) => (
                <th
                  key={col}
                  className="px-4 py-2.5 text-left text-xs font-medium text-slate-500 uppercase tracking-wide"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-8 text-center text-sm text-slate-500"
                >
                  No flights match the current filters.
                </td>
              </tr>
            ) : (
              filtered.map((flight) => (
                <FlightRow key={flight.id} flight={flight} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
