export const RISK_LABEL: Record<string, string> = {
  low: "Normal",
  med: "Atenção",
  high: "Atípico",
  crit: "Crítico",
  fail: "Falha"
};

export const RISK_LABEL_LONG: Record<string, string> = {
  low: "Comportamento normal",
  med: "Atenção",
  high: "Comportamento atípico",
  crit: "Anomalia crítica",
  fail: "Possível falha de sensor"
};

export const getRiskClass = (level: string): string => {
  return `risk-pill risk-${level}`;
};
