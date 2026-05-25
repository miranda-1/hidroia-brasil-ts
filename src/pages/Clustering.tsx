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
  HelpCircle,
  Network,
  GitBranch,
  Radar,
  Sliders,
  Cpu
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
  const [activeMode, setActiveMode] = useState<"kmeans" | "dbscan" | "hierarchical" | "pca" | "tsne_umap">("kmeans");
  
  // Didactic slider states (conceptual only, does not execute training)
  const [dbscanEps, setDbscanEps] = useState<number>(0.5);
  const [dbscanMinPts, setDbscanMinPts] = useState<number>(4);
  const [tsnePerplexity, setTsnePerplexity] = useState<number>(30);

  // Generate 128 points of synthetic readings for PCA Projection
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
        title="Mapeamento e redução de clusters" 
        subtitle="Mapeamento multidimensional de perfis hidrológicos brasileiros através de K-Means, PCA e modos conceituais avançados."
        rightElement={
          <div className="row" style={{ gap: 10 }}>
            <button className="btn btn-sm" onClick={() => { setSelectedCluster("all"); setSelectedStation(null); setDbscanEps(0.5); setDbscanMinPts(4); setTsnePerplexity(30); }}>
              <RefreshCw size={12} /> Resetar parâmetros
            </button>
            <button className="btn btn-primary btn-sm" onClick={() => go("anomalies")}>
              Ver Anomalias <ArrowRight size={12} />
            </button>
          </div>
        }
      />

      {/* Seletor de Modos Conceituais */}
      <div style={{ 
        display: "flex", 
        gap: 6, 
        padding: "5px 6px", 
        background: "oklch(0.18 0.025 238 / 0.8)", 
        borderRadius: 12, 
        border: "1px solid var(--border-soft)",
        marginBottom: 16,
        overflowX: "auto"
      }}>
        {([
          { id: "kmeans", label: "K-Means (Demonstrado)", color: "var(--cyan)", ico: <Layers size={13} /> },
          { id: "dbscan", label: "DBSCAN (Conceitual)", color: "var(--aqua)", ico: <Radar size={13} /> },
          { id: "hierarchical", label: "Hierárquico (Conceitual)", color: "var(--aqua)", ico: <Network size={13} /> },
          { id: "pca", label: "PCA (Demonstrado)", color: "var(--cyan)", ico: <Cpu size={13} /> },
          { id: "tsne_umap", label: "t-SNE / UMAP (Projeção Futura)", color: "var(--risk-med)", ico: <GitBranch size={13} /> }
        ] as const).map((mode) => (
          <button
            key={mode.id}
            onClick={() => {
              setActiveMode(mode.id);
              setSelectedStation(null);
            }}
            className={`btn btn-sm ${activeMode === mode.id ? "" : "btn-ghost"}`}
            style={{
              flex: "1 0 auto",
              borderRadius: 8,
              border: activeMode === mode.id ? `1px solid ${mode.color}` : "1px solid transparent",
              color: activeMode === mode.id ? mode.color : "var(--text-2)",
              fontSize: 12,
              fontWeight: 500,
              padding: "8px 14px",
              display: "flex",
              alignItems: "center",
              gap: 6
            }}
          >
            {mode.ico}
            {mode.label}
          </button>
        ))}
      </div>

      {/* KPI dynamic grid depending on activeMode */}
      <div className="kpis">
        {activeMode === "kmeans" && [
          { label: "Algoritmo", value: "K-Means", trend: "Agrupamento não supervisionado" },
          { label: "Clusters", value: "4 + ruído", trend: "Perfis hidrológicos simulados" },
          { label: "Silhouette", value: "0.71", trend: "Boa separação entre grupos" },
          { label: "Base analisada", value: "8 estações", trend: "Leituras hidrometeorológicas" },
          { label: "PCA", value: "92%", trend: "Variabilidade explicada" }
        ].map((k, i) => (
          <div key={i} className="kpi">
            <div className="kpi-label">{k.label}</div>
            <div className="kpi-value">{k.value}</div>
            <div className="kpi-trend down" style={{ color: "var(--text-3)", fontSize: 10 }}>● {k.trend}</div>
            <div className="kpi-spark">
              <Spark data={[15, 22, 25, 32, 45, 41, 38]} color="var(--cyan)" />
            </div>
          </div>
        ))}

        {activeMode === "dbscan" && [
          { label: "Algoritmo", value: "DBSCAN", trend: "Por densidade (Conceitual)" },
          { label: "Eps (Vizinhança)", value: String(dbscanEps), trend: "Raio de vizinhança didático" },
          { label: "MinPts (Mínimo)", value: String(dbscanMinPts), trend: "Mínimo de pontos por cluster" },
          { label: "Ruídos", value: "4 pontos", trend: "Pontos isolados na simulação" },
          { label: "Modo", value: "Simulado", trend: "Visualização didática" }
        ].map((k, i) => (
          <div key={i} className="kpi" style={{ padding: "8px 12px", minHeight: "auto", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div className="kpi-label">{k.label}</div>
            <div className="kpi-value" style={{ fontSize: "18px", lineHeight: "1.2" }}>{k.value}</div>
            <div className="kpi-trend down" style={{ color: "var(--text-3)", fontSize: 9, marginTop: 2 }}>● {k.trend}</div>
            <div className="kpi-spark" style={{ height: "16px", marginTop: 4 }}>
              <Spark data={[10, 18, 30, 24, 18, 12, 10]} color="var(--aqua)" />
            </div>
          </div>
        ))}

        {activeMode === "hierarchical" && [
          { label: "Algoritmo", value: "Aglomerativo", trend: "Agrupamento hierárquico conceitual" },
          { label: "Métrica", value: "Euclidiana", trend: "Distância geométrica didática" },
          { label: "Dendrograma", value: "Árvore única", trend: "Relações de similaridade" },
          { label: "Corte conceitual", value: "Didático", trend: "Separa grupos simulados" },
          { label: "Escopo", value: "Simulado", trend: "Cenário-base didático" }
        ].map((k, i) => (
          <div key={i} className="kpi" style={{ padding: "8px 12px", minHeight: "auto", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div className="kpi-label">{k.label}</div>
            <div className="kpi-value" style={{ fontSize: "18px", lineHeight: "1.2" }}>{k.value}</div>
            <div className="kpi-trend down" style={{ color: "var(--text-3)", fontSize: 9, marginTop: 2 }}>● {k.trend}</div>
            <div className="kpi-spark" style={{ height: "16px", marginTop: 4 }}>
              <Spark data={[30, 25, 20, 15, 10, 8, 5]} color="var(--aqua)" />
            </div>
          </div>
        ))}

        {activeMode === "pca" && [
          { label: "Algoritmo", value: "PCA", trend: "Redução de dimensionalidade" },
          { label: "Componentes", value: "2 Principais", trend: "Compactação de variáveis" },
          { label: "Variância Acum.", value: "92.4%", trend: "Retenção da informação" },
          { label: "CP1 Explicada", value: "58.1%", trend: "Maior direção de dispersão" },
          { label: "CP2 Explicada", value: "34.3%", trend: "Segunda maior direção" }
        ].map((k, i) => (
          <div key={i} className="kpi">
            <div className="kpi-label">{k.label}</div>
            <div className="kpi-value">{k.value}</div>
            <div className="kpi-trend down" style={{ color: "var(--text-3)", fontSize: 10 }}>● {k.trend}</div>
            <div className="kpi-spark">
              <Spark data={[45, 42, 38, 30, 25, 15, 8]} color="var(--cyan)" />
            </div>
          </div>
        ))}

        {activeMode === "tsne_umap" && [
          { label: "Algoritmos", value: "t-SNE / UMAP", trend: "Redução não-linear (Futura)" },
          { label: "Perplexidade", value: String(tsnePerplexity), trend: "Ajuste didático de densidade" },
          { label: "Agrupamento", value: "Ilhas", trend: "Separação visual compacta" },
          { label: "Visualização", value: "2D Projetada", trend: "Visualização de manifold" },
          { label: "Status", value: "Arquitetura", trend: "Projeção didática futura" }
        ].map((k, i) => (
          <div key={i} className="kpi">
            <div className="kpi-label">{k.label}</div>
            <div className="kpi-value">{k.value}</div>
            <div className="kpi-trend down" style={{ color: "var(--text-3)", fontSize: 10 }}>● {k.trend}</div>
            <div className="kpi-spark">
              <Spark data={[5, 15, 25, 45, 30, 15, 5]} color="var(--risk-med)" />
            </div>
          </div>
        ))}
      </div>

      {/* Main interactive area */}
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 16, marginTop: 18 }} className="methodology-grid">
        
        {/* Main Card (Chart Area) */}
        <div className="card" style={{ padding: 20 }}>
          
          {/* Mode 1: K-Means (Demonstrado) */}
          {activeMode === "kmeans" && (
            <div>
              <div style={{ marginBottom: 14 }}>
                <div className="card-title" style={{ fontSize: 16, fontWeight: 600, color: "var(--text)" }}>
                  <Layers size={16} className="ico" style={{ marginRight: 8, color: "var(--cyan)" }} /> Mapa de similaridade das estações
                </div>
                <div className="card-eyebrow" style={{ marginTop: 4, textTransform: "none", fontSize: 11, color: "var(--text-3)", letterSpacing: "normal" }}>
                  Projeção PCA dos dados simulados agrupados por K-Means
                </div>
                <p className="small" style={{ margin: "6px 0 0 0", color: "var(--text-2)", lineHeight: 1.4 }}>
                  Cada ponto representa uma estação hidrometeorológica simulada. Pontos próximos possuem comportamento parecido no cenário-base.
                </p>
              </div>

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
                    <line x1="250" x2="250" y1="10" y2="290" stroke="oklch(1 0 0 / 0.08)" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="10" x2="490" y1="150" y2="150" stroke="oklch(1 0 0 / 0.08)" strokeWidth="1" strokeDasharray="3 3" />

                    <circle cx="160" cy="220" r="55" fill="var(--risk-med-bg)" opacity={0.14} stroke="var(--risk-med)" strokeWidth={1} strokeDasharray="3 3" />
                    <circle cx="280" cy="140" r="75" fill="var(--risk-low-bg)" opacity={0.11} stroke="var(--risk-low)" strokeWidth={1} strokeDasharray="3 3" />
                    <circle cx="360" cy="180" r="55" fill="var(--risk-high-bg)" opacity={0.14} stroke="var(--risk-high)" strokeWidth={1} strokeDasharray="3 3" />
                    <circle cx="430" cy="80" r="45" fill="var(--risk-crit-bg)" opacity={0.14} stroke="var(--risk-crit)" strokeWidth={1} strokeDasharray="3 3" />

                    <text x="160" y="223" fill="var(--risk-med)" fontSize="10" fontWeight="600" textAnchor="middle" opacity="0.65" style={{ pointerEvents: "none", letterSpacing: "0.05em", fontFamily: "var(--font-mono)" }}>ESTIAGEM</text>
                    <text x="280" y="143" fill="var(--risk-low)" fontSize="10" fontWeight="600" textAnchor="middle" opacity="0.65" style={{ pointerEvents: "none", letterSpacing: "0.05em", fontFamily: "var(--font-mono)" }}>NORMAL</text>
                    <text x="360" y="183" fill="var(--risk-high)" fontSize="10" fontWeight="600" textAnchor="middle" opacity="0.65" style={{ pointerEvents: "none", letterSpacing: "0.05em", fontFamily: "var(--font-mono)" }}>TRANSIÇÃO</text>
                    <text x="430" y="83" fill="var(--risk-crit)" fontSize="10" fontWeight="600" textAnchor="middle" opacity="0.65" style={{ pointerEvents: "none", letterSpacing: "0.05em", fontFamily: "var(--font-mono)" }}>INUNDAÇÃO</text>
                    <text x="80" y="66" fill="var(--risk-fail)" fontSize="9" fontWeight="600" textAnchor="middle" opacity="0.65" style={{ pointerEvents: "none", letterSpacing: "0.05em", fontFamily: "var(--font-mono)" }}>FALHA/RUÍDO</text>

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

                  <div style={{ position: "absolute", bottom: 10, right: 15, fontFamily: "var(--font-mono)", fontSize: 8.5, color: "var(--text-3)", opacity: 0.8 }}>
                    Eixo X — intensidade hidrológica
                  </div>
                  <div style={{ position: "absolute", top: 15, left: 12, fontFamily: "var(--font-mono)", fontSize: 8.5, color: "var(--text-3)", opacity: 0.8, transform: "rotate(90deg)", transformOrigin: "left top" }}>
                    Eixo Y — variação do comportamento
                  </div>

                  {/* Tooltip */}
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
                      [-1]: "Inconsistência/Falha"
                    };
                    const type = p.type || "Fluviométrica";

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
                        <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text)" }}>{p.name} — {p.state}</div>
                        <div className="small mono" style={{ color: "var(--text-3)", fontSize: 9, marginTop: 1 }}>
                          Bacia: {p.basin} • Tipo: {type}
                        </div>
                        <div className="small" style={{ marginTop: 3, fontWeight: 600, color, fontSize: 10 }}>
                          Perfil: {clusterNames[p.cluster] || "Desconhecido"}
                        </div>
                        <div style={{ margin: "5px 0", borderTop: "1px dashed var(--border-soft)" }} />
                        <div style={{ display: "flex", flexDirection: "column", gap: 2, fontSize: 9.5 }}>
                          {type === "Fluviométrica" ? (
                            <>
                              <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span style={{ color: "var(--text-3)" }}>Nível:</span>
                                <span className="mono" style={{ color: "var(--cyan)" }}>{p.levelCm} cm</span>
                              </div>
                              <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span style={{ color: "var(--text-3)" }}>Vazão:</span>
                                <span className="mono" style={{ color: "var(--cyan)" }}>{p.flowM3s?.toLocaleString()} m³/s</span>
                              </div>
                            </>
                          ) : null}
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ color: "var(--text-3)" }}>Chuva 7d:</span>
                            <span className="mono" style={{ color: "var(--aqua)" }}>{p.rainfall7dMm} mm</span>
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ color: "var(--text-3)" }}>Score IA (Anomalia):</span>
                            <span className="mono" style={{ fontWeight: 600, color: p.score > 0.6 ? "var(--risk-crit)" : "var(--text)" }}>{p.score.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Legend filters */}
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
          )}

          {/* Mode 2: DBSCAN (Conceitual) */}
          {activeMode === "dbscan" && (
            <div>
              <div style={{ marginBottom: 14 }}>
                <div className="card-title" style={{ fontSize: 16, fontWeight: 600, color: "var(--text)" }}>
                  <Radar size={16} className="ico" style={{ marginRight: 8, color: "var(--aqua)" }} /> Agrupamento por densidade (DBSCAN)
                </div>
                <div className="card-eyebrow" style={{ marginTop: 4, textTransform: "none", fontSize: 11, color: "var(--text-3)", letterSpacing: "normal" }}>
                  Visualização de agrupamento por densidade com sinalização de pontos isolados.
                </div>
                <p className="small" style={{ margin: "6px 0 12px 0", color: "var(--text-2)", lineHeight: 1.4 }}>
                  Diferente do K-Means, o DBSCAN não exige definir o número de grupos antecipadamente e separa pontos de ruído em cenários simulados.
                </p>
              </div>

              {/* Sliders Didáticos */}
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "1fr 1fr", 
                gap: 12, 
                padding: 12, 
                background: "oklch(1 0 0 / 0.015)", 
                border: "1px dashed var(--border-soft)", 
                borderRadius: 8,
                marginBottom: 14
              }}>
                <div>
                  <div className="row" style={{ justifyContent: "space-between", marginBottom: 4 }}>
                    <span className="small text-2" style={{ fontWeight: 500 }}>Eps (Raio de Vizinhança)</span>
                    <span className="mono small" style={{ color: "var(--aqua)", fontWeight: 600 }}>{dbscanEps}</span>
                  </div>
                  <input 
                    type="range" 
                    min="0.2" 
                    max="1.2" 
                    step="0.1" 
                    value={dbscanEps} 
                    onChange={(e) => setDbscanEps(parseFloat(e.target.value))}
                    style={{ width: "100%", accentColor: "var(--aqua)" }}
                  />
                </div>
                <div>
                  <div className="row" style={{ justifyContent: "space-between", marginBottom: 4 }}>
                    <span className="small text-2" style={{ fontWeight: 500 }}>MinPts (Mínimo de Pontos)</span>
                    <span className="mono small" style={{ color: "var(--aqua)", fontWeight: 600 }}>{dbscanMinPts}</span>
                  </div>
                  <input 
                    type="range" 
                    min="2" 
                    max="8" 
                    step="1" 
                    value={dbscanMinPts} 
                    onChange={(e) => setDbscanMinPts(parseInt(e.target.value))}
                    style={{ width: "100%", accentColor: "var(--aqua)" }}
                  />
                </div>
                <div style={{ gridColumn: "span 2", fontSize: 9.5, color: "var(--text-3)", fontStyle: "italic", marginTop: 4 }}>
                  Controles didáticos: alteram apenas a visualização simulada, sem execução real do modelo.
                </div>
              </div>

              <div style={{ 
                position: "relative", 
                background: "oklch(0.12 0.015 240)", 
                borderRadius: 10, 
                padding: "14px 14px 10px 14px", 
                border: "1px solid var(--border-soft)"
              }}>
                <svg viewBox="0 0 500 300" width="100%" height="320" style={{ display: "block" }}>
                  <line x1="250" x2="250" y1="10" y2="290" stroke="oklch(1 0 0 / 0.05)" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="10" x2="490" y1="150" y2="150" stroke="oklch(1 0 0 / 0.05)" strokeWidth="1" strokeDasharray="3 3" />

                  {/* Círculos conceituais de vizinhança Eps nas estações principais */}
                  <circle cx="280" cy="140" r={dbscanEps * 120} fill="var(--risk-low-bg)" opacity={0.08} stroke="var(--risk-low)" strokeWidth={1} strokeDasharray="2 2" />
                  <circle cx="160" cy="220" r={dbscanEps * 100} fill="var(--risk-med-bg)" opacity={0.08} stroke="var(--risk-med)" strokeWidth={1} strokeDasharray="2 2" />
                  <circle cx="430" cy="80" r={dbscanEps * 80} fill="var(--risk-crit-bg)" opacity={0.08} stroke="var(--risk-crit)" strokeWidth={1} strokeDasharray="2 2" />

                  {/* Points (colored by DBSCAN logic) */}
                  {pcaPoints.map((p) => {
                    let color = "var(--text-3)";
                    let isOutlier = p.cluster === -1;
                    
                    if (dbscanEps < 0.4) {
                      if (p.id.startsWith("EST") && Math.sin(p.x) > 0.3) isOutlier = true;
                    }
                    if (dbscanMinPts > 5 && p.cluster === 3) {
                      isOutlier = true;
                    }

                    if (isOutlier) {
                      color = "var(--risk-fail)"; // Noise point (DBSCAN Outlier)
                    } else if (p.cluster === 0) {
                      color = "var(--risk-med)";
                    } else if (p.cluster === 1 || p.cluster === 2) {
                      color = "var(--risk-low)";
                    } else if (p.cluster === 3) {
                      color = "var(--risk-crit)";
                    }

                    return (
                      <g key={p.id}>
                        {isOutlier && (
                          <line x1={p.x - 3} y1={p.y - 3} x2={p.x + 3} y2={p.y + 3} stroke="var(--risk-fail)" strokeWidth="1" />
                        )}
                        <circle 
                          cx={p.x} 
                          cy={p.y} 
                          r={isOutlier ? 3.5 : 4.5} 
                          fill={color} 
                          stroke="oklch(0 0 0 / 0.3)" 
                          strokeWidth={1} 
                          opacity={isOutlier ? 0.9 : 0.75}
                        />
                      </g>
                    );
                  })}
                </svg>

                {/* Explicador conceitual de sliders */}
                <div style={{
                  marginTop: 8,
                  padding: "8px 12px",
                  borderRadius: 6,
                  background: "oklch(0.74 0.18 52 / 0.04)",
                  border: "1px solid oklch(0.74 0.18 52 / 0.10)"
                }}>
                  <p className="small" style={{ margin: 0, fontSize: 11, color: "var(--muted)", fontStyle: "italic", lineHeight: 1.4 }}>
                    {dbscanEps < 0.4 ? (
                      <span>⚠️ <strong>Eps Baixo ({dbscanEps}):</strong> O raio é pequeno demais. Pontos esparsos são reclassificados como <strong>ruído</strong> por falta de vizinhança.</span>
                    ) : dbscanMinPts > 5 ? (
                      <span>⚠️ <strong>MinPts Alto ({dbscanMinPts}):</strong> Exigência de densidade muito alta. Agrupamentos menores são marcados como <strong>ruído</strong>.</span>
                    ) : (
                      <span>💡 <strong>Configuração didática equilibrada:</strong> DBSCAN identifica 3 grandes agrupamentos densos e sinaliza automaticamente estações isoladas (ruído/anomalia).</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Mode 3: Hierárquico (Conceitual) */}
          {activeMode === "hierarchical" && (
            <div>
              <div style={{ marginBottom: 14 }}>
                <div className="card-title" style={{ fontSize: 16, fontWeight: 600, color: "var(--text)" }}>
                  <Network size={16} className="ico" style={{ marginRight: 8, color: "var(--aqua)" }} /> Agrupamento Hierárquico (Dendrograma)
                </div>
                <div className="card-eyebrow" style={{ marginTop: 4, textTransform: "none", fontSize: 11, color: "var(--text-3)", letterSpacing: "normal" }}>
                  Visualização em árvore para comparar a proximidade entre perfis hidrológicos simulados.
                </div>
                <p className="small" style={{ margin: "6px 0 16px 0", color: "var(--text-2)", lineHeight: 1.4 }}>
                  A estrutura mostra quais perfis se aproximam primeiro e como grupos maiores surgem a partir dessas conexões.
                </p>
              </div>

              {/* Dendrograma em SVG */}
              <div style={{ 
                background: "linear-gradient(135deg, oklch(0.13 0.015 240) 0%, oklch(0.15 0.025 210) 100%)", 
                borderRadius: 12, 
                padding: "24px 24px 16px 24px", 
                border: "1px solid var(--cyan-soft)",
                boxShadow: "0 8px 32px 0 rgba(0, 240, 255, 0.03)",
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch"
              }}>
                <svg viewBox="0 0 450 240" width="100%" height="280" style={{ display: "block" }}>
                  {/* Linha de corte conceitual */}
                  <line x1="350" x2="350" y1="10" y2="220" stroke="var(--cyan)" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.65" />
                  <text x="345" y="20" fill="var(--cyan)" fontSize="7.5" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="end" opacity="0.8">CORTE CONCEITUAL</text>

                  {/* Ramos do Dendrograma */}
                  
                  {/* Grupo 1: Normalidade (Verde) */}
                  {/* Humaitá (Y=133) + Parnaíba (Y=160) -> conecta em X=200 */}
                  <path d="M 150 133 H 200 V 160 H 150" fill="none" stroke="var(--risk-low)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  
                  {/* Grupo 2: Estiagem (Amarelo) */}
                  {/* São Francisco (Y=52) + Alto Paraguai (Y=79) -> conecta em X=210 */}
                  <path d="M 150 52 H 210 V 79 H 150" fill="none" stroke="var(--risk-med)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  
                  {/* Grupo 3: Inundação (Vermelho) */}
                  {/* Taquari (Y=187) + Recife (Y=214) -> conecta em X=200 */}
                  <path d="M 150 187 H 200 V 214 H 150" fill="none" stroke="var(--risk-crit)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  
                  {/* Conexão 4: Rio Doce (Ciano) + Normalidade -> conecta em X=260 */}
                  {/* Rio Doce (Y=106) H 260 */}
                  <path d="M 150 106 H 260" fill="none" stroke="var(--cyan)" strokeWidth="2" strokeLinecap="round" />
                  {/* Grupo Normalidade (Y_center=146.5) X=200 H 260 */}
                  <path d="M 200 146.5 H 260" fill="none" stroke="var(--risk-low)" strokeWidth="2" strokeLinecap="round" />
                  {/* Conexão vertical em X=260 de Y=106 a Y=146.5 */}
                  <line x1="260" y1="106" x2="260" y2="146.5" stroke="var(--cyan)" strokeWidth="2" strokeLinecap="round" />

                  {/* Conexão 5: Estiagem (Y_center=65.5, X=210) + Sazonal/Normal/Doce (Y_center=126.25, X=260) -> conecta em X=320 */}
                  <path d="M 210 65.5 H 320" fill="none" stroke="var(--risk-med)" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M 260 126.25 H 320" fill="none" stroke="var(--cyan)" strokeWidth="1.8" strokeLinecap="round" />
                  <line x1="320" y1="65.5" x2="320" y2="126.25" stroke="var(--cyan)" strokeWidth="1.8" strokeLinecap="round" />

                  {/* Conexão 6: Inundação (Y_center=200.5, X=200) + Estiagem/Normal/Sazonal (Y_center=95.875, X=320) -> conecta em X=370 */}
                  <path d="M 200 200.5 H 370" fill="none" stroke="var(--risk-crit)" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M 320 95.875 H 370" fill="none" stroke="var(--cyan)" strokeWidth="1.8" strokeLinecap="round" />
                  <line x1="370" y1="95.875" x2="370" y2="200.5" stroke="var(--cyan)" strokeWidth="1.8" strokeLinecap="round" />

                  {/* Conexão 7: Porto Velho (Y=25) + Resto do dendrograma (Y_center=148.18, X=370) -> conecta em X=410 */}
                  <path d="M 150 25 H 410" fill="none" stroke="var(--risk-fail)" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M 370 148.18 H 410" fill="none" stroke="var(--cyan)" strokeWidth="1.8" strokeLinecap="round" />
                  <line x1="410" y1="25" x2="410" y2="148.18" stroke="var(--risk-fail)" strokeWidth="1.8" strokeLinecap="round" />

                  {/* Textos à esquerda (Estações) */}
                  <text x="142" y="28" fill="var(--risk-fail)" fontSize="8.5" fontWeight="600" textAnchor="end" fontFamily="var(--font-mono)">Porto Velho · Falha</text>
                  <text x="142" y="55" fill="var(--risk-med)" fontSize="8.5" fontWeight="600" textAnchor="end" fontFamily="var(--font-mono)">São Francisco · Estiagem</text>
                  <text x="142" y="82" fill="var(--risk-med)" fontSize="8.5" fontWeight="600" textAnchor="end" fontFamily="var(--font-mono)">Alto Paraguai · Estiagem</text>
                  <text x="142" y="109" fill="var(--cyan)" fontSize="8.5" fontWeight="600" textAnchor="end" fontFamily="var(--font-mono)">Rio Doce · Transição</text>
                  <text x="142" y="136" fill="var(--risk-low)" fontSize="8.5" fontWeight="600" textAnchor="end" fontFamily="var(--font-mono)">Humaitá · Normalidade</text>
                  <text x="142" y="163" fill="var(--risk-low)" fontSize="8.5" fontWeight="600" textAnchor="end" fontFamily="var(--font-mono)">Parnaíba · Normalidade</text>
                  <text x="142" y="190" fill="var(--risk-crit)" fontSize="8.5" fontWeight="600" textAnchor="end" fontFamily="var(--font-mono)">Taquari · Inundação</text>
                  <text x="142" y="217" fill="var(--risk-crit)" fontSize="8.5" fontWeight="600" textAnchor="end" fontFamily="var(--font-mono)">Recife · Inundação</text>

                  {/* Escala de Similaridade */}
                  <line x1="150" y1="232" x2="410" y2="232" stroke="oklch(1 0 0 / 0.15)" strokeWidth="1" />
                  <polygon points="150,232 154,229 154,235" fill="oklch(1 0 0 / 0.15)" />
                  <polygon points="410,232 406,229 406,235" fill="oklch(1 0 0 / 0.15)" />
                  <text x="150" y="240" fill="var(--text-3)" fontSize="7.5" fontFamily="var(--font-mono)">Maior Similaridade</text>
                  <text x="410" y="240" fill="var(--text-3)" fontSize="7.5" fontFamily="var(--font-mono)" textAnchor="end">Menor Similaridade</text>
                </svg>
                
                {/* Legenda do Dendrograma */}
                <div style={{
                  marginTop: 14,
                  fontSize: 10,
                  color: "var(--text-2)",
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  gap: 12,
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.02em"
                }}>
                  <span><span style={{ color: "var(--risk-low)", marginRight: 5 }}>●</span>Verde: normalidade</span>
                  <span><span style={{ color: "var(--risk-med)", marginRight: 5 }}>●</span>Amarelo: estiagem</span>
                  <span><span style={{ color: "var(--risk-crit)", marginRight: 5 }}>●</span>Vermelho: inundação</span>
                  <span><span style={{ color: "var(--cyan)", marginRight: 5 }}>●</span>Ciano: transição</span>
                  <span><span style={{ color: "var(--risk-fail)", marginRight: 5 }}>●</span>Cinza: falha/ruído</span>
                </div>
              </div>
            </div>
          )}

          {/* Mode 4: PCA (Demonstrado) */}
          {activeMode === "pca" && (
            <div>
              <div style={{ marginBottom: 14 }}>
                <div className="card-title" style={{ fontSize: 16, fontWeight: 600, color: "var(--text)" }}>
                  <Cpu size={16} className="ico" style={{ marginRight: 8, color: "var(--cyan)" }} /> Análise de Componentes Principais (PCA)
                </div>
                <div className="card-eyebrow" style={{ marginTop: 4, textTransform: "none", fontSize: 11, color: "var(--text-3)", letterSpacing: "normal" }}>
                  Redução bidimensional linear de dados multidimensionais simulados
                </div>
                <p className="small" style={{ margin: "6px 0 16px 0", color: "var(--text-2)", lineHeight: 1.4 }}>
                  O PCA simplifica a complexidade estrutural combinando múltiplos sensores (chuva, vazão, nível e score de anomalia) em dois eixos ortogonais principais (CP1 e CP2), cobrindo ~92.4% da variabilidade original.
                </p>
              </div>

              {/* Variância Explicada */}
              <div style={{ 
                padding: 16, 
                background: "oklch(0.12 0.015 240)", 
                border: "1px solid var(--border-soft)", 
                borderRadius: 10,
                marginBottom: 16
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span className="mono small" style={{ fontSize: 10.5, fontWeight: 600 }}>Variância Explicada Acumulada</span>
                  <span className="mono small" style={{ color: "var(--cyan)", fontWeight: 600 }}>92.4%</span>
                </div>
                <div style={{ height: 16, display: "flex", borderRadius: 4, overflow: "hidden", background: "oklch(1 0 0 / 0.03)", border: "1px solid var(--border-soft)" }}>
                  <div style={{ width: "58.1%", background: "var(--cyan)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 9, fontWeight: 600, color: "var(--bg-deep)" }}>CP1: 58%</span>
                  </div>
                  <div style={{ width: "34.3%", background: "var(--aqua)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 9, fontWeight: 600, color: "var(--bg-deep)" }}>CP2: 34%</span>
                  </div>
                </div>
              </div>

              {/* Tabela de Pesos */}
              <div style={{ overflowX: "auto" }}>
                <table className="table" style={{ fontSize: 12 }}>
                  <thead>
                    <tr>
                      <th>Variável do Sensor</th>
                      <th style={{ textAlign: "right" }}>Peso CP1 (Intensidade)</th>
                      <th style={{ textAlign: "right" }}>Peso CP2 (Variação)</th>
                      <th>Direção do Efeito</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { v: "Chuva Acumulada 24h", cp1: "+0.82", cp2: "-0.15", eff: "Contribui para extremos de cheia" },
                      { v: "Chuva Acumulada 7d", cp1: "+0.88", cp2: "-0.10", eff: "Forte impacto no volume total" },
                      { v: "Nível Sazonal do Rio", cp1: "+0.79", cp2: "+0.42", eff: "Altera comportamento de transição" },
                      { v: "Vazão Histórica", cp1: "+0.76", cp2: "+0.48", eff: "Indica magnitude do fluxo" },
                      { v: "Score Conceitual IA", cp1: "+0.91", cp2: "-0.12", eff: "Separa anomalias e extremos" }
                    ].map((row, idx) => (
                      <tr key={idx}>
                        <td style={{ fontWeight: 500 }}>{row.v}</td>
                        <td className="num mono" style={{ textAlign: "right", color: "var(--cyan)", fontWeight: 600 }}>{row.cp1}</td>
                        <td className="num mono" style={{ textAlign: "right", color: "var(--aqua)", fontWeight: 600 }}>{row.cp2}</td>
                        <td className="small" style={{ color: "var(--text-3)" }}>{row.eff}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Mode 5: t-SNE / UMAP (Projeção Futura) */}
          {activeMode === "tsne_umap" && (
            <div>
              <div style={{ marginBottom: 14 }}>
                <div className="card-title" style={{ fontSize: 16, fontWeight: 600, color: "var(--text)" }}>
                  <GitBranch size={16} className="ico" style={{ marginRight: 8, color: "var(--risk-med)" }} /> Projeções Não Lineares (t-SNE / UMAP)
                </div>
                <div className="card-eyebrow" style={{ marginTop: 4, textTransform: "none", fontSize: 11, color: "var(--text-3)", letterSpacing: "normal" }}>
                  Mapeamento de alta dimensão em estruturas de ilhas de similaridade (Arquitetura Futura)
                </div>
                <p className="small" style={{ margin: "6px 0 12px 0", color: "var(--text-2)", lineHeight: 1.4 }}>
                  Técnicas avançadas de redução não linear como t-SNE e UMAP são excelentes para mapear manifolds complexos, separando clusters hidrológicos em "ilhas" super compactas e visualmente limpas.
                </p>
              </div>

              {/* Slider Didático */}
              <div style={{ 
                padding: 12, 
                background: "oklch(1 0 0 / 0.015)", 
                border: "1px dashed var(--border-soft)", 
                borderRadius: 8,
                marginBottom: 14
              }}>
                <div className="row" style={{ justifyContent: "space-between", marginBottom: 4 }}>
                  <span className="small text-2" style={{ fontWeight: 500 }}>Perplexidade do t-SNE (Didático)</span>
                  <span className="mono small" style={{ color: "var(--risk-med)", fontWeight: 600 }}>{tsnePerplexity}</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="50" 
                  step="5" 
                  value={tsnePerplexity} 
                  onChange={(e) => setTsnePerplexity(parseInt(e.target.value))}
                  style={{ width: "100%", accentColor: "var(--risk-med)" }}
                />
                <div style={{ fontSize: 9.5, color: "var(--text-3)", fontStyle: "italic", marginTop: 6 }}>
                  Controles didáticos: alteram apenas a visualização simulada, sem execução real do modelo.
                </div>
              </div>

              <div style={{ 
                position: "relative", 
                background: "oklch(0.12 0.015 240)", 
                borderRadius: 10, 
                padding: "14px 14px 10px 14px", 
                border: "1px solid var(--border-soft)"
              }}>
                <svg viewBox="0 0 500 300" width="100%" height="320" style={{ display: "block" }}>
                  <circle cx="130" cy="210" r="30" fill="var(--risk-med-bg)" opacity={0.15} stroke="var(--risk-med)" strokeWidth={1} strokeDasharray="2 2" />
                  <text x="130" y="213" fill="var(--risk-med)" fontSize="8.5" fontWeight="600" textAnchor="middle" opacity="0.65" style={{ fontFamily: "var(--font-mono)" }}>ESTIAGEM</text>

                  <circle cx="280" cy="110" r="35" fill="var(--risk-low-bg)" opacity={0.12} stroke="var(--risk-low)" strokeWidth={1} strokeDasharray="2 2" />
                  <text x="280" y="113" fill="var(--risk-low)" fontSize="8.5" fontWeight="600" textAnchor="middle" opacity="0.65" style={{ fontFamily: "var(--font-mono)" }}>NORMAL</text>

                  <circle cx="360" cy="210" r="30" fill="var(--risk-high-bg)" opacity={0.15} stroke="var(--risk-high)" strokeWidth={1} strokeDasharray="2 2" />
                  <text x="360" y="213" fill="var(--risk-high)" fontSize="8.5" fontWeight="600" textAnchor="middle" opacity="0.65" style={{ fontFamily: "var(--font-mono)" }}>TRANSIÇÃO</text>

                  <circle cx="410" cy="80" r="28" fill="var(--risk-crit-bg)" opacity={0.15} stroke="var(--risk-crit)" strokeWidth={1} strokeDasharray="2 2" />
                  <text x="410" y="83" fill="var(--risk-crit)" fontSize="8.5" fontWeight="600" textAnchor="middle" opacity="0.65" style={{ fontFamily: "var(--font-mono)" }}>CHEIAS</text>

                  <circle cx="100" cy="70" r="22" fill="var(--risk-fail-bg)" opacity={0.15} stroke="var(--risk-fail)" strokeWidth={1} strokeDasharray="2 2" />
                  <text x="100" y="73" fill="var(--risk-fail)" fontSize="8.5" fontWeight="600" textAnchor="middle" opacity="0.65" style={{ fontFamily: "var(--font-mono)" }}>RUÍDO</text>

                  {pcaPoints.map((p) => {
                    let cx = 250, cy = 150;
                    const rSeed = p.id.startsWith("EST") ? parseInt(p.id.split("-")[1]) || 5 : 10;
                    const randX = (Math.sin(rSeed) - 0.5) * (tsnePerplexity / 3);
                    const randY = (Math.cos(rSeed) - 0.5) * (tsnePerplexity / 3);

                    if (p.cluster === 0) { cx = 130; cy = 210; }
                    else if (p.cluster === 1) { cx = 280; cy = 110; }
                    else if (p.cluster === 2) { cx = 360; cy = 210; }
                    else if (p.cluster === 3) { cx = 410; cy = 80; }
                    else if (p.cluster === -1) { cx = 100; cy = 70; }

                    const colors: Record<number, string> = {
                      0: "var(--risk-med)",
                      1: "var(--risk-low)",
                      2: "var(--risk-high)",
                      3: "var(--risk-crit)",
                      [-1]: "var(--risk-fail)"
                    };

                    return (
                      <circle 
                        key={p.id}
                        cx={cx + randX * 10} 
                        cy={cy + randY * 10} 
                        r={p.id.startsWith("EST") ? 3.5 : 4} 
                        fill={colors[p.cluster]} 
                        stroke="oklch(0 0 0 / 0.2)" 
                        strokeWidth={0.8}
                        opacity={0.8}
                      />
                    );
                  })}
                </svg>

                <div style={{
                  marginTop: 8,
                  padding: "8px 12px",
                  borderRadius: 6,
                  background: "oklch(0.74 0.18 52 / 0.04)",
                  border: "1px solid oklch(0.74 0.18 52 / 0.10)"
                }}>
                  <p className="small" style={{ margin: 0, fontSize: 10.5, color: "var(--muted)", fontStyle: "italic", lineHeight: 1.45 }}>
                    Esta visualização representa uma projeção didática de como t-SNE ou UMAP separariam as estações em ilhas de similaridade em uma arquitetura futura.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Footer warning */}
          <div style={{ 
            marginTop: 14, 
            padding: "10px 14px", 
            borderRadius: 8, 
            background: "oklch(1 0 0 / 0.01)", 
            border: "1px dashed var(--border-soft)",
            fontSize: 11,
            color: "var(--text-3)",
            lineHeight: 1.4
          }}>
            <strong>Aviso de escopo:</strong> visualização simulada para fins didáticos. Os pontos e agrupamentos não representam medições oficiais ou execução operacional de modelo.
          </div>
        </div>

        {/* Dynamic Sidebar */}
        <div className="col" style={{ gap: 16 }}>
          
          {activeMode === "kmeans" && (
            <>
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
                    <List size={14} className="ico" style={{ marginRight: 6 }} /> Distribuição por perfil
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
                        <span className="mono small" style={{ color: "var(--text-2)" }}>{pct}% ({item.count})</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {activeMode === "dbscan" && (
            <>
              <div className="card">
                <div className="card-head" style={{ marginBottom: 12 }}>
                  <div className="card-title" style={{ color: "var(--aqua)" }}>
                    <Sliders size={14} className="ico" style={{ marginRight: 6 }} /> Vantagens do DBSCAN
                  </div>
                </div>
                
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }} className="small">
                  <div style={{ padding: 10, borderRadius: 8, background: "oklch(1 0 0 / 0.02)", border: "1px solid var(--border-soft)" }}>
                    <strong style={{ color: "var(--text)", display: "block", marginBottom: 2 }}>1. Sem número de clusters fixo</strong>
                    <span style={{ color: "var(--text-2)" }}>Ao contrário do K-Means, o DBSCAN localiza e desenha os clusters organicamente de acordo com a densidade local configurada.</span>
                  </div>
                  
                  <div style={{ padding: 10, borderRadius: 8, background: "oklch(1 0 0 / 0.02)", border: "1px solid var(--border-soft)" }}>
                    <strong style={{ color: "var(--text)", display: "block", marginBottom: 2 }}>2. Detecção automática de ruído</strong>
                    <span style={{ color: "var(--text-2)" }}>Identifica leituras que não pertencem a nenhuma densidade concentrada, separando falhas de sensores simulados de eventos críticos consistentes.</span>
                  </div>

                  <div style={{ padding: 10, borderRadius: 8, background: "oklch(1 0 0 / 0.02)", border: "1px solid var(--border-soft)" }}>
                    <strong style={{ color: "var(--text)", display: "block", marginBottom: 2 }}>3. Formas arbitrárias</strong>
                    <span style={{ color: "var(--text-2)" }}>Consegue mapear concentrações em formatos não esféricos ou lineares, comuns na transição de cheias.</span>
                  </div>
                </div>
              </div>

              <div className="card" style={{ marginTop: 16 }}>
                <div className="card-head" style={{ marginBottom: 12 }}>
                  <div className="card-title" style={{ color: "var(--aqua)" }}>
                    <Brain size={14} className="ico" style={{ marginRight: 6 }} /> Como ler o gráfico
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }} className="small">
                  <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <span style={{ color: "var(--aqua)", fontWeight: 600 }}>•</span>
                    <span style={{ color: "var(--text-2)" }}>Pontos próximos indicam comportamento semelhante.</span>
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <span style={{ color: "var(--aqua)", fontWeight: 600 }}>•</span>
                    <span style={{ color: "var(--text-2)" }}>Áreas circulares representam densidade conceitual.</span>
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <span style={{ color: "var(--aqua)", fontWeight: 600 }}>•</span>
                    <span style={{ color: "var(--text-2)" }}>Pontos isolados indicam ruído simulado.</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeMode === "hierarchical" && (
            <>
              <div className="card">
                <div className="card-head" style={{ marginBottom: 12 }}>
                  <div className="card-title" style={{ color: "var(--aqua)" }}>
                    <Sliders size={14} className="ico" style={{ marginRight: 6 }} /> O que é o Dendrograma?
                  </div>
                </div>
                
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }} className="small">
                  <p style={{ margin: 0, lineHeight: 1.5, color: "var(--text-2)" }}>
                    O dendrograma representa graficamente o agrupamento hierárquico de tipo aglomerativo (*bottom-up*).
                  </p>
                  <p style={{ margin: 0, lineHeight: 1.5, color: "var(--text-2)" }}>
                    Cada junção de ramos em forma de "U" representa o momento em que duas sub-bacias ou períodos de telemetria simulados são considerados semelhantes.
                  </p>
                  <p style={{ margin: 0, lineHeight: 1.5, color: "var(--text-2)" }}>
                    <strong>Linha de corte didática:</strong> Ao passar uma linha horizontal imaginária, definimos o número de grupos que desejamos extrair do dendrograma.
                  </p>
                </div>
              </div>

              <div className="card" style={{ marginTop: 16 }}>
                <div className="card-head" style={{ marginBottom: 12 }}>
                  <div className="card-title" style={{ color: "var(--aqua)" }}>
                    <Brain size={14} className="ico" style={{ marginRight: 6 }} /> Como interpretar
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }} className="small">
                  <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <span style={{ color: "var(--aqua)", fontWeight: 600 }}>•</span>
                    <span style={{ color: "var(--text-2)" }}>Ramos curtos indicam maior semelhança.</span>
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <span style={{ color: "var(--aqua)", fontWeight: 600 }}>•</span>
                    <span style={{ color: "var(--text-2)" }}>Junções mais à direita indicam menor similaridade.</span>
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <span style={{ color: "var(--aqua)", fontWeight: 600 }}>•</span>
                    <span style={{ color: "var(--text-2)" }}>A linha de corte separa grupos conceituais.</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeMode === "pca" && (
            <div className="card">
              <div className="card-head" style={{ marginBottom: 12 }}>
                <div className="card-title">
                  <Sliders size={14} className="ico" style={{ marginRight: 6 }} /> Eixos do PCA
                </div>
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }} className="small">
                <div style={{ padding: 10, borderRadius: 8, background: "oklch(1 0 0 / 0.02)", border: "1px solid var(--border-soft)" }}>
                  <strong style={{ color: "var(--cyan)", display: "block", marginBottom: 2 }}>Componente Principal 1 (CP1)</strong>
                  <span style={{ color: "var(--text-2)" }}>Representa a **magnitude e intensidade hidrológica** (chuva acumulada recente, vazão total e nível atual). Explica 58% dos dados simulados.</span>
                </div>
                
                <div style={{ padding: 10, borderRadius: 8, background: "oklch(1 0 0 / 0.02)", border: "1px solid var(--border-soft)" }}>
                  <strong style={{ color: "var(--aqua)", display: "block", marginBottom: 2 }}>Componente Principal 2 (CP2)</strong>
                  <span style={{ color: "var(--text-2)" }}>Representa o **desvio sazonal ou estabilidade** (se a leitura é de transição rápida ou comportamento estável). Explica 34% da informação.</span>
                </div>
              </div>
            </div>
          )}

          {activeMode === "tsne_umap" && (
            <div className="card">
              <div className="card-head" style={{ marginBottom: 12 }}>
                <div className="card-title" style={{ color: "var(--risk-med)" }}>
                  <Sliders size={14} className="ico" style={{ marginRight: 6 }} /> t-SNE vs UMAP
                </div>
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }} className="small">
                <p style={{ margin: 0, lineHeight: 1.5, color: "var(--text-2)" }}>
                  Enquanto o PCA é uma redução linear simples, o t-SNE e o UMAP usam abordagens probabilísticas não lineares.
                </p>
                <p style={{ margin: 0, lineHeight: 1.5, color: "var(--text-2)" }}>
                  <strong>t-SNE:</strong> Foca em manter pontos muito parecidos juntos, ideal para isolar sub-perfis específicos em séries históricas.
                </p>
                <p style={{ margin: 0, lineHeight: 1.5, color: "var(--text-2)" }}>
                  <strong>UMAP:</strong> Além de agrupar vizinhos, tenta preservar a estrutura global, mostrando a real distância entre secas severas e cheias críticas.
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
