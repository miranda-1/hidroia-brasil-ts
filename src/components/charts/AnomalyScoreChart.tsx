import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceDot
} from "recharts";

interface ChartDataPoint {
  day: string;
  level: number;
  normalMin: number;
  normalMax: number;
  anomaly?: boolean;
}

interface AnomalyScoreChartProps {
  data: ChartDataPoint[];
  unit?: string;
  riskColor?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: ChartDataPoint;
  }>;
  unit?: string;
  riskColor?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  unit = "cm",
  riskColor = "var(--cyan)"
}) => {
  if (active && payload && payload.length) {
    const p = payload[0].payload;
    return (
      <div className="card" style={{
        padding: "10px 12px",
        background: "oklch(0.20 0.03 235 / 0.96)",
        border: "1px solid var(--border-soft)",
        boxShadow: "0 4px 20px oklch(0 0 0 / 0.5)",
        fontSize: 11
      }}>
        <div className="mono small" style={{ marginBottom: 4 }}>Dia {p.day}</div>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
          <span style={{ color: "var(--text-2)" }}>Nível observado:</span>
          <span className="mono" style={{ fontWeight: 600, color: p.anomaly ? "var(--risk-crit)" : riskColor }}>
            {p.level} {unit}
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 16, marginTop: 2 }}>
          <span style={{ color: "var(--muted)" }}>Envelope climatológico:</span>
          <span className="mono" style={{ color: "var(--muted)" }}>
            {p.normalMin} - {p.normalMax} {unit}
          </span>
        </div>
        {p.anomaly && (
          <div style={{ color: "var(--risk-crit)", fontWeight: 600, marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}>
            ⚠️ Anomalia Crítica Detectada
          </div>
        )}
      </div>
    );
  }
  return null;
};

export const AnomalyScoreChart: React.FC<AnomalyScoreChartProps> = ({
  data,
  unit = "cm",
  riskColor = "var(--cyan)"
}) => {
  // Find anomaly points for reference dots
  const anomalyPoints = data.filter(d => d.anomaly);

  return (
    <div style={{ width: "100%", height: "100%", minHeight: 180 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorLevel" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={riskColor} stopOpacity={0.25} />
              <stop offset="95%" stopColor={riskColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          
          <CartesianGrid strokeDasharray="3 5" stroke="var(--border-soft)" vertical={false} />
          
          <XAxis 
            dataKey="day" 
            tickLine={false} 
            stroke="var(--muted-2)" 
            tick={{ fill: "var(--muted)", fontSize: 10, fontFamily: "var(--font-mono)" }} 
          />
          <YAxis 
            tickLine={false} 
            axisLine={false}
            stroke="var(--muted-2)" 
            tick={{ fill: "var(--muted)", fontSize: 10, fontFamily: "var(--font-mono)" }} 
          />
          
          <Tooltip content={<CustomTooltip unit={unit} riskColor={riskColor} />} />

          {/* Climatological Envelope (Area) */}
          <Area
            type="monotone"
            dataKey="normalMax"
            stroke="none"
            fill="oklch(0.78 0.13 210 / 0.04)"
          />
          
          {/* Observed Level Line */}
          <Area
            type="monotone"
            dataKey="level"
            stroke={riskColor}
            strokeWidth={1.8}
            fillOpacity={1}
            fill="url(#colorLevel)"
          />

          {/* Render anomaly dots manually via ReferenceDot */}
          {anomalyPoints.map((ap, i) => (
            <ReferenceDot
              key={i}
              x={ap.day}
              y={ap.level}
              r={5}
              fill="var(--risk-crit)"
              stroke="var(--text)"
              strokeWidth={1.5}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
