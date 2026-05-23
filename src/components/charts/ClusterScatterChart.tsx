import React, { useMemo } from "react";
import { STATIONS } from "../../data/stations";

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
  const pcaPoints = useMemo<PcaPoint[]>(() => {
    const points: PcaPoint[] = [];
    const seedRandom = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };

    // Original primary stations mapping for consistency
    const exactStations: PcaPoint[] = [
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
    if (c === 0) return "var(--risk-med)";   // Estiagem
    if (c === 1) return "var(--risk-low)";   // Normal
    if (c === 2) return "var(--risk-high)";  // Transição
    if (c === 3) return "var(--risk-crit)";  // Extremo
    return "var(--risk-fail)";              // Outlier
  };

  return (
    <div style={{ 
      position: "relative", 
      background: "oklch(0.12 0.015 240)", 
      borderRadius: 10, 
      padding: 10, 
      border: "1px solid var(--border-soft)" 
    }}>
      <svg viewBox="0 0 500 300" width="100%" height="340" style={{ display: "block" }}>
        {/* Grid Lines */}
        <line x1="250" x2="250" y1="10" y2="290" stroke="oklch(1 0 0 / 0.08)" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="10" x2="490" y1="150" y2="150" stroke="oklch(1 0 0 / 0.08)" strokeWidth="1" strokeDasharray="3 3" />

        {/* Ambient Cluster Bubbles */}
        <circle cx="160" cy="220" r="55" fill="var(--risk-med-bg)" opacity={0.14} stroke="var(--risk-med)" strokeWidth={1} strokeDasharray="3 3" />
        <circle cx="280" cy="140" r="75" fill="var(--risk-low-bg)" opacity={0.11} stroke="var(--risk-low)" strokeWidth={1} strokeDasharray="3 3" />
        <circle cx="360" cy="180" r="55" fill="var(--risk-high-bg)" opacity={0.14} stroke="var(--risk-high)" strokeWidth={1} strokeDasharray="3 3" />
        <circle cx="430" cy="80" r="45" fill="var(--risk-crit-bg)" opacity={0.14} stroke="var(--risk-crit)" strokeWidth={1} strokeDasharray="3 3" />

        {/* Scatter Points */}
        {pcaPoints.map((p) => {
          const active = selectedCluster === "all" || selectedCluster === String(p.cluster);
          const hovered = hoveredStation && hoveredStation.id === p.id;
          const selected = selectedStation && selectedStation.id === p.id;
          const color = getClusterColor(p.cluster);

          return (
            <g key={p.id}
               style={{ cursor: "pointer", transition: "opacity 0.2s" }}
               opacity={active ? (hovered || selected ? 1.0 : 0.85) : 0.15}
               onClick={() => setSelectedStation(selected ? null : p)}
               onMouseEnter={() => setHoveredStation(p)}
               onMouseLeave={() => setHoveredStation(null)}>
              
              {/* Pulsating ring for selected or hovered dot */}
              {(selected || hovered) && (
                <circle cx={p.x} cy={p.y} r="12" fill="none" stroke={color} strokeWidth="1.5">
                  <animate attributeName="r" values="9;13;9" dur="1.5s" repeatCount="indefinite" />
                </circle>
              )}
              
              <circle 
                cx={p.x} 
                cy={p.y} 
                r={selected ? 7.5 : hovered ? 7 : p.id.startsWith("EST") ? 4.5 : 6} 
                fill={color} 
                stroke="oklch(0 0 0 / 0.3)" 
                strokeWidth={1} 
              />
            </g>
          );
        })}
      </svg>

      {/* Component Axes labels */}
      <div style={{ position: "absolute", bottom: 12, right: 18, fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--muted)" }}>
        PCA 1 — intensidade hidrológica (58.4% var)
      </div>
      <div style={{ position: "absolute", top: 12, left: 18, fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--muted)", transform: "rotate(90deg)", transformOrigin: "left top" }}>
        PCA 2 — variação do comportamento (34.2% var)
      </div>
      
      <div style={{ position: "absolute", bottom: 12, left: 18, fontSize: 8, color: "var(--text-3)", fontStyle: "italic" }}>
        * PCA não representa localização geográfica. É uma projeção matemática de similaridade (protótipo acadêmico).
      </div>

      {/* Synchronized Tooltip */}
      {(hoveredStation || selectedStation) && (() => {
        const p = (hoveredStation || selectedStation)!;
        const match = STATIONS.find(st => st.id === p.id);
        const color = getClusterColor(p.cluster);
        const clusterNames: Record<number, string> = {
          0: "Estiagem crítica",
          1: "Comportamento normal",
          2: "Transição sazonal",
          3: "Extremos de inundação",
          [-1]: "Ruído / Falha de Sensor"
        };

        return (
          <div style={{
            position: "absolute", bottom: 18, left: 18,
            padding: "10px 14px", borderRadius: 8,
            background: "oklch(0.20 0.03 235 / 0.95)",
            border: `1px solid ${color}`,
            width: 250, backdropFilter: "blur(6px)",
            pointerEvents: "none",
            boxShadow: "0 8px 30px oklch(0 0 0 / 0.5)",
            zIndex: 20
          }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text)" }}>{match ? match.name : p.name}</div>
            <div className="small mono" style={{ color: "var(--text-3)", marginTop: 2 }}>
              UF: {match ? match.uf : p.state} • Bacia: {match ? match.basin : p.basin}
            </div>
            <div className="small" style={{ marginTop: 4, fontWeight: 500, color }}>
              Perfil: {clusterNames[p.cluster] || "Desconhecido"}
            </div>

            <div style={{ margin: "6px 0", borderTop: "1px dashed var(--border-soft)" }} />

            {/* Operational readings */}
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {match ? (
                <>
                  {match.type === "Fluviométrica" ? (
                    <>
                      {match.levelCm !== undefined && (
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10 }}>
                          <span style={{ color: "var(--text-3)" }}>Nível do Rio:</span>
                          <span className="mono" style={{ color: "var(--cyan)" }}>{match.levelCm} cm</span>
                        </div>
                      )}
                      {match.flowM3s !== undefined && (
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10 }}>
                          <span style={{ color: "var(--text-3)" }}>Vazão Estimada:</span>
                          <span className="mono" style={{ color: "var(--cyan)" }}>{match.flowM3s.toLocaleString()} m³/s</span>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="small italic" style={{ fontSize: 9, color: "var(--text-3)", marginBottom: 2 }}>
                      Estação Pluviométrica (Medição de Chuva)
                    </div>
                  )}
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10 }}>
                    <span style={{ color: "var(--text-3)" }}>Chuva 24h:</span>
                    <span className="mono" style={{ color: "var(--aqua)" }}>{match.rainfall24hMm} mm</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10 }}>
                    <span style={{ color: "var(--text-3)" }}>Acumulado 7d:</span>
                    <span className="mono" style={{ color: "var(--aqua)" }}>{match.rainfall7dMm} mm</span>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10 }}>
                    <span style={{ color: "var(--text-3)" }}>Vazão / Nível:</span>
                    <span className="mono" style={{ color: "var(--cyan)" }}>{p.flow}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10 }}>
                    <span style={{ color: "var(--text-3)" }}>Precipitação 7d:</span>
                    <span className="mono" style={{ color: "var(--aqua)" }}>{p.rain}</span>
                  </div>
                </>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, marginTop: 2 }}>
                <span style={{ color: "var(--text-3)" }}>Score IA (Anomalia):</span>
                <span className="mono" style={{ fontWeight: 600, color: p.score > 0.6 ? "var(--risk-crit)" : "var(--text)" }}>{p.score.toFixed(2)}</span>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
