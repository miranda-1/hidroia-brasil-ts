import React, { useState, useMemo } from "react";
import { PageHeader } from "../components/ui/PageHeader";
import { StatusBadge } from "../components/ui/StatusBadge";
import { DB_ROWS } from "../data/databaseRows";
import { 
  RefreshCw, 
  Download, 
  Search, 
  AlertTriangle 
} from "lucide-react";

export const Database: React.FC = () => {
  const [q, setQ] = useState("");
  const [risk, setRisk] = useState("all");

  const rows = useMemo(() => {
    return DB_ROWS.filter(r =>
      (risk === "all" || r.risk === risk) &&
      (q === "" || `${r.city || ""} ${r.river || ""} ${r.st} ${r.region} ${r.state} ${r.cluster}`.toLowerCase().includes(q.toLowerCase()))
    );
  }, [q, risk]);

  const handleExportCSV = () => {
    // Elegant simulated CSV generation
    const headers = "Data,Fonte,Regiao,Estacao,Estado,Variavel,Valor,Movel7d,Desvio24h,Cluster,Score,Risco\n";
    const csvContent = rows.map(r => 
      `"${r.date}","${r.source}","${r.region}","${r.st}","${r.state}","${r.variable}","${r.lvl}","${r.m7}","${r.d24}","${r.cluster}",${r.score},"${r.risk}"`
    ).join("\n");
    
    const blob = new Blob([headers + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `hidroia_brasil_telemetria_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="page">
      <PageHeader 
        category="BASE DE DADOS" 
        title="Base de Dados Hidrometeorológicos" 
        subtitle="Leituras consolidadas das estações monitoradas com a classificação de risco emitida pela IA. Os dados aqui exibidos são simulados para fins acadêmicos."
        rightElement={
          <div className="row" style={{ gap: 10 }}>
            <button className="btn btn-sm" onClick={() => { setQ(""); setRisk("all"); }}>
              <RefreshCw size={12} /> Atualizar
            </button>
            <button className="btn btn-sm" onClick={handleExportCSV}>
              <Download size={12} /> Exportar CSV
            </button>
          </div>
        }
      />

      {/* Sim-data banner */}
      <div className="card" style={{
        padding: 12, marginBottom: 16,
        borderColor: "oklch(0.84 0.16 92 / 0.4)",
        background: "var(--risk-med-bg)",
      }}>
        <div className="row" style={{ gap: 10 }}>
          <span style={{ color: "var(--risk-med)", display: "flex", alignItems: "center" }}>
            <AlertTriangle size={16} />
          </span>
          <span style={{ fontSize: 13 }}>
            <strong>Dados simulados</strong> · Esta tabela exemplifica o formato de saída do pipeline não supervisionado consolidando dados das fontes ANA. Não deve ser usada operacionalmente.
          </span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="card" style={{ padding: 14, marginBottom: 14 }}>
        <div className="toolbar" style={{ margin: 0, justifyContent: "space-between" }}>
          <div className="row" style={{ gap: 12, flexWrap: "wrap", flex: 1 }}>
            <div className="row" style={{
              gap: 8, background: "oklch(0.18 0.025 238)",
              border: "1px solid var(--border)", borderRadius: 8,
              padding: "6px 10px", minWidth: 280
            }}>
              <span style={{ color: "var(--muted)", display: "flex", alignItems: "center" }}>
                <Search size={14} />
              </span>
              <input className="input" style={{ border: "none", background: "transparent", padding: 0, flex: 1, fontSize: 13 }}
                     placeholder="Buscar bacia, estado, município, rio ou estação..."
                     value={q} onChange={e => setQ(e.target.value)} />
            </div>
            <span className="toolbar-sep" />
            <div className="row" style={{ gap: 6, flexWrap: "wrap" }}>
              {[
                ["all", "Todos"], ["low", "Baixo"], ["med", "Atenção"], ["high", "Alto"], ["crit", "Crítico"], ["fail", "Falha"]
              ].map(([k, l]) => (
                <button key={k} onClick={() => setRisk(k)}
                        className={`chip ${risk === k ? "chip-active" : ""}`}
                        style={{ fontSize: 11, padding: "4px 10px" }}>
                  {l}
                </button>
              ))}
            </div>
          </div>
          <div className="row" style={{ gap: 10 }}>
            <span className="mono small">{rows.length} linhas</span>
            <span className="toolbar-sep" />
            <span className="mono small" style={{ color: "var(--muted-2)" }}>FONTE: ANA · ATUALIZADO 02/05/2024 08:30</span>
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table className="table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Fonte</th>
                <th>Região / Estação</th>
                <th>Variável</th>
                <th style={{ textAlign: "right" }}>Valor Observado</th>
                <th style={{ textAlign: "right" }}>Média 7d</th>
                <th style={{ textAlign: "right" }}>Desvio (Δ 24h)</th>
                <th>Cluster K-Means</th>
                <th style={{ textAlign: "right" }}>Score Anomalia</th>
                <th>Status Risco</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => {
                const isDrought = r.region.includes("São Francisco") || r.region.includes("Paraguai") || r.region.includes("Pantanal");
                return (
                  <tr key={i}>
                    <td className="num">{r.date}</td>
                    <td className="mono small">{r.source}</td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{r.st} ({r.state})</div>
                      <div className="small" style={{ color: "var(--text-2)" }}>{r.region}</div>
                    </td>
                    <td>{r.variable}</td>
                    <td className="num" style={{ textAlign: "right" }}>{r.lvl}</td>
                    <td className="num" style={{ textAlign: "right" }}>{r.m7}</td>
                    <td className="num" style={{
                      textAlign: "right",
                      color: r.risk === "fail" ? "var(--risk-fail)" : isDrought ? (r.d24 < -5 ? "var(--risk-high)" : "var(--text-2)") : (r.d24 > 80 ? "var(--risk-crit)" : r.d24 > 50 ? "var(--risk-high)" : "var(--text-2)")
                    }}>
                      {r.risk === "fail" ? "0 (Falha)" : `${r.d24 > 0 ? "+" : ""}${r.d24}${isDrought ? "%" : " cm"}`}
                    </td>
                    <td className="mono small" style={{ color: "var(--cyan)" }}>{r.cluster}</td>
                    <td className="num mono" style={{ textAlign: "right", color: "var(--aqua)", fontWeight: 600 }}>{r.score}</td>
                    <td>
                      <StatusBadge level={r.risk} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div style={{
          padding: "12px 18px", borderTop: "1px solid var(--border-soft)",
          display: "flex", justifyContent: "space-between", alignItems: "center"
        }}>
          <span className="mono small">Página 1 de 1 · {rows.length}/{DB_ROWS.length} registros</span>
          <div className="row" style={{ gap: 6 }}>
            <button className="btn btn-sm btn-ghost" disabled>← Anterior</button>
            <button className="btn btn-sm btn-ghost" disabled>Próxima →</button>
          </div>
        </div>
      </div>
    </div>
  );
};
