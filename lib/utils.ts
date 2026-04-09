import { FlightStatus } from "./types";

export function getStatusStyles(status: FlightStatus): string {
  switch (status) {
    case "ON_TIME":
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    case "BOARDING":
      return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    case "DEPARTED":
      return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    case "ARRIVED":
      return "bg-purple-500/10 text-purple-400 border-purple-500/20";
    case "DELAYED":
      return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    case "CANCELLED":
      return "bg-red-500/10 text-red-400 border-red-500/20";
  }
}

export function getStatusLabel(status: FlightStatus): string {
  switch (status) {
    case "ON_TIME":
      return "On Time";
    case "BOARDING":
      return "Boarding";
    case "DEPARTED":
      return "Departed";
    case "ARRIVED":
      return "Arrived";
    case "DELAYED":
      return "Delayed";
    case "CANCELLED":
      return "Cancelled";
  }
}

export function formatMinutes(minutes: number): string {
  if (minutes === 0) return "—";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

export function getTurnaroundPercent(elapsed: number, target: number): number {
  if (target === 0) return 0;
  return Math.min(Math.round((elapsed / target) * 100), 100);
}
