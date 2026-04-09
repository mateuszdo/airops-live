"use client";

import { useEffect, useState } from "react";
import { Plane, Wifi } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";

interface HeaderProps {
  lastUpdated: Date;
}

export default function Header({ lastUpdated }: HeaderProps) {
  const [time, setTime] = useState("");
  const [lastUpdatedStr, setLastUpdatedStr] = useState("");

  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "Europe/London",
        }),
      );
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setLastUpdatedStr(
      lastUpdated.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    );
  }, [lastUpdated]);

  return (
    <header
      className="
      border-b border-slate-200 dark:border-slate-800
      bg-white dark:bg-slate-950
      px-6 py-4 flex items-center justify-between
    "
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-500/10 rounded-lg">
          <Plane size={20} className="text-blue-400" />
        </div>
        <div>
          <h1 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            AirOps Live
          </h1>
          <p className="text-xs text-slate-500">Heathrow Ground Operations</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Wifi size={13} className="text-emerald-400" />
          <span>Live</span>
          <span className="text-slate-400 dark:text-slate-600">·</span>
          <span>Updated {lastUpdatedStr}</span>
        </div>
        <div className="text-sm font-mono font-medium text-slate-700 dark:text-slate-300">
          {time} <span className="text-slate-400 text-xs">LHR</span>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
