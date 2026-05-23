import React, { useState, useMemo } from "react";
import { PageHeader } from "../components/ui/PageHeader";
import { Spark } from "../components/ui/Spark";
import { StatusBadge } from "../components/ui/StatusBadge";
import { ANOMALY_KPIS, ANOMALY_ROWS } from "../data/anomalies";
import { 
  RefreshCw, 
  Shield, 
  AlertTriangle,
  FileText
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
        subtitle="Detecção automática de comportamentos atípicos e possíveis falhas em sensores telemétricos via florestas de isolamento."
        rightElement={
          <div className="row" style={{ gap: 10 }}>
            <button className="btn btn-sm" onClick={() => setSeverityFilter("all")}>
              <RefreshCw size={12} /> Limpar filtros
            </button>
            <button className="btn btn-primary btn-sm" onClick={() => go("rec")}>
              <FileText size={12} /> Gerar Relatório IA
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
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 16, marginTop: 18 }}>
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", borderBottom: "1px solid var(--border-soft)" }}>
            <div className="card-title" style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <AlertTriangle size={14} style={{ color: "var(--risk-crit)" }} /> Ranking de Anomalias (Isolation Forest)
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

          <table className="table">
            <thead>
              <tr>
                <th style={{ width: 40 }}>Rank</th>
                <th>Estação / Estado</th>
                <th>Variável</th>
                <th style={{ textAlign: "right" }}>Medição</th>
                <th style={{ textAlign: "right" }}>Score</th>
                <th>Status Risco</th>
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

        {/* Sidebar explaining Validation */}
        <div className="col" style={{ gap: 16 }}>
          <div className="card">
            <div className="card-head" style={{ marginBottom: 10 }}>
              <div className="card-title" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Shield size={14} /> Validação Cruzada Espacial
              </div>
            </div>
            
            <p className="small" style={{ margin: "0 0 12px 0", lineHeight: 1.5, color: "var(--text-2)" }}>
              Para evitar falsos alertas de secas extremas decorrentes de problemas de telemetria física, o pipeline executa um <strong>algoritmo de validação cruzada espacial</strong>:
            </p>

            <div className="col" style={{ gap: 10 }}>
              {[
                { title: "1. Isolamento Inicial", desc: "O Isolation Forest detecta um desvio drástico (leitura nula ou travada em 0) na estação de referência." },
                { title: "2. Varredura Espacial (DBSCAN)", desc: "O algoritmo mapeia as estações adjacentes na mesma sub-bacia em um raio espacial pré-definido." },
                { title: "3. Cruzamento de Chuva", desc: "Se as estações vizinhas registram chuvas acumuladas elevadas e elevação de nível, enquanto a estação alvo mostra fluxo zero." },
                { title: "4. Diagnóstico de Hardware", desc: "A IA descarta 'Seca Histórica' e classifica o evento como 'Falha de Sensor (Hardware Offline)'." }
              ].map((step, idx) => (
                <div key={idx} style={{ padding: 10, borderRadius: 8, background: "oklch(1 0 0 / 0.02)", border: "1px solid var(--border-soft)" }}>
                  <div className="small" style={{ fontWeight: 600, color: "var(--cyan)", marginBottom: 2 }}>{step.title}</div>
                  <div className="small" style={{ color: "var(--text-2)", lineHeight: 1.4 }}>{step.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ background: "linear-gradient(180deg, var(--risk-fail-bg), transparent)" }}>
            <div className="card-eyebrow" style={{ color: "var(--risk-fail)" }}>Aviso técnico de hardware</div>
            <div style={{ fontSize: 14, fontWeight: 600, marginTop: 4 }}>Inconsistência em Porto Velho (MAD-02)</div>
            <p className="small" style={{ marginTop: 6, lineHeight: 1.45, color: "var(--text-2)" }}>
              As estações fluviométricas à montante (Abunã-01) registraram vazão de 495 m³/s com chuvas de 220 mm. A leitura zerada na estação de Porto Velho (MAD-02) é um falso-positivo de seca gerado por entupimento do duto de tomada de pressão ou falha no transdutor de nível.
            </p>
            <div className="row" style={{ gap: 8, marginTop: 12 }}>
              <span className="risk-pill risk-fail">Hardware Suspeito</span>
              <span className="small mono">Score: 0.88</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
