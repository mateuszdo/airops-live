import { FlightStatus } from "@/lib/types";
import { getStatusStyles, getStatusLabel } from "@/lib/utils";

interface BadgeProps {
  status: FlightStatus;
}

export default function Badge({ status }: BadgeProps) {
  return (
    <span
      className={`
      inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
      ${getStatusStyles(status)}
    `}
    >
      {getStatusLabel(status)}
    </span>
  );
}
