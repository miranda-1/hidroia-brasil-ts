import React from "react";

interface MetricCardProps {
  label: string;
  value: string;
  unit?: string;
  trend?: string;
  trendUp?: boolean;
  ok?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  unit,
  trend,
  trendUp = false,
  ok = false
}) => {
  return (
    <div className="kpi">
      <div className="kpi-label">
        {label}
      </div>
      <div className="kpi-value">
        {value}
        {unit && <span className="kpi-unit" style={{ marginLeft: 4 }}>{unit}</span>}
      </div>
      {trend && (
        <div className={`kpi-trend ${ok ? "down" : trendUp ? "up" : ""}`} style={{ fontSize: 10 }}>
          {trend}
        </div>
      )}
    </div>
  );
};
