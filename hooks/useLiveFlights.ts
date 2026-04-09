"use client";

import { useState, useEffect } from "react";
import { MOCK_FLIGHTS, CARRIER_KPI_DATA } from "@/lib/mockData";
import { Flight, DashboardStats, CarrierKpi } from "@/lib/types";

function computeStats(flights: Flight[]): DashboardStats {
  const active = flights.filter((f) => f.status !== "CANCELLED");
  const onTime = flights.filter(
    (f) =>
      f.status === "ON_TIME" ||
      f.status === "BOARDING" ||
      f.status === "ARRIVED" ||
      f.status === "DEPARTED",
  ).length;
  const delayed = flights.filter((f) => f.status === "DELAYED").length;
  const kpiBreaches = flights.filter((f) => f.kpiBreached).length;
  const avgTurnaround =
    active.length > 0
      ? Math.round(
          active.reduce((sum, f) => sum + f.elapsedMinutes, 0) / active.length,
        )
      : 0;

  return {
    totalFlights: flights.length,
    onTime,
    delayed,
    kpiBreaches,
    avgTurnaround,
  };
}

function tickFlights(flights: Flight[]): Flight[] {
  return flights.map((flight) => {
    if (flight.status === "CANCELLED" || flight.status === "DEPARTED")
      return flight;

    const newElapsed = flight.elapsedMinutes + 1;
    const kpiBreached = newElapsed > flight.turnaroundMinutes;

    // Automatically advance status based on elapsed time
    let newStatus = flight.status;
    if (flight.status === "ON_TIME" && newElapsed > 10) newStatus = "BOARDING";
    if (flight.status === "BOARDING" && newElapsed >= flight.turnaroundMinutes)
      newStatus = "DEPARTED";

    return {
      ...flight,
      elapsedMinutes: newElapsed,
      kpiBreached,
      status: newStatus,
    };
  });
}

export function useLiveFlights() {
  const [flights, setFlights] = useState<Flight[]>(MOCK_FLIGHTS);
  const [stats, setStats] = useState<DashboardStats>(
    computeStats(MOCK_FLIGHTS),
  );
  const [kpiData] = useState<CarrierKpi[]>(CARRIER_KPI_DATA);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setFlights((prev) => {
        const updated = tickFlights(prev);
        setStats(computeStats(updated));
        setLastUpdated(new Date());
        return updated;
      });
    }, 5000); // ticks every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return { flights, stats, kpiData, lastUpdated };
}
