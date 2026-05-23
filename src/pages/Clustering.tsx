import React, { useState, useMemo } from "react";
import { PageHeader } from "../components/ui/PageHeader";
import { Spark } from "../components/ui/Spark";
import { CLUSTER_PROFILES } from "../data/clusters";

import { 
  RefreshCw, 
  ArrowRight, 
  Layers, 
  Brain, 
  List, 
  HelpCircle 
} from "lucide-react";

interface ClusteringProps {
  go: (k: string) => void;
}

interface PcaPoint {
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

export const Clustering: React.FC<ClusteringProps> = ({ go }) => {
  const [selectedCluster, setSelectedCluster] = useState<string>("all");
  const [hoveredStation, setHoveredStation] = useState<PcaPoint | null>(null);
  const [selectedStation, setSelectedStation] = useState<PcaPoint | null>(null);

  // Generate 128 stations for PCA Projection
  // Seedable/predictable coordinates to look beautiful and clustered
  const pcaPoints = useMemo<PcaPoint[]>(() => {
    const points: PcaPoint[] = [];
    const seedRandom = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };

    // Porto Velho (MAD-02) and Angra (SSE-08) represent Cluster -1 (Outliers)
    const exactStations: PcaPoint[] = [
      { id: "TAQ-01", name: "Estação Taquari-01", state: "RS", basin: "Bacia Taquari-Antas", x: 440, y: 70, cluster: 3, score: 0.91, flow: "685 cm", rain: "261 mm" },
      { id: "REC-05", name: "Estação Recife-05", state: "PE", basin: "Recife Metropolitana", x: 460, y: 90, cluster: 3, score: 0.69, flow: "421 cm", rain: "198 mm" },
      { id: "SFR-03", name: "Estação São Francisco-03", state: "BA", basin: "Bacia do Rio São Francisco", x: 140, y: 230, cluster: 0, score: 0.63, flow: "31%", rain: "48 mm" },
      { id: "PAN-04", name: "Estação Paraguai-04", state: "MS", basin: "Pantanal Alto Paraguai", x: 180, y: 210, cluster: 0, score: 0.74, flow: "28 cm", rain: "36 mm" },
      { id: "MAD-02", name: "Estação Madeira-02", state: "RO", basin: "Bacia do Rio Madeira", x: 80, y: 50, cluster: -1, score: 0.88, flow: "0 m³/s", rain: "243 mm" },
      { id: "AMZ-07", name: "Estação Solimões-07", state: "AM", basin: "Bacia do Rio Amazonas", x: 280, y: 150, cluster: 1, score: 0.15, flow: "1240 cm", rain: "152 mm" },
      { id: "SSE-08", name: "Estação Costeira-08", state: "RJ", basin: "Litoral Sudeste", x: 410, y: 250, cluster: -1, score: 0.82, flow: "0 cm", rain: "0 mm" },
      { id: "DOC-06", name: "Estação Doce-06", state: "MG", basin: "Bacia do Rio Doce", x: 370, y: 170, cluster: 2, score: 0.58, flow: "298 cm", rain: "118 mm" }
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

      // ensure bounds
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

  const activeProfile = selectedCluster !== "all" ? CLUSTER_PROFILES[selectedCluster] : null;

  return (
    <div className="page">
      <PageHeader 
        category="INTELIGÊNCIA" 
        title="Análise de clusters (K-Means)" 
        subtitle="Mapeamento multidimensional dos perfis hidrológicos brasileiros. Projeção bidimensional (PCA) do agrupamento de 128 estações por K-Means."
        rightElement={
          <div className="row" style={{ gap: 10 }}>
            <button className="btn btn-sm" onClick={() => { setSelectedCluster("all"); setSelectedStation(null); }}>
              <RefreshCw size={12} /> Resetar filtros
            </button>
            <button className="btn btn-primary btn-sm" onClick={() => go("anomalies")}>
              Ver Anomalias <ArrowRight size={12} />
            </button>
          </div>
        }
      />

      {/* K-Means KPIs */}
      <div className="kpis">
        {[
          { label: "Algoritmo de Agrupamento", value: "K-Means", trend: "Não Supervisionado" },
          { label: "Número de Clusters (K)", value: "4 + Ruídos", trend: "K ótimo (Elbow)" },
          { label: "Coeficiente Silhouette", value: "0.71", trend: "Alta densidade" },
          { label: "Registros Analisados", value: "12.480", trend: "Dados ANA/INMET" },
          { label: "Variabilidade Explicada", value: "92%", trend: "2 componentes PCA" }
        ].map((k, i) => (
          <div key={i} className="kpi">
            <div className="kpi-label">{k.label}</div>
            <div className="kpi-value">{k.value}</div>
            <div className="kpi-trend down">● {k.trend}</div>
            <div className="kpi-spark">
              <Spark data={[15, 22, 25, 32, 45, 41, 38]} color="var(--cyan)" />
            </div>
          </div>
        ))}
      </div>

      {/* Scatter plot and side panel */}
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 16, marginTop: 18 }}>
        <div className="card" style={{ padding: 20 }}>
          <div className="card-head" style={{ marginBottom: 12 }}>
            <div className="card-title">
              <Layers size={14} className="ico" style={{ marginRight: 6 }} /> Projeção PCA 2D · Espaço de Estados Hidrológicos
            </div>
            <span className="mono small">PCA (Componente 1 e 2)</span>
          </div>

          {/* Interactive SVG scatter plot */}
          <div style={{ position: "relative", background: "oklch(0.12 0.015 240)", borderRadius: 10, padding: 10, border: "1px solid var(--border-soft)" }}>
            <svg viewBox="0 0 500 300" width="100%" height="340" style={{ display: "block" }}>
              {/* Grid Lines */}
              <line x1="250" x2="250" y1="10" y2="290" stroke="oklch(1 0 0 / 0.08)" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="10" x2="490" y1="150" y2="150" stroke="oklch(1 0 0 / 0.08)" strokeWidth="1" strokeDasharray="3 3" />

              {/* Points */}
              {pcaPoints.map((p) => {
                const colors: Record<number, string> = {
                  0: "var(--risk-med)",
                  1: "var(--risk-low)",
                  2: "var(--risk-high)",
                  3: "var(--risk-crit)",
                  [-1]: "var(--risk-fail)"
                };
                const color = colors[p.cluster];
                const active = selectedCluster === "all" || selectedCluster === String(p.cluster);
                const hovered = hoveredStation && hoveredStation.id === p.id;
                const selected = selectedStation && selectedStation.id === p.id;

                return (
                  <g key={p.id}
                     style={{ cursor: "pointer", transition: "opacity 0.2s" }}
                     opacity={active ? (hovered || selected ? 1.0 : 0.85) : 0.15}
                     onClick={() => setSelectedStation(p)}
                     onMouseEnter={() => setHoveredStation(p)}
                     onMouseLeave={() => setHoveredStation(null)}>
                    
                    {/* Ring for selected / hovered point */}
                    {(selected || hovered) && (
                      <circle cx={p.x} cy={p.y} r="8" fill="none" stroke={color} strokeWidth="1.5">
                        <animate attributeName="r" values="6;10;6" dur="1.5s" repeatCount="indefinite" />
                      </circle>
                    )}
                    
                    <circle cx={p.x} cy={p.y} r={selected ? 4.5 : hovered ? 4 : 3} fill={color} />
                  </g>
                );
              })}
            </svg>

            {/* Component Axes labels */}
            <div style={{ position: "absolute", bottom: 12, right: 18, fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--muted)" }}>
              PCA 1 (58.4% var)
            </div>
            <div style={{ position: "absolute", top: 12, left: 18, fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--muted)", transform: "rotate(90deg)", transformOrigin: "left top" }}>
              PCA 2 (34.2% var)
            </div>

            {/* Tooltip inline */}
            {(hoveredStation || selectedStation) && (
              <div style={{
                position: "absolute", bottom: 18, left: 18,
                padding: "8px 12px", borderRadius: 8,
                background: "oklch(0.20 0.03 235 / 0.95)",
                border: "1px solid var(--border)",
                maxWidth: 240, backdropFilter: "blur(6px)",
                pointerEvents: "none"
              }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text)" }}>{(hoveredStation || selectedStation)!.name}</div>
                <div className="small mono" style={{ color: "var(--text-2)", marginTop: 2 }}>
                  Estado: {(hoveredStation || selectedStation)!.state} • Cluster {(hoveredStation || selectedStation)!.cluster}
                </div>
                <div className="small" style={{ color: "var(--cyan)", marginTop: 4 }}>
                  Leitura: {(hoveredStation || selectedStation)!.flow} • Chuva: {(hoveredStation || selectedStation)!.rain}
                </div>
              </div>
            )}
          </div>

          {/* Color filter legend */}
          <div style={{ display: "flex", gap: 8, marginTop: 14, justifyContent: "space-between", flexWrap: "wrap" }}>
            {[
              { k: "all", l: "Todos", c: "var(--text)" },
              { k: "0", l: "Estiagem", c: "var(--risk-med)" },
              { k: "1", l: "Normal", c: "var(--risk-low)" },
              { k: "2", l: "Transição", c: "var(--risk-high)" },
              { k: "3", l: "Extremo", c: "var(--risk-crit)" },
              { k: "-1", l: "Ruído/Falha", c: "var(--risk-fail)" }
            ].map(item => (
              <button key={item.k}
                      onClick={() => { setSelectedCluster(item.k); setSelectedStation(null); }}
                      className={`btn btn-sm ${selectedCluster === item.k ? "" : "btn-ghost"}`}
                      style={{
                        fontSize: 11, padding: "4px 10px", borderRadius: 6,
                        border: selectedCluster === item.k ? `1px solid ${item.c}` : "1px solid transparent",
                        color: item.c
                      }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: item.c, display: "inline-block", marginRight: 6 }} />
                {item.l}
              </button>
            ))}
          </div>
        </div>

        {/* Cluster information Sidebar */}
        <div className="col" style={{ gap: 16 }}>
          <div className="card">
            <div className="card-head" style={{ marginBottom: 12 }}>
              <div className="card-title">
                <Brain size={14} className="ico" style={{ marginRight: 6 }} /> Interpretação do K-Means
              </div>
            </div>
            
            {activeProfile ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div className="row" style={{ gap: 8 }}>
                  <span style={{ width: 12, height: 12, borderRadius: 999, background: activeProfile.color }} />
                  <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>{activeProfile.name}</h3>
                </div>
                
                <p className="small" style={{ margin: 0, lineHeight: 1.5, color: "var(--text-2)" }}>
                  {activeProfile.desc}
                </p>
                
                <div style={{ padding: 12, borderRadius: 8, background: "oklch(1 0 0 / 0.02)", border: "1px solid var(--border-soft)" }}>
                  <div className="small" style={{ marginBottom: 4 }}><strong>Estatísticas Médias:</strong></div>
                  <div className="small mono">{activeProfile.lvl}</div>
                  <div className="small mono" style={{ marginTop: 2 }}>{activeProfile.rain}</div>
                  <div className="small mono" style={{ marginTop: 2 }}>População: <strong>{activeProfile.count} estações</strong> ({Math.round(activeProfile.count / 1.28)}%)</div>
                </div>

                <div className="small">
                  <strong>Principais estações de exemplo:</strong>
                  <div className="mono" style={{ color: "var(--cyan)", marginTop: 2, fontSize: 11 }}>
                    {activeProfile.stations}
                  </div>
                </div>
              </div>
            ) : (
              <div className="small" style={{ color: "var(--muted)", display: "flex", alignItems: "center", gap: 6 }}>
                <HelpCircle size={14} /> Selecione um cluster abaixo do gráfico para ver seu perfil interpretado de inteligência artificial.
              </div>
            )}
          </div>

          <div className="card">
            <div className="card-head" style={{ marginBottom: 12 }}>
              <div className="card-title">
                <List size={14} className="ico" style={{ marginRight: 6 }} /> Distribuição Geral dos Perfis
              </div>
            </div>
            
            <div className="col" style={{ gap: 8 }}>
              {Object.keys(CLUSTER_PROFILES).map(k => {
                const item = CLUSTER_PROFILES[k];
                const pct = Math.round(item.count / 1.28);
                return (
                  <div key={k}
                       onClick={() => { setSelectedCluster(k); setSelectedStation(null); }}
                       style={{
                         padding: 8, borderRadius: 8,
                         border: `1px solid ${selectedCluster === k ? item.color : "var(--border-soft)"}`,
                         background: selectedCluster === k ? `${item.color}0c` : "transparent",
                         cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center",
                         transition: "all 0.2s"
                       }}>
                    <div className="row" style={{ gap: 8 }}>
                      <span style={{ width: 8, height: 8, borderRadius: 999, background: item.color }} />
                      <span style={{ fontSize: 12, fontWeight: 500 }}>{item.name.split(":")[1]}</span>
                    </div>
                    <span className="mono small" style={{ color: "var(--text-2)" }}>{pct}% ({item.count})</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
