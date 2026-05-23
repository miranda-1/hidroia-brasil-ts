import React from "react";
import { getRiskClass } from "../../utils/status";

interface StatusBadgeProps {
  level: "low" | "med" | "high" | "crit" | "fail";
  label?: string;
}

const RISK_LABEL: Record<string, string> = {
  low: "Normal",
  med: "Atenção",
  high: "Atípico",
  crit: "Crítico",
  fail: "Falha"
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ level, label }) => {
  return (
    <span className={getRiskClass(level)}>
      {label || RISK_LABEL[level]}
    </span>
  );
};
