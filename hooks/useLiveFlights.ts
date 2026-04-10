"use client";

import { useState, useEffect } from "react";
import { generateFlights, CARRIER_KPI_DATA } from "@/lib/mockData";
import { Flight, DashboardStats, CarrierKpi, FlightStatus } from "@/lib/types";

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

function deriveStatus(flight: Flight): FlightStatus {
  if (flight.status === "CANCELLED") return "CANCELLED";
  if (flight.status === "ARRIVED") return "ARRIVED";
  if (flight.status === "DEPARTED") return "DEPARTED";

  const { elapsedMinutes, turnaroundMinutes } = flight;

  if (elapsedMinutes === 0) return "ON_TIME";
  if (elapsedMinutes > turnaroundMinutes) return "DELAYED";
  if (elapsedMinutes >= turnaroundMinutes - 15) return "BOARDING";
  return "ON_TIME";
}

function tickFlights(flights: Flight[]): Flight[] {
  const nowTime = new Date().toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/London",
  });

  return flights.map((flight) => {
    if (
      flight.status === "CANCELLED" ||
      flight.status === "DEPARTED" ||
      flight.status === "ARRIVED"
    )
      return flight;

    const newElapsed = flight.elapsedMinutes + 1;
    const kpiBreached = newElapsed > flight.turnaroundMinutes;
    const newStatus = deriveStatus({ ...flight, elapsedMinutes: newElapsed });
    const justDeparted = newStatus === "DEPARTED" && !flight.atd;

    return {
      ...flight,
      elapsedMinutes: newElapsed,
      kpiBreached,
      status: newStatus,
      atd: justDeparted ? nowTime : flight.atd,
      delayMinutes: justDeparted
        ? Math.max(0, newElapsed - flight.turnaroundMinutes)
        : flight.delayMinutes,
    };
  });
}

export function useLiveFlights() {
  const [flights, setFlights] = useState<Flight[]>(() => generateFlights());
  const [stats, setStats] = useState<DashboardStats>(() =>
    computeStats(generateFlights()),
  );
  const [kpiData] = useState<CarrierKpi[]>(CARRIER_KPI_DATA);
  const [lastUpdated, setLastUpdated] = useState<Date>(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setFlights((prev) => {
        const updated = tickFlights(prev);
        setStats(computeStats(updated));
        setLastUpdated(new Date());
        return updated;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return { flights, stats, kpiData, lastUpdated };
}
