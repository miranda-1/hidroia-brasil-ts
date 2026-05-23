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
  type?: "Fluviométrica" | "Pluviométrica";
  levelCm?: number;
  flowM3s?: number;
  rainfall24hMm?: number;
  rainfall7dMm?: number;
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
    // Porto Velho (MAD-02) and others represent the 8 simulated stations
    const exactStations: PcaPoint[] = [
      { id: "TAQ-01", name: "Estação Taquari", state: "RS", basin: "Rio Taquari-Antas", x: 440, y: 70, cluster: 3, score: 0.91, flow: "685 cm", rain: "261 mm", type: "Fluviométrica", levelCm: 685, flowM3s: 4200, rainfall24hMm: 82, rainfall7dMm: 261 },
      { id: "REC-05", name: "Estação Recife", state: "PE", basin: "Capibaribe", x: 460, y: 90, cluster: 3, score: 0.69, flow: "Atípico", rain: "198 mm", type: "Pluviométrica", rainfall24hMm: 96, rainfall7dMm: 198 },
      { id: "SFR-03", name: "Estação São Francisco", state: "BA", basin: "Rio São Francisco", x: 140, y: 230, cluster: 0, score: 0.63, flow: "31 cm", rain: "48 mm", type: "Fluviométrica", levelCm: 31, flowM3s: 680, rainfall24hMm: 0, rainfall7dMm: 48 },
      { id: "PAN-04", name: "Estação Alto Paraguai", state: "MT", basin: "Rio Paraguai", x: 180, y: 210, cluster: 0, score: 0.74, flow: "28 cm", rain: "36 mm", type: "Fluviométrica", levelCm: 28, flowM3s: 120, rainfall24hMm: 0, rainfall7dMm: 36 },
      { id: "MAD-02", name: "Estação Porto Velho", state: "RO", basin: "Rio Madeira", x: 80, y: 50, cluster: -1, score: 0.88, flow: "0 m³/s", rain: "243 mm", type: "Fluviométrica", levelCm: 0, flowM3s: 0, rainfall24hMm: 0, rainfall7dMm: 243 },
      { id: "AMZ-07", name: "Estação Humaitá", state: "AM", basin: "Rio Madeira", x: 280, y: 150, cluster: 1, score: 0.15, flow: "380 cm", rain: "152 mm", type: "Fluviométrica", levelCm: 380, flowM3s: 12500, rainfall24hMm: 12, rainfall7dMm: 152 },
      { id: "SSE-08", name: "Estação Parnaíba", state: "PI", basin: "Rio Parnaíba", x: 300, y: 130, cluster: 1, score: 0.22, flow: "Normal", rain: "14 mm", type: "Pluviométrica", rainfall24hMm: 0, rainfall7dMm: 14 },
      { id: "DOC-06", name: "Estação Rio Doce", state: "MG", basin: "Rio Doce", x: 370, y: 170, cluster: 2, score: 0.58, flow: "298 cm", rain: "118 mm", type: "Fluviométrica", levelCm: 298, flowM3s: 150, rainfall24hMm: 18, rainfall7dMm: 118 }
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

      // Map to one of our 8 simulated stations for maximum coherence
      let name = "";
      let state = "";
      let basin = "";
      let type: "Fluviométrica" | "Pluviométrica" = "Fluviométrica";
      let levelCm: number | undefined = undefined;
      let flowM3s: number | undefined = undefined;
      let rainfall24hMm = 0;
      let rainfall7dMm = 0;
      let score = 0.0;

      if (c === 0) { // Estiagem: São Francisco or Alto Paraguai
        if (idx % 2 === 0) {
          name = "Estação São Francisco";
          state = "BA";
          basin = "Rio São Francisco";
          type = "Fluviométrica";
          levelCm = Math.round(25 + seedRandom(rSeed) * 10);
          flowM3s = Math.round(600 + seedRandom(rSeed + 1) * 150);
          rainfall24hMm = 0;
          rainfall7dMm = Math.round(35 + seedRandom(rSeed + 2) * 20);
          score = parseFloat((0.55 + seedRandom(rSeed + 3) * 0.15).toFixed(2));
        } else {
          name = "Estação Alto Paraguai";
          state = "MT";
          basin = "Rio Paraguai";
          type = "Fluviométrica";
          levelCm = Math.round(18 + seedRandom(rSeed) * 15);
          flowM3s = Math.round(90 + seedRandom(rSeed + 1) * 50);
          rainfall24hMm = 0;
          rainfall7dMm = Math.round(25 + seedRandom(rSeed + 2) * 20);
          score = parseFloat((0.65 + seedRandom(rSeed + 3) * 0.15).toFixed(2));
        }
      } else if (c === 1) { // Normal: Humaitá or Parnaíba
        if (idx % 2 === 0) {
          name = "Estação Humaitá";
          state = "AM";
          basin = "Rio Madeira";
          type = "Fluviométrica";
          levelCm = Math.round(340 + seedRandom(rSeed) * 80);
          flowM3s = Math.round(11000 + seedRandom(rSeed + 1) * 3000);
          rainfall24hMm = Math.round(seedRandom(rSeed + 2) * 15);
          rainfall7dMm = Math.round(120 + seedRandom(rSeed + 3) * 60);
          score = parseFloat((0.10 + seedRandom(rSeed + 4) * 0.12).toFixed(2));
        } else {
          name = "Estação Parnaíba";
          state = "PI";
          basin = "Rio Parnaíba";
          type = "Pluviométrica";
          rainfall24hMm = Math.round(seedRandom(rSeed + 2) * 8);
          rainfall7dMm = Math.round(10 + seedRandom(rSeed + 3) * 20);
          score = parseFloat((0.15 + seedRandom(rSeed + 4) * 0.12).toFixed(2));
        }
      } else if (c === 2) { // Transição: Rio Doce
        name = "Estação Rio Doce";
        state = "MG";
        basin = "Rio Doce";
        type = "Fluviométrica";
        levelCm = Math.round(240 + seedRandom(rSeed) * 80);
        flowM3s = Math.round(110 + seedRandom(rSeed + 1) * 60);
        rainfall24hMm = Math.round(5 + seedRandom(rSeed + 2) * 20);
        rainfall7dMm = Math.round(80 + seedRandom(rSeed + 3) * 50);
        score = parseFloat((0.45 + seedRandom(rSeed + 4) * 0.15).toFixed(2));
      } else if (c === 3) { // Extremo: Taquari or Recife
        if (idx % 2 === 0) {
          name = "Estação Taquari";
          state = "RS";
          basin = "Rio Taquari-Antas";
          type = "Fluviométrica";
          levelCm = Math.round(580 + seedRandom(rSeed) * 150);
          flowM3s = Math.round(3300 + seedRandom(rSeed + 1) * 1500);
          rainfall24hMm = Math.round(50 + seedRandom(rSeed + 2) * 50);
          rainfall7dMm = Math.round(200 + seedRandom(rSeed + 3) * 90);
          score = parseFloat((0.75 + seedRandom(rSeed + 4) * 0.18).toFixed(2));
        } else {
          name = "Estação Recife";
          state = "PE";
          basin = "Capibaribe";
          type = "Pluviométrica";
          rainfall24hMm = Math.round(60 + seedRandom(rSeed + 2) * 50);
          rainfall7dMm = Math.round(150 + seedRandom(rSeed + 3) * 80);
          score = parseFloat((0.60 + seedRandom(rSeed + 4) * 0.18).toFixed(2));
        }
      }

      points.push({
        id: `EST-${10 + idx}`,
        name: name,
        state: state,
        basin: basin,
        x: px,
        y: py,
        cluster: c,
        score: score,
        flow: levelCm ? `${levelCm} cm` : "Normal",
        rain: `${rainfall7dMm} mm`,
        type: type,
        levelCm: levelCm,
        flowM3s: flowM3s,
        rainfall24hMm: rainfall24hMm,
        rainfall7dMm: rainfall7dMm
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
            <p className="small" style={{ margin: "6px 0 0 0", color: "var(--text-2)", lineHeight: 1.4, maxWidth: "100%", wordBreak: "break-word", whiteSpace: "normal" }}>
              Cada ponto representa uma estação hidrometeorológica simulada. Pontos próximos possuem comportamento parecido.
            </p>
          </div>

          {/* Interactive SVG scatter plot */}
          <div style={{ 
            position: "relative", 
            background: "oklch(0.12 0.015 240)", 
            borderRadius: 10, 
            padding: "14px 14px 10px 14px", 
            border: "1px solid var(--border-soft)",
            display: "flex",
            flexDirection: "column"
          }}>
            <div style={{ position: "relative", width: "100%" }}>
              <svg viewBox="0 0 500 300" width="100%" height="340" style={{ display: "block" }}>
                {/* Grid Lines */}
                <line x1="250" x2="250" y1="10" y2="290" stroke="oklch(1 0 0 / 0.08)" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="10" x2="490" y1="150" y2="150" stroke="oklch(1 0 0 / 0.08)" strokeWidth="1" strokeDasharray="3 3" />

                {/* Bolhas/Áreas suaves de agrupamento de clusters (K-Means) */}
                <circle cx="160" cy="220" r="55" fill="var(--risk-med-bg)" opacity={0.14} stroke="var(--risk-med)" strokeWidth={1} strokeDasharray="3 3" />
                <circle cx="280" cy="140" r="75" fill="var(--risk-low-bg)" opacity={0.11} stroke="var(--risk-low)" strokeWidth={1} strokeDasharray="3 3" />
                <circle cx="360" cy="180" r="55" fill="var(--risk-high-bg)" opacity={0.14} stroke="var(--risk-high)" strokeWidth={1} strokeDasharray="3 3" />
                <circle cx="430" cy="80" r="45" fill="var(--risk-crit-bg)" opacity={0.14} stroke="var(--risk-crit)" strokeWidth={1} strokeDasharray="3 3" />

                {/* Rótulos dos Clusters */}
                <text x="160" y="223" fill="var(--risk-med)" fontSize="10" fontWeight="600" textAnchor="middle" opacity="0.65" style={{ pointerEvents: "none", letterSpacing: "0.05em", fontFamily: "var(--font-mono)" }}>ESTIAGEM</text>
                <text x="280" y="143" fill="var(--risk-low)" fontSize="10" fontWeight="600" textAnchor="middle" opacity="0.65" style={{ pointerEvents: "none", letterSpacing: "0.05em", fontFamily: "var(--font-mono)" }}>NORMAL</text>
                <text x="360" y="183" fill="var(--risk-high)" fontSize="10" fontWeight="600" textAnchor="middle" opacity="0.65" style={{ pointerEvents: "none", letterSpacing: "0.05em", fontFamily: "var(--font-mono)" }}>TRANSIÇÃO</text>
                <text x="430" y="83" fill="var(--risk-crit)" fontSize="10" fontWeight="600" textAnchor="middle" opacity="0.65" style={{ pointerEvents: "none", letterSpacing: "0.05em", fontFamily: "var(--font-mono)" }}>INUNDAÇÃO</text>
                <text x="80" y="66" fill="var(--risk-fail)" fontSize="9" fontWeight="600" textAnchor="middle" opacity="0.65" style={{ pointerEvents: "none", letterSpacing: "0.05em", fontFamily: "var(--font-mono)" }}>FALHA/RUÍDO</text>

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
              <div style={{ position: "absolute", bottom: 10, right: 15, fontFamily: "var(--font-mono)", fontSize: 8.5, color: "var(--text-3)", opacity: 0.8 }} title="chuva, vazão, nível e score">
                Eixo X — intensidade hidrológica
              </div>
              <div style={{ position: "absolute", top: 15, left: 12, fontFamily: "var(--font-mono)", fontSize: 8.5, color: "var(--text-3)", opacity: 0.8, transform: "rotate(90deg)", transformOrigin: "left top" }} title="normalidade, seca, cheia ou falha">
                Eixo Y — variação do comportamento
              </div>

              {/* Tooltip inline */}
              {(hoveredStation || selectedStation) && (() => {
                const p = (hoveredStation || selectedStation)!;
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
                  [-1]: "Inconsistência Telemétrica/Falha"
                };

                const interpretations: Record<number, string> = {
                  0: "Interpretação: baixa chuva ou baixa vazão.",
                  1: "Interpretação: leitura dentro da normalidade.",
                  2: "Interpretação: comportamento sutil de transição.",
                  3: "Interpretação: chuva intensa ou subida de nível.",
                  [-1]: "Interpretação: possível anomalia de sensor ou falha."
                };

                const name = p.name;
                const state = p.state;
                const basin = p.basin;
                const type = p.type || "Fluviométrica";
                const levelCm = p.levelCm;
                const flowM3s = p.flowM3s;
                const rainfall24hMm = p.rainfall24hMm;
                const rainfall7dMm = p.rainfall7dMm;
                const score = p.score;
                const interpretation = interpretations[p.cluster] || "";

                return (
                  <div style={{
                    position: "absolute",
                    left: p.x > 250 ? `calc(${(p.x / 5)}% - 250px)` : `calc(${(p.x / 5)}% + 15px)`,
                    top: p.y > 150 ? `calc(${(p.y / 3)}% - 170px)` : `calc(${(p.y / 3)}% + 15px)`,
                    padding: "10px 12px", borderRadius: 8,
                    background: "rgba(8, 25, 35, 0.82)",
                    backdropFilter: "blur(8px)",
                    border: `1px solid ${color}`,
                    width: 230,
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
                    zIndex: 20,
                    pointerEvents: "none"
                  }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text)" }}>{name} — {state}</div>
                    <div className="small mono" style={{ color: "var(--text-3)", fontSize: 9, marginTop: 1 }}>
                      Bacia: {basin} • Tipo: {type}
                    </div>
                    <div className="small" style={{ marginTop: 3, fontWeight: 600, color, fontSize: 10 }}>
                      Perfil: {clusterNames[p.cluster] || "Desconhecido"}
                    </div>

                    <div style={{ margin: "5px 0", borderTop: "1px dashed var(--border-soft)" }} />

                    {/* Leituras Operacionais */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 2, fontSize: 9.5 }}>
                      {type === "Fluviométrica" ? (
                        <>
                          {levelCm !== undefined && (
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                              <span style={{ color: "var(--text-3)" }}>Nível:</span>
                              <span className="mono" style={{ color: "var(--cyan)" }}>{levelCm} cm</span>
                            </div>
                          )}
                          {flowM3s !== undefined && (
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                              <span style={{ color: "var(--text-3)" }}>Vazão:</span>
                              <span className="mono" style={{ color: "var(--cyan)" }}>{flowM3s.toLocaleString()} m³/s</span>
                            </div>
                          )}
                        </>
                      ) : null}
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "var(--text-3)" }}>Chuva 24h:</span>
                        <span className="mono" style={{ color: "var(--aqua)" }}>{rainfall24hMm} mm</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "var(--text-3)" }}>Chuva 7d:</span>
                        <span className="mono" style={{ color: "var(--aqua)" }}>{rainfall7dMm} mm</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "var(--text-3)" }}>Score IA (Anomalia):</span>
                        <span className="mono" style={{ fontWeight: 600, color: score > 0.6 ? "var(--risk-crit)" : "var(--text)" }}>{score.toFixed(2)}</span>
                      </div>
                    </div>

                    {interpretation && (
                      <>
                        <div style={{ margin: "5px 0", borderTop: "1px dashed var(--border-soft)" }} />
                        <div style={{ fontSize: 9.5, color: "var(--text-2)", fontStyle: "italic", lineHeight: 1.25 }}>
                          {interpretation}
                        </div>
                      </>
                    )}
                  </div>
                );
              })()}
            </div>

            <div style={{ marginTop: 6, fontSize: 10, color: "var(--text-3)", fontStyle: "italic", textAlign: "left" }}>
              * PCA não representa localização geográfica. É uma projeção matemática de similaridade (protótipo acadêmico).
            </div>
          </div>

          {/* Legenda explicativa rica */}
          <div style={{ 
            marginTop: 14, 
            padding: "14px", 
            borderRadius: 8, 
            background: "oklch(0.15 0.02 240 / 0.4)", 
            border: "1px solid var(--border-soft)", 
            fontSize: 12,
            color: "var(--text-2)"
          }}>
            <div style={{ fontWeight: 600, color: "var(--text)", marginBottom: 8 }}>Como ler o gráfico:</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 16px", marginBottom: 10 }}>
              <div>• <strong style={{ color: "var(--text)" }}>Cada ponto:</strong> uma estação simulada</div>
              <div>• <strong style={{ color: "var(--text)" }}>Cores:</strong> grupos encontrados pelo K-Means</div>
              <div>• <strong style={{ color: "var(--text)" }}>Distância:</strong> proximidade indica similaridade comportamental</div>
              <div>• <strong style={{ color: "var(--text)" }}>Ponto isolado:</strong> possível falha, ruído ou leitura fora do padrão</div>
            </div>
            <div style={{ 
              background: "oklch(0.18 0.04 200 / 0.15)", 
              borderLeft: "3px solid var(--cyan)", 
              padding: "6px 12px", 
              borderRadius: 4, 
              fontSize: 11, 
              color: "var(--cyan)", 
              fontWeight: 600,
              display: "inline-block"
            }}>
              💡 Regra de Ouro: Quanto mais perto os pontos estiverem, mais parecido é o comportamento das estações.
            </div>
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
                  <div className="small mono" style={{ marginTop: 2 }}>População: <strong>{activeProfile.count} {activeProfile.count === 1 ? "estação" : "estações"}</strong> ({Math.round((activeProfile.count / 8) * 100)}%)</div>
                </div>

                <div className="small">
                  <strong>Estações neste perfil:</strong>
                  <div className="mono" style={{ color: "var(--cyan)", marginTop: 2, fontSize: 11 }}>
                    {activeProfile.stations}
                  </div>
                </div>

                <p className="small" style={{ margin: "10px 0 0 0", color: "var(--text-3)", fontStyle: "italic", borderTop: "1px dashed var(--border-soft)", paddingTop: 8 }}>
                  Na prática, o gráfico ajuda a visualizar quais estações se comportam de forma parecida e quais apresentam sinais fora do padrão.
                </p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <p className="small" style={{ margin: 0, lineHeight: 1.5, color: "var(--text-2)" }}>
                  Cada ponto representa uma estação hidrometeorológica simulada. O algoritmo K-Means agrupa estações com leituras parecidas, usando atributos como chuva, vazão, nível do rio e score de anomalia.
                </p>
                <p className="small" style={{ margin: 0, lineHeight: 1.5, color: "var(--text-2)" }}>
                  Quando um grupo aparece separado dos outros, significa que ele possui comportamento diferente, como seca, cheia, transição sazonal ou falha de sensor.
                </p>
                <p className="small" style={{ margin: "4px 0 0 0", color: "var(--text-3)", fontStyle: "italic", borderTop: "1px dashed var(--border-soft)", paddingTop: 8 }}>
                  Na prática, o gráfico ajuda a visualizar quais estações se comportam de forma parecida e quais apresentam sinais fora do padrão.
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
                <List size={14} className="ico" style={{ marginRight: 6 }} /> Distribuição das estações por perfil
              </div>
            </div>
            
            <div className="col" style={{ gap: 8 }}>
              {Object.keys(CLUSTER_PROFILES).map(k => {
                const item = CLUSTER_PROFILES[k];
                const pct = Math.round((item.count / 8) * 100);
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
                    <span className="mono small" style={{ color: "var(--text-2)" }}>{pct}% ({item.count} {item.count === 1 ? "estação" : "estações"})</span>
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
