interface FilterBarProps {
  carriers: string[];
  selectedCarrier: string;
  onCarrierChange: (v: string) => void;
  gates: string[];
  selectedGate: string;
  onGateChange: (v: string) => void;
  teams: string[];
  selectedTeam: string;
  onTeamChange: (v: string) => void;
}

export default function FilterBar({
  carriers,
  selectedCarrier,
  onCarrierChange,
  gates,
  selectedGate,
  onGateChange,
  teams,
  selectedTeam,
  onTeamChange,
}: FilterBarProps) {
  const selectClass = `
    text-xs rounded-lg px-3 py-1.5
    bg-slate-100 dark:bg-slate-800
    border border-slate-200 dark:border-slate-700
    text-slate-700 dark:text-slate-300
    focus:outline-none focus:ring-2 focus:ring-blue-500/30
  `;

  return (
    <div className="px-4 py-3 flex flex-wrap gap-3 border-b border-slate-100 dark:border-slate-800">
      <div className="flex items-center gap-2">
        <label className="text-xs text-slate-500">Carrier</label>
        <select
          className={selectClass}
          value={selectedCarrier}
          onChange={(e) => onCarrierChange(e.target.value)}
        >
          {carriers.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-2">
        <label className="text-xs text-slate-500">Gate</label>
        <select
          className={selectClass}
          value={selectedGate}
          onChange={(e) => onGateChange(e.target.value)}
        >
          {gates.map((g) => (
            <option key={g}>{g}</option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-2">
        <label className="text-xs text-slate-500">Team</label>
        <select
          className={selectClass}
          value={selectedTeam}
          onChange={(e) => onTeamChange(e.target.value)}
        >
          {teams.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
