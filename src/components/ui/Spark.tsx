import React from "react";

interface SparkProps {
  data: number[];
  color?: string;
  w?: number;
  h?: number;
}

export const Spark: React.FC<SparkProps> = ({ data, color = "var(--cyan)", w = 90, h = 28 }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const x = (i: number) => (i / (data.length - 1)) * w;
  const y = (v: number) => h - ((v - min) / (max - min || 1)) * h;
  const d = data.map((v, i) => `${i ? "L" : "M"}${x(i)},${y(v)}`).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: "block" }}>
      <path d={d} fill="none" stroke={color} strokeWidth="1.5" opacity="0.85" />
    </svg>
  );
};
