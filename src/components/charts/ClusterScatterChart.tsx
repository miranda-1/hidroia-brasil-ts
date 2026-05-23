import React, { useMemo } from "react";

export interface PcaPoint {
  id: string;
  name: string;
  state: string;
  basin: string;
  x: number;
  y: number;
  cluster: number;
  score: number;
  flow: string;
  rain: string;
}

interface ClusterScatterChartProps {
  selectedCluster: string;
  hoveredStation: PcaPoint | null;
  setHoveredStation: (s: PcaPoint | null) => void;
  selectedStation: PcaPoint | null;
  setSelectedStation: (s: PcaPoint | null) => void;
  onHoverDetails?: (s: PcaPoint | null) => void;
}

export const ClusterScatterChart: React.FC<ClusterScatterChartProps> = ({
  selectedCluster,
  hoveredStation,
  setHoveredStation,
  selectedStation,
  setSelectedStation
}) => {
  // Generate 128 stations for PCA Projection
  // Seedable/predictable coordinates to look beautiful and clustered
  const pcaPoints = useMemo(() => {
    const points: PcaPoint[] = [];
    const seedRandom = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };

    // Original primary stations mapping for consistency
    const exactStations = [
      { id: "TAQ-01", name: "Estação Taquari", state: "RS", basin: "Rio Taquari-Antas", x: 440, y: 70, cluster: 3, score: 0.91, flow: "685 cm", rain: "261 mm" },
      { id: "REC-05", name: "Estação Recife", state: "PE", basin: "Capibaribe", x: 460, y: 90, cluster: 3, score: 0.69, flow: "Atípico", rain: "198 mm" },
      { id: "SFR-03", name: "Estação São Francisco", state: "BA", basin: "Rio São Francisco", x: 140, y: 230, cluster: 0, score: 0.63, flow: "31 cm", rain: "48 mm" },
      { id: "PAN-04", name: "Estação Alto Paraguai", state: "MT", basin: "Rio Paraguai", x: 180, y: 210, cluster: 0, score: 0.74, flow: "28 cm", rain: "36 mm" },
      { id: "MAD-02", name: "Estação Porto Velho", state: "RO", basin: "Rio Madeira", x: 80, y: 50, cluster: -1, score: 0.88, flow: "0 m³/s", rain: "243 mm" },
      { id: "AMZ-07", name: "Estação Humaitá", state: "AM", basin: "Rio Madeira", x: 280, y: 150, cluster: 1, score: 0.15, flow: "380 cm", rain: "152 mm" },
      { id: "SSE-08", name: "Estação Parnaíba", state: "PI", basin: "Rio Parnaíba", x: 300, y: 130, cluster: 1, score: 0.22, flow: "Normal", rain: "14 mm" },
      { id: "DOC-06", name: "Estação Rio Doce", state: "MG", basin: "Rio Doce", x: 370, y: 170, cluster: 2, score: 0.58, flow: "298 cm", rain: "118 mm" }
    ];

    exactStations.forEach(s => points.push(s));

    // Generate the rest to reach 128 points
    let idx = 0;
    while (points.length < 128) {
      const rSeed = idx + 42;
      const c = idx % 4; // distribute among cluster 0, 1, 2, 3
      let cx = 250, cy = 150;
      let devX = 35, devY = 30;

      if (c === 0) { // Estiagem
        cx = 160; cy = 220;
      } else if (c === 1) { // Normal
        cx = 280; cy = 140; devX = 55; devY = 45;
      } else if (c === 2) { // Transição
        cx = 360; cy = 180;
      } else if (c === 3) { // Extremo
        cx = 430; cy = 80; devX = 25; devY = 20;
      }

      const x = Math.round(cx + (seedRandom(rSeed) - 0.5) * devX * 2);
      const y = Math.round(cy + (seedRandom(rSeed + 1) - 0.5) * devY * 2);

      const px = Math.max(20, Math.min(480, x));
      const py = Math.max(20, Math.min(280, y));

      const states = ["RS", "MG", "BA", "SP", "RO", "AM", "PE", "PR", "SC", "MS", "MT", "PA"];
      const state = states[Math.floor(seedRandom(rSeed + 2) * states.length)];

      points.push({
        id: `EST-${10 + idx}`,
        name: `Estação Telemétrica-${10 + idx}`,
        state: state,
        basin: `Região Hidrográfica ${idx % 5}`,
        x: px,
        y: py,
        cluster: c,
        score: parseFloat((0.15 + seedRandom(rSeed + 3) * 0.6).toFixed(2)),
        flow: c === 0 ? "35%" : c === 1 ? "105%" : c === 2 ? "320 cm" : "710 cm",
        rain: `${Math.round(20 + seedRandom(rSeed + 4) * 220)} mm`
      });
      idx++;
    }

    return points;
  }, []);

  const getClusterColor = (c: number): string => {
    if (c === 0) return "var(--risk-med)";   // Estiagem (Amarelo)
    if (c === 1) return "var(--risk-low)";   // Normal (Verde)
    if (c === 2) return "var(--risk-high)";  // Transição (Laranja)
    if (c === 3) return "var(--risk-crit)";  // Extremo (Vermelho)
    return "var(--risk-fail)";              // Outlier (Cinza)
  };

  const getClusterText = (c: number): string => {
    if (c === 0) return "Cluster 0 (Estiagem)";
    if (c === 1) return "Cluster 1 (Normal)";
    if (c === 2) return "Cluster 2 (Transição)";
    if (c === 3) return "Cluster 3 (Extremo)";
    return "Cluster -1 (Outlier)";
  };

  return (
    <div style={{ position: "relative", width: "100%", height: 320, background: "oklch(1 0 0 / 0.015)", border: "1px solid var(--border-soft)", borderRadius: "var(--radius)" }}>
      {/* Abstract PCA Axes */}
      <div style={{ position: "absolute", left: 14, bottom: 10, fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--muted)", letterSpacing: "0.05em" }}>
        COMPONENTE PRINCIPAL 1 (PC1)
      </div>
      <div style={{ position: "absolute", left: 10, top: 14, fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--muted)", letterSpacing: "0.05em", transform: "rotate(-90deg)", transformOrigin: "left top", marginTop: 120 }}>
        COMPONENTE PRINCIPAL 2 (PC2)
      </div>

      <svg viewBox="0 0 500 300" style={{ width: "100%", height: "100%", display: "block" }}>
        {/* Grid lines */}
        <line x1="250" y1="0" x2="250" y2="300" stroke="var(--border-soft)" strokeDasharray="3 5" />
        <line x1="0" y1="150" x2="500" y2="150" stroke="var(--border-soft)" strokeDasharray="3 5" strokeWidth={0.8} />

        {/* Cluster outline circles (abstract centers) */}
        <circle cx="160" cy="220" r="50" fill="var(--risk-med-bg)" opacity={0.25} />
        <circle cx="280" cy="140" r="70" fill="var(--risk-low-bg)" opacity={0.2} />
        <circle cx="360" cy="180" r="50" fill="var(--risk-high-bg)" opacity={0.25} />
        <circle cx="430" cy="80" r="40" fill="var(--risk-crit-bg)" opacity={0.25} />

        {/* Scatter points */}
        {pcaPoints.map((p) => {
          const isSelected = selectedCluster === "all" || selectedCluster === String(p.cluster);
          const isHovered = hoveredStation?.id === p.id;
          const isClicked = selectedStation?.id === p.id;

          const color = getClusterColor(p.cluster);

          return (
            <circle
              key={p.id}
              cx={p.x}
              cy={p.y}
              r={isHovered ? 8 : isClicked ? 7 : p.id.startsWith("EST") ? 4 : 6.5}
              fill={color}
              opacity={isSelected ? (isHovered ? 1 : 0.8) : 0.08}
              stroke={isClicked ? "var(--text)" : isHovered ? "var(--text)" : p.id.startsWith("EST") ? "none" : "oklch(1 0 0 / 0.2)"}
              strokeWidth={1.5}
              style={{ cursor: "pointer", transition: "all 0.1s ease" }}
              onMouseEnter={() => setHoveredStation(p)}
              onMouseLeave={() => setHoveredStation(null)}
              onClick={() => setSelectedStation(isClicked ? null : p)}
            />
          );
        })}
      </svg>

      {/* Hover card inside scatter */}
      {hoveredStation && (
        <div className="card" style={{
          position: "absolute",
          left: hoveredStation.x > 250 ? hoveredStation.x * 0.9 - 190 : hoveredStation.x * 0.9 + 20,
          top: hoveredStation.y > 150 ? hoveredStation.y * 0.9 - 130 : hoveredStation.y * 0.9 + 10,
          width: 200,
          padding: 10,
          background: "oklch(0.20 0.03 235 / 0.94)",
          backdropFilter: "blur(6px)",
          border: `1px solid ${getClusterColor(hoveredStation.cluster)}33`,
          zIndex: 10,
          pointerEvents: "none",
          boxShadow: "0 8px 30px oklch(0 0 0 / 0.6)"
        }}>
          <div className="mono" style={{ fontSize: 9, color: "var(--muted-2)", marginBottom: 2 }}>{hoveredStation.id}</div>
          <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text)" }}>{hoveredStation.name}</div>
          <div className="small" style={{ fontSize: 10, color: "var(--text-2)", marginTop: 2 }}>{hoveredStation.basin} • {hoveredStation.state}</div>
          
          <div className="divider" style={{ margin: "6px 0" }} />

          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10 }}>
            <span style={{ color: "var(--muted)" }}>Score Anomalia:</span>
            <span className="mono" style={{ fontWeight: 600, color: hoveredStation.score > 0.6 ? "var(--risk-crit)" : "var(--text)" }}>{hoveredStation.score}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, marginTop: 2 }}>
            <span style={{ color: "var(--muted)" }}>Agrupamento:</span>
            <span style={{ fontWeight: 600, color: getClusterColor(hoveredStation.cluster) }}>{getClusterText(hoveredStation.cluster)}</span>
          </div>
        </div>
      )}
    </div>
  );
};
