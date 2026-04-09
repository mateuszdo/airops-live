export type FlightStatus =
  | "ON_TIME"
  | "DELAYED"
  | "BOARDING"
  | "DEPARTED"
  | "ARRIVED"
  | "CANCELLED";

export type HandlerTeam = "Alpha" | "Bravo" | "Charlie" | "Delta";

export interface Flight {
  id: string;
  flightNumber: string;
  carrier: string;
  origin: string;
  destination: string;
  scheduledTime: string; // "14:35"
  estimatedTime: string; // "14:50" — may differ if delayed
  gate: string; // "A12"
  stand: string; // "Stand 42" — the aircraft parking position
  status: FlightStatus;
  team: HandlerTeam;
  turnaroundMinutes: number; // target turnaround time
  elapsedMinutes: number; // how long since aircraft arrived
  aircraft: string; // "Boeing 737-800"
  pax: number; // passenger count
  kpiBreached: boolean; // true if elapsed > turnaroundMinutes
}

export interface CarrierKpi {
  carrier: string;
  target: number; // target avg turnaround in minutes
  actual: number; // actual avg turnaround in minutes
}

export interface DashboardStats {
  totalFlights: number;
  onTime: number;
  delayed: number;
  kpiBreaches: number;
  avgTurnaround: number;
}
