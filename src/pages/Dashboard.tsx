import React, { useState } from "react";
import { PageHeader } from "../components/ui/PageHeader";
import { MetricCard } from "../components/ui/MetricCard";
import { SectionCard } from "../components/ui/SectionCard";
import { StatusBadge } from "../components/ui/StatusBadge";
import { BrazilSensorMap, RiskLegendInline } from "../components/map/BrazilSensorMap";
import { STATIONS, REGIONS, SUB_STATIONS } from "../data/stations";
import { KPIS, ANOMALY_STATS } from "../data/dashboardData";
import { Brain, MapPin, SlidersHorizontal, AlertTriangle, ArrowRight, Layers } from "lucide-react";


interface DashboardProps {
  go: (k: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ go }) => {
  const [selectedId, setSelectedId] = useState<string>("TAQ-01");
  const [regionFilter, setRegionFilter] = useState<string>("Todas as regiões");
  const [riskFilter, setRiskFilter] = useState<string>("all");

  const activeStation = STATIONS.find(s => s.id === selectedId) || STATIONS[0];
  const activeStat = ANOMALY_STATS[activeStation.id] || {
    score: 0.15,
    cluster: "Cluster 1 (Comportamento Normal)",
    factor: "Parâmetros normais de telemetria hídrica."
  };

  // Filter stations based on selection
  const filteredStations = STATIONS.filter(s => {
    const regionMatches = regionFilter === "Todas as regiões" || s.region === regionFilter;
    const riskMatches = riskFilter === "all" || s.risk === riskFilter;
    return regionMatches && riskMatches;
  });

  const subStationsList = SUB_STATIONS[activeStation.region] || [];

  const factors = [
    { lbl: "Gradiente temporal (Δ 24h)", w: activeStation.risk === "crit" ? 0.94 : activeStation.risk === "fail" ? 0.98 : activeStation.risk === "high" ? 0.82 : activeStation.risk === "med" ? 0.65 : 0.25 },
    { lbl: "Desvio do acumulado de chuva (7d)", w: activeStation.risk === "crit" ? 0.89 : activeStation.risk === "fail" ? 0.92 : activeStation.risk === "high" ? 0.78 : activeStation.risk === "med" ? 0.55 : 0.22 },
    { lbl: "Distância espacial no espaço PCA", w: activeStation.risk === "crit" ? 0.85 : activeStation.risk === "fail" ? 0.88 : activeStation.risk === "high" ? 0.74 : activeStation.risk === "med" ? 0.48 : 0.18 }
  ];

  return (
    <div className="page">
      <PageHeader 
        category="PLATAFORMA" 
        title="Dashboard Nacional de Monitoramento" 
        subtitle="Identificação de perfis hidrológicos, telemetria de sensores públicos e detecção de anomalias por Inteligência Artificial."
        rightElement={
          <div className="row" style={{ gap: 8 }}>
            <span className="live-dot" style={{ width: 6, height: 6 }} />
            <span className="mono small" style={{ letterSpacing: "0.08em" }}>DADOS SIMULADOS</span>
          </div>
        }
      />

      {/* KPIs Grid */}
      <div className="kpis" style={{ marginBottom: 20 }}>
        {KPIS.map((k, idx) => (
          <MetricCard 
            key={idx}
            label={k.label}
            value={k.value}
            unit={k.unit}
            trend={k.trend}
            trendUp={k.trendUp}
            ok={k.ok}
          />
        ))}
      </div>

      {/* Toolbar / Filters */}
      <div className="card toolbar" style={{ padding: "10px 14px", marginBottom: 20 }}>
        <SlidersHorizontal size={14} style={{ color: "var(--muted)", marginRight: 4 }} />
        <span className="small mono">Filtros:</span>
        
        <select 
          className="select" 
          value={regionFilter} 
          onChange={(e) => setRegionFilter(e.target.value)}
          style={{ padding: "4px 10px", fontSize: 12 }}
        >
          {REGIONS.map((r, i) => (
            <option key={i} value={r}>{r}</option>
          ))}
        </select>

        <select 
          className="select" 
          value={riskFilter} 
          onChange={(e) => setRiskFilter(e.target.value)}
          style={{ padding: "4px 10px", fontSize: 12 }}
        >
          <option value="all">Todas as severidades</option>
          <option value="crit">Crítico (Vermelho)</option>
          <option value="high">Atípico (Laranja)</option>
          <option value="med">Atenção (Amarelo)</option>
          <option value="low">Normal (Verde)</option>
          <option value="fail">Falha (Cinza)</option>
        </select>
        
        <div style={{ flex: 1 }} />
        <span className="mono small" style={{ color: "var(--muted-2)" }}>{filteredStations.length}/{STATIONS.length} nós ativos</span>
      </div>

      {/* Main Map + Side Drawer Split */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1.3fr 1fr",
        gap: 20,
        marginBottom: 20
      }}>
        {/* Map Panel */}
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "14px 18px", borderBottom: "1px solid var(--border-soft)"
          }}>
            <div className="row" style={{ gap: 10 }}>
              <MapPin size={14} style={{ color: "var(--muted)" }} />
              <div className="card-title">Mapa de regiões críticas · Brasil</div>
              <span className="chip" style={{ padding: "2px 8px", fontSize: 11 }}>{filteredStations.length} visíveis</span>
            </div>
            <div className="row" style={{ gap: 6 }}>
              <button className="btn btn-sm btn-ghost" onClick={() => go("clustering")}>
                <Layers size={12} /> Análise de Clusters
              </button>
              <button className="btn btn-sm btn-ghost" onClick={() => go("anomalies")}>
                <AlertTriangle size={12} /> Anomalias
              </button>
            </div>
          </div>

          <BrazilSensorMap 
            height={460} 
            selectedId={selectedId} 
            onSelectStation={(s) => setSelectedId(s.id)} 
            stations={filteredStations}
            showLabels={true}
          />

          <div style={{ padding: "12px 14px", borderTop: "1px solid var(--border-soft)" }}>
            <RiskLegendInline />
          </div>
        </div>

        {/* AI Classifier Panel (Drawer-like) */}
        <div className="card" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{
            padding: "14px 18px",
            borderBottom: "1px solid var(--border-soft)",
            background: "linear-gradient(180deg, oklch(0.30 0.06 215 / 0.4), transparent)"
          }}>
            <div className="row" style={{ justifyContent: "space-between" }}>
              <div className="card-title" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Brain size={14} /> Análise de Anomalia (Iso Forest)
              </div>
              <span className="chip" style={{ padding: "2px 8px", fontSize: 10 }}>
                <span className="live-dot" style={{ width: 6, height: 6 }} />
                <span className="mono">ISOLATION FOREST</span>
              </span>
            </div>
          </div>

          <div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
            <div>
              <div className="card-eyebrow">Estação monitorada (ANA)</div>
              <div style={{ fontSize: 19, fontWeight: 600, marginTop: 2 }}>{activeStation.name} ({activeStation.uf})</div>
              <div className="small mono" style={{ color: "var(--text-2)", marginTop: 2 }}>
                Código: {activeStation.code} • Bacia: {activeStation.basin} • Rio: {activeStation.river}
              </div>
              <div className="small" style={{ marginTop: 6, fontSize: 12, lineHeight: 1.4 }}>
                Tipo: <strong style={{ color: "var(--aqua)" }}>{activeStation.type}</strong> • Qualidade: <strong style={{ color: activeStation.dataQuality === "consistido" ? "oklch(0.62 0.17 150)" : "oklch(0.75 0.14 40)" }}>{activeStation.dataQuality}</strong>
              </div>
              <div className="small" style={{ marginTop: 2, fontSize: 12, lineHeight: 1.4 }}>
                Grupo atribuído: <strong style={{ color: "var(--cyan)" }}>{activeStat.cluster}</strong>
              </div>
            </div>

            <div style={{
              padding: 14, borderRadius: 12,
              background: `var(--risk-${activeStation.risk}-bg)`,
              border: `1px solid var(--risk-${activeStation.risk})`,
            }}>
              <div className="row" style={{ justifyContent: "space-between" }}>
                <span className="mono small" style={{ color: "var(--text-2)" }}>STATUS DE ANOMALIA</span>
                <StatusBadge level={activeStation.risk} />
              </div>
              <div style={{
                fontSize: 20, fontWeight: 600, letterSpacing: "-0.01em",
                marginTop: 6, color: `var(--risk-${activeStation.risk})`
              }}>
                {activeStation.risk_type}
              </div>
              <div className="row" style={{ justifyContent: "space-between", marginTop: 8 }}>
                <span className="small">Score de Anomalia</span>
                <span className="mono" style={{ fontSize: 13, color: "var(--text)" }}>
                  {activeStat.score}
                </span>
              </div>
              <div style={{
                height: 4, background: "oklch(1 0 0 / 0.08)", borderRadius: 999,
                marginTop: 6, overflow: "hidden"
              }}>
                <div style={{
                  height: "100%",
                  width: `${activeStat.score * 100}%`,
                  background: `var(--risk-${activeStation.risk})`,
                  boxShadow: `0 0 12px var(--risk-${activeStation.risk})`
                }}/>
              </div>
            </div>

            {/* Leituras Observadas (Mock) */}
            <div style={{ padding: "12px 14px", borderRadius: 8, background: "oklch(1 0 0 / 0.02)", border: "1px solid var(--border-soft)" }}>
              <div className="card-eyebrow" style={{ marginBottom: 6 }}>Leituras Observadas (Simuladas)</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 12px" }}>
                {activeStation.levelCm !== undefined && (
                  <div>
                    <span className="small" style={{ color: "var(--text-3)", fontSize: 10, display: "block" }}>Nível do Rio</span>
                    <strong style={{ fontSize: 13, color: "var(--cyan)" }}>{activeStation.levelCm} cm</strong>
                  </div>
                )}
                {activeStation.flowM3s !== undefined && (
                  <div>
                    <span className="small" style={{ color: "var(--text-3)", fontSize: 10, display: "block" }}>Vazão Estimada</span>
                    <strong style={{ fontSize: 13, color: "var(--cyan)" }}>{activeStation.flowM3s.toLocaleString()} m³/s</strong>
                  </div>
                )}
                <div>
                  <span className="small" style={{ color: "var(--text-3)", fontSize: 10, display: "block" }}>Precipitação 24h</span>
                  <strong style={{ fontSize: 13, color: "var(--aqua)" }}>{activeStation.rainfall24hMm} mm</strong>
                </div>
                <div>
                  <span className="small" style={{ color: "var(--text-3)", fontSize: 10, display: "block" }}>Acumulado 7 dias</span>
                  <strong style={{ fontSize: 13, color: "var(--aqua)" }}>{activeStation.rainfall7dMm} mm</strong>
                </div>
              </div>
            </div>

            <div>
              <div className="card-eyebrow" style={{ marginBottom: 4 }}>Parâmetro de isolamento</div>
              <p className="small" style={{ margin: "0 0 8px 0", lineHeight: 1.4, color: "var(--text-2)" }}>
                {activeStat.factor}
              </p>

              <div className="card-eyebrow" style={{ marginBottom: 4 }}>Nota explicativa da estação</div>
              <p className="small" style={{ margin: "0 0 10px 0", lineHeight: 1.4, color: "var(--text-2)", fontStyle: "italic" }}>
                "{activeStation.note}"
              </p>
              
              <div className="card-eyebrow" style={{ marginBottom: 8 }}>Fatores de decisão (Score contributions)</div>
              <div className="col" style={{ gap: 8 }}>
                {factors.map((f, i) => (
                  <div key={i}>
                    <div className="row" style={{ justifyContent: "space-between" }}>
                      <span style={{ fontSize: 12 }}>{f.lbl}</span>
                      <span className="mono small">{Math.round(f.w * 100)}%</span>
                    </div>
                    <div style={{ height: 3, background: "oklch(1 0 0 / 0.05)", borderRadius: 999, marginTop: 4 }}>
                      <div style={{
                        height: "100%", width: `${f.w * 100}%`,
                        background: "linear-gradient(90deg, var(--aqua), var(--cyan))",
                        borderRadius: 999
                      }}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ flex: 1 }} />
            <div className="row" style={{ gap: 8, marginTop: 4 }}>
              <button className="btn btn-sm" onClick={() => go("anomalies")}>
                Ver todas as anomalias <ArrowRight size={12} />
              </button>
              <button className="btn btn-sm btn-ghost" onClick={() => go("rec")}>
                Ver recomendações
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-stations detailed list */}
      <SectionCard 
        title={`Detalhamento de Telemetria Local · ${activeStation.region}`} 
        icon={<SlidersHorizontal size={14} />}
        style={{ marginTop: 20 }}
      >
        <div style={{ overflowX: "auto" }}>
          <table className="table">
            <thead>
              <tr>
                <th>Código Sensor</th>
                <th>Município</th>
                <th>Rio principal</th>
                <th>Status telemetria</th>
                <th>Leitura observada</th>
                <th>Variação 24h</th>
                <th>Chuva 7d</th>
              </tr>
            </thead>
            <tbody>
              {subStationsList.map((sub, idx) => (
                <tr key={idx} style={{ cursor: "pointer" }}>
                  <td className="num font-semibold">{sub.st}</td>
                  <td>{sub.city}</td>
                  <td>{sub.river}</td>
                  <td>
                    <StatusBadge level={sub.risk} />
                  </td>
                  <td className="num">{sub.lvl === 0 && sub.risk === "fail" ? "0 m³/s (Inativo)" : sub.lvl > 100 ? `${sub.lvl} cm` : `${sub.lvl}% média`}</td>
                  <td className={`num ${sub.d24 > 0 ? "text-red-400" : sub.d24 < 0 && sub.lvl > 0 ? "text-green-400" : ""}`}>
                    {sub.d24 > 0 ? `+${sub.d24} cm` : `${sub.d24} cm`}
                  </td>
                  <td className="num">{sub.r7} mm</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
};
