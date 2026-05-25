import React, { useState, useMemo } from "react";
import { PageHeader } from "../components/ui/PageHeader";
import { Spark } from "../components/ui/Spark";
import { StatusBadge } from "../components/ui/StatusBadge";
import { ANOMALY_KPIS, ANOMALY_ROWS } from "../data/anomalies";
import { 
  RefreshCw, 
  Shield, 
  AlertTriangle,
  FileText,
  Brain
} from "lucide-react";


interface AnomaliesProps {
  go: (k: string) => void;
}

export const Anomalies: React.FC<AnomaliesProps> = ({ go }) => {
  const [severityFilter, setSeverityFilter] = useState<string>("all");

  const filteredRows = useMemo(() => {
    if (severityFilter === "all") return ANOMALY_ROWS;
    if (severityFilter === "fail") return ANOMALY_ROWS.filter(r => r.risk === "fail");
    return ANOMALY_ROWS.filter(r => r.risk === severityFilter);
  }, [severityFilter]);

  return (
    <div className="page">
      <PageHeader 
        category="INTELIGÊNCIA" 
        title="Detecção de anomalias (Iso Forest)" 
        subtitle="Análise conceitual de comportamentos atípicos em leituras simuladas, inspirada no algoritmo Isolation Forest."
        rightElement={
          <div className="row" style={{ gap: 10 }}>
            <button className="btn btn-sm" onClick={() => setSeverityFilter("all")}>
              <RefreshCw size={12} /> Limpar filtros
            </button>
            <button className="btn btn-primary btn-sm" onClick={() => go("rec")}>
              <FileText size={12} /> Gerar relatório demo
            </button>
          </div>
        }
      />

      {/* Anomalies KPIs */}
      <div className="kpis">
        {ANOMALY_KPIS.map((k, i) => (
          <div key={i} className="kpi">
            <div className="kpi-label">{k.label}</div>
            <div className="kpi-value">{k.value}</div>
            <div className="kpi-trend up">▲ {k.trend}</div>
            <div className="kpi-spark">
              <Spark data={[10, 15, 20, 25, 30, 35, 37]} color="var(--risk-crit)" />
            </div>
          </div>
        ))}
      </div>

      {/* Main layout */}
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.55fr) minmax(360px, 0.95fr)", gap: 20, marginTop: 18 }}>
        {/* Left Column - Ranking */}
        <div className="card" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", borderBottom: "1px solid var(--border-soft)" }}>
            <div className="card-title" style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <AlertTriangle size={14} style={{ color: "var(--risk-crit)" }} /> Ranking de anomalias simuladas
            </div>
            <span className="mono small">{filteredRows.length} incidentes</span>
          </div>

          {/* Filtering buttons */}
          <div style={{ padding: "12px 18px", borderBottom: "1px solid var(--border-soft)", display: "flex", gap: 6, flexWrap: "wrap" }}>
            {[
              { k: "all", l: "Todos", c: "var(--text)" },
              { k: "crit", l: "Crítico (>0.85)", c: "var(--risk-crit)" },
              { k: "high", l: "Alto (0.70-0.85)", c: "var(--risk-high)" },
              { k: "med", l: "Atenção (0.50-0.70)", c: "var(--risk-med)" },
              { k: "fail", l: "Falhas de Sensor", c: "var(--risk-fail)" }
            ].map(item => (
              <button key={item.k}
                      onClick={() => setSeverityFilter(item.k)}
                      className={`chip ${severityFilter === item.k ? "chip-active" : ""}`}
                      style={{
                        borderColor: severityFilter === item.k ? item.c : "var(--border-soft)",
                        color: severityFilter === item.k ? item.c : "var(--text-2)"
                      }}>
                {item.l}
              </button>
            ))}
          </div>

          <div style={{ overflowX: "auto" }}>
            <table className="table">
              <thead>
                <tr>
                  <th style={{ width: 40 }}>Rank</th>
                  <th>Estação / Estado</th>
                  <th>Variável</th>
                  <th style={{ textAlign: "right" }}>Medição</th>
                  <th style={{ textAlign: "right" }}>Score</th>
                  <th>Risco</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((r, i) => (
                  <tr key={i}>
                    <td className="mono small" style={{ color: "var(--muted)" }}>#{r.rank}</td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{r.st} ({r.state})</div>
                      <div className="small" style={{ color: "var(--text-2)" }}>{r.region}</div>
                    </td>
                    <td>{r.variable}</td>
                    <td className="num" style={{ textAlign: "right" }}>{r.val}</td>
                    <td className="num mono" style={{ textAlign: "right", color: "var(--cyan)", fontWeight: 600 }}>{r.score}</td>
                    <td>
                      <StatusBadge level={r.risk} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column - Explanations */}
        <div className="col" style={{ gap: 16 }}>
          {/* Card: Como ler o score */}
          <div className="card" style={{ padding: 14 }}>
            <div className="card-eyebrow" style={{ color: "var(--cyan)" }}>Didático</div>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--text)", marginBottom: 4 }}>Como ler o score</div>
            <p className="small" style={{ margin: 0, lineHeight: 1.45, color: "var(--text-2)" }}>
              Scores simulados variam de 0 a 1. Valores mais próximos de 1 indicam maior desvio em relação ao padrão conceitual da base.
            </p>
          </div>

          {/* Card: Validação Cruzada Espacial */}
          <div className="card">
            <div className="card-head" style={{ marginBottom: 10 }}>
              <div className="card-title" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Shield size={14} /> Validação Cruzada Espacial
              </div>
            </div>
            
            <p className="small" style={{ margin: "0 0 12px 0", lineHeight: 1.5, color: "var(--text-2)" }}>
              Para fins didáticos, o protótipo compara leituras simuladas entre estações próximas e usa regras conceituais para diferenciar eventos atípicos de possíveis falhas de sensor.
            </p>

            <div className="col" style={{ gap: 10 }}>
              {[
                { title: "1. Isolamento Inicial", desc: "O cenário simulado marca uma leitura muito diferente do padrão esperado da estação." },
                { title: "2. Comparação espacial conceitual", desc: "A leitura é comparada com estações próximas da mesma sub-bacia em um raio conceitual." },
                { title: "3. Comparação com chuva acumulada", desc: "O protótipo verifica se leituras vizinhas também indicam chuva elevada ou variação de nível." },
                { title: "4. Possível falha de sensor", desc: "A regra conceitual reclassifica o caso como possível falha de sensor quando há inconsistência entre vazão, nível e chuva." }
              ].map((step, idx) => (
                <div key={idx} style={{ padding: 10, borderRadius: 8, background: "oklch(1 0 0 / 0.02)", border: "1px solid var(--border-soft)" }}>
                  <div className="small" style={{ fontWeight: 600, color: "var(--cyan)", marginBottom: 2 }}>{step.title}</div>
                  <div className="small" style={{ color: "var(--text-2)", lineHeight: 1.4 }}>{step.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Card: Erro de reconstrução conceitual (Autoencoders) */}
          <div className="card">
            <div className="card-head" style={{ marginBottom: 10 }}>
              <div className="card-title" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Brain size={14} style={{ color: "var(--cyan)" }} /> Erro de reconstrução conceitual
              </div>
            </div>

            <p className="small" style={{ margin: "0 0 12px 0", lineHeight: 1.45, color: "var(--text-2)" }}>
              Autoencoders (redes neurais de compressão) podem aprender a reconstruir padrões hidrológicos normais. Desvios elevados entre a leitura simulada e a reconstrução indicam anomalias didáticas.
            </p>

            {/* Barras de Erro de Reconstrução */}
            <div className="col" style={{ gap: 10, marginBottom: 12 }}>
              {[
                { station: "Porto Velho (Falha)", pct: 88, color: "var(--risk-fail)" },
                { station: "Taquari (Inundação)", pct: 78, color: "var(--risk-crit)" },
                { station: "Humaitá (Normal)", pct: 12, color: "var(--risk-low)" }
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="row" style={{ justifyContent: "space-between", marginBottom: 3 }}>
                    <span className="small text-2" style={{ fontWeight: 500 }}>{item.station}</span>
                    <span className="mono small" style={{ color: item.color, fontWeight: 600 }}>{item.pct}% Erro</span>
                  </div>
                  <div style={{ height: 6, background: "oklch(1 0 0 / 0.05)", borderRadius: 99, overflow: "hidden" }}>
                    <div style={{ width: `${item.pct}%`, height: "100%", background: item.color, borderRadius: 99 }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Comparação didática */}
            <div style={{
              padding: 10,
              borderRadius: 8,
              background: "oklch(1 0 0 / 0.02)",
              border: "1px solid var(--border-soft)",
              marginBottom: 10
            }}>
              <div className="small" style={{ fontWeight: 600, color: "var(--cyan)", marginBottom: 4 }}>Comparação de abordagens:</div>
              <p className="small" style={{ margin: "0 0 6px 0", color: "var(--text-2)", lineHeight: 1.35 }}>
                • <strong>Isolation Forest:</strong> Isola leituras atípicas dividindo o espaço multidimensional de variáveis simuladas.
              </p>
              <p className="small" style={{ margin: 0, color: "var(--text-2)", lineHeight: 1.35 }}>
                • <strong>Autoencoders:</strong> Mede o erro de reconstrução simulado em relação à representação ideal aprendida.
              </p>
            </div>

            <div style={{
              padding: 8,
              borderRadius: 6,
              background: "oklch(0.74 0.18 52 / 0.04)",
              border: "1px solid oklch(0.74 0.18 52 / 0.10)"
            }}>
              <p className="small" style={{ margin: 0, fontSize: 10.5, color: "var(--muted)", fontStyle: "italic", lineHeight: 1.4 }}>
                Esta visualização representa uma simulação didática de erro de reconstrução, sem treinamento real de rede neural no protótipo atual.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width bottom section - Nota Didática de Sensor */}
      <div className="card anomalies-bottom-card" style={{
        background: "linear-gradient(180deg, var(--risk-fail-bg), transparent)",
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 20,
        padding: 20
      }}>
        <div style={{ flex: "1 1 500px" }}>
          <div className="card-eyebrow" style={{ color: "var(--risk-fail)" }}>NOTA DIDÁTICA DE SENSOR</div>
          <div style={{ fontSize: 15, fontWeight: 600, marginTop: 4, color: "var(--text)" }}>Inconsistência simulada em Porto Velho</div>
          <p className="small" style={{ marginTop: 8, margin: 0, lineHeight: 1.5, color: "var(--text-2)" }}>
            No cenário simulado, leituras vizinhas apresentam vazão e chuva acumulada coerentes, enquanto Porto Velho registra vazão nula. Essa divergência é interpretada como possível falha de sensor para fins didáticos.
          </p>
        </div>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: 8,
          borderLeft: "1px solid var(--border-soft)",
          paddingLeft: 20,
          minWidth: 160
        }} className="anomalies-bottom-meta">
          <span className="risk-pill risk-fail" style={{ fontSize: 10, padding: "4px 10px" }}>Falha Simulada</span>
          <div className="row" style={{ gap: 6 }}>
            <span className="small text-2" style={{ fontSize: 11 }}>Score de anomalia:</span>
            <span className="mono" style={{ color: "var(--cyan)", fontWeight: 600, fontSize: 13 }}>0.88</span>
          </div>
        </div>
      </div>
    </div>
  );
};
