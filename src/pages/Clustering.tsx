import React, { useState, useMemo } from "react";
import { PageHeader } from "../components/ui/PageHeader";
import { Spark } from "../components/ui/Spark";
import { CLUSTER_PROFILES } from "../data/clusters";
import { STATIONS } from "../data/stations";

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
          { label: "Algoritmo", value: "K-Means", trend: "Agrupamento não supervisionado" },
          { label: "Clusters", value: "4 + ruído", trend: "Perfis hidrológicos simulados" },
          { label: "Silhouette", value: "0.71", trend: "Boa separação entre grupos" },
          { label: "Base analisada", value: "8 estações", trend: "Leituras hidrometeorológicas simuladas" },
          { label: "PCA", value: "92%", trend: "Variabilidade explicada" }
        ].map((k, i) => (
          <div key={i} className="kpi">
            <div className="kpi-label">{k.label}</div>
            <div className="kpi-value">{k.value}</div>
            <div className="kpi-trend down" style={{ color: "var(--text-3)" }}>● {k.trend}</div>
            <div className="kpi-spark">
              <Spark data={[15, 22, 25, 32, 45, 41, 38]} color="var(--cyan)" />
            </div>
          </div>
        ))}
      </div>

      {/* Scatter plot and side panel */}
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 16, marginTop: 18 }}>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ marginBottom: 14 }}>
            <div className="card-title" style={{ fontSize: 16, fontWeight: 600, color: "var(--text)" }}>
              <Layers size={16} className="ico" style={{ marginRight: 8, color: "var(--cyan)" }} /> Mapa de similaridade das estações
            </div>
            <div className="card-eyebrow" style={{ marginTop: 4, textTransform: "none", fontSize: 11, color: "var(--text-3)", letterSpacing: "normal" }}>
              Projeção PCA dos dados simulados usados pelo K-Means
            </div>
            <p className="small" style={{ margin: "6px 0 0 0", color: "var(--text-2)", lineHeight: 1.4 }}>
              Cada ponto representa uma estação hidrometeorológica simulada. Pontos próximos possuem comportamento parecido.
            </p>
          </div>

          {/* Interactive SVG scatter plot */}
          <div style={{ position: "relative", background: "oklch(0.12 0.015 240)", borderRadius: 10, padding: 10, border: "1px solid var(--border-soft)" }}>
            <svg viewBox="0 0 500 300" width="100%" height="340" style={{ display: "block" }}>
              {/* Grid Lines */}
              <line x1="250" x2="250" y1="10" y2="290" stroke="oklch(1 0 0 / 0.08)" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="10" x2="490" y1="150" y2="150" stroke="oklch(1 0 0 / 0.08)" strokeWidth="1" strokeDasharray="3 3" />

              {/* Bolhas/Áreas suaves de agrupamento de clusters (K-Means) */}
              <circle cx="160" cy="220" r="55" fill="var(--risk-med-bg)" opacity={0.14} stroke="var(--risk-med)" strokeWidth={1} strokeDasharray="3 3" />
              <circle cx="280" cy="140" r="75" fill="var(--risk-low-bg)" opacity={0.11} stroke="var(--risk-low)" strokeWidth={1} strokeDasharray="3 3" />
              <circle cx="360" cy="180" r="55" fill="var(--risk-high-bg)" opacity={0.14} stroke="var(--risk-high)" strokeWidth={1} strokeDasharray="3 3" />
              <circle cx="430" cy="80" r="45" fill="var(--risk-crit-bg)" opacity={0.14} stroke="var(--risk-crit)" strokeWidth={1} strokeDasharray="3 3" />

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

            {/* Tooltip inline */}
            {(hoveredStation || selectedStation) && (() => {
              const p = (hoveredStation || selectedStation)!;
              const match = STATIONS.find(st => st.id === p.id);
              const colors: Record<number, string> = {
                0: "var(--risk-med)",
                1: "var(--risk-low)",
                2: "var(--risk-high)",
                3: "var(--risk-crit)",
                [-1]: "var(--risk-fail)"
              };
              const color = colors[p.cluster] || "var(--text)";
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

                  {/* Leituras Operacionais */}
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

          {/* Legenda explicativa rica */}
          <div style={{ 
            marginTop: 14, 
            padding: "10px 14px", 
            borderRadius: 8, 
            background: "oklch(1 0 0 / 0.01)", 
            border: "1px solid var(--border-soft)", 
            fontSize: 11,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "8px 16px",
            color: "var(--text-2)"
          }}>
            <div>• <strong style={{ color: "var(--text)" }}>Cada ponto:</strong> uma estação simulada monitorada.</div>
            <div>• <strong style={{ color: "var(--text)" }}>Distância:</strong> grau de similaridade (comportamento próximo).</div>
            <div>• <strong style={{ color: "var(--text)" }}>Cores:</strong> perfis hidrológicos (clusters do K-Means).</div>
            <div>• <strong style={{ color: "var(--text)" }}>Ponto isolado:</strong> possível ruído ou falha física de sensor.</div>
          </div>

          {/* Color filter legend */}
          <div style={{ display: "flex", gap: 6, marginTop: 12, justifyContent: "space-between", flexWrap: "wrap" }}>
            {[
              { k: "all", l: "Todos os perfis", c: "var(--text)" },
              { k: "0", l: "Estiagem crítica", c: "var(--risk-med)" },
              { k: "1", l: "Comportamento normal", c: "var(--risk-low)" },
              { k: "2", l: "Transição sazonal", c: "var(--risk-high)" },
              { k: "3", l: "Extremos de inundação", c: "var(--risk-crit)" },
              { k: "-1", l: "Ruído/Falha de Sensor", c: "var(--risk-fail)" }
            ].map(item => (
              <button key={item.k}
                      onClick={() => { setSelectedCluster(item.k); setSelectedStation(null); }}
                      className={`btn btn-sm ${selectedCluster === item.k ? "" : "btn-ghost"}`}
                      style={{
                        fontSize: 11, padding: "4px 8px", borderRadius: 6,
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
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <p className="small" style={{ margin: 0, lineHeight: 1.5, color: "var(--text-2)" }}>
                  Cada ponto representa uma estação hidrometeorológica simulada. O algoritmo K-Means agrupa estações com leituras parecidas, usando atributos como chuva, vazão, nível do rio e score de anomalia.
                </p>
                <p className="small" style={{ margin: 0, lineHeight: 1.5, color: "var(--text-2)" }}>
                  Quando um grupo aparece separado dos outros, significa que ele possui comportamento diferente, como seca, cheia, transição sazonal ou falha de sensor.
                </p>
                <div style={{ 
                  marginTop: 4, 
                  padding: 10, 
                  borderRadius: 8, 
                  background: "oklch(1 0 0 / 0.02)", 
                  border: "1px dashed var(--border-soft)",
                  color: "var(--cyan)",
                  fontSize: 11,
                  display: "flex",
                  alignItems: "center",
                  gap: 6
                }}>
                  <HelpCircle size={14} style={{ flexShrink: 0 }} />
                  <span>Dica: Clique nos botões de perfil abaixo do gráfico para analisar detalhadamente cada grupo hidrológico.</span>
                </div>
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
