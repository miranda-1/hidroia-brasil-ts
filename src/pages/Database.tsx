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
      (q === "" || `${r.name || ""} ${r.code || ""} ${r.basin || ""} ${r.region || ""} ${r.uf || ""} ${r.cluster || ""} ${r.type || ""} ${r.dataQuality || ""}`.toLowerCase().includes(q.toLowerCase()))
    );
  }, [q, risk]);

  const handleExportCSV = () => {
    // Geração elegante de CSV com metadados inspirados na ANA/HIDRO
    const headers = "Codigo ANA,Estacao,UF,Regiao,Bacia,Tipo,Nivel (cm),Vazao (m3/s),Chuva 24h (mm),Chuva 7d (mm),Qualidade,Score IA,Status Risco\n";
    const csvContent = rows.map(r => 
      `"${r.code}","${r.name}","${r.uf}","${r.region}","${r.basin}","${r.type}",${r.levelCm !== undefined ? r.levelCm : `"-"`},${r.flowM3s !== undefined ? r.flowM3s : `"-"`},${r.rainfall24hMm},${r.rainfall7dMm},"${r.dataQuality}",${r.score.toFixed(2)},"${r.status}"`
    ).join("\n");
    
    const blob = new Blob([headers + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `hidroia_base_dados_ana_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="page">
      <PageHeader 
        category="BASE DE DADOS" 
        title="Base de Dados Hidrometeorológicos" 
        subtitle="Leituras consolidadas das estações monitoradas com a classificação de risco emitida pela IA. Estrutura inspirada no HIDRO/ANA — dados simulados para fins acadêmicos."
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
            <strong>Protótipo Acadêmico • Dados Simulados</strong> · Esta base de dados hidrometeorológicos reflete uma estrutura inspirada no HIDRO/ANA. Todos os registros e scores de IA são mockados para fins de demonstração acadêmica e não devem ser usados operacionalmente.
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
                     placeholder="Buscar por código, estação, UF, bacia, tipo ou qualidade..."
                     value={q} onChange={e => setQ(e.target.value)} />
            </div>
            <span className="toolbar-sep" />
            <div className="row" style={{ gap: 6, flexWrap: "wrap" }}>
              {[
                ["all", "Todos"], ["low", "Normal"], ["med", "Atenção"], ["high", "Atípico"], ["crit", "Anomalia"], ["fail", "Falha"]
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
            <span className="mono small" style={{ color: "var(--muted-2)" }}>FONTE: MOCK INSPIRADO EM ANA/HIDRO · ATUALIZADO 23/05/2026 17:30</span>
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table className="table">
            <thead>
              <tr>
                <th>Código ANA</th>
                <th>Estação</th>
                <th>UF</th>
                <th>Região</th>
                <th>Bacia</th>
                <th>Tipo</th>
                <th style={{ textAlign: "right" }}>Nível (cm)</th>
                <th style={{ textAlign: "right" }}>Vazão (m³/s)</th>
                <th style={{ textAlign: "right" }}>Chuva 24h (mm)</th>
                <th style={{ textAlign: "right" }}>Chuva 7d (mm)</th>
                <th>Qualidade</th>
                <th style={{ textAlign: "right" }}>Score IA</th>
                <th>Status Risco</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => {
                return (
                  <tr key={i}>
                    <td className="num mono small">{r.code}</td>
                    <td style={{ fontWeight: 600 }}>{r.name}</td>
                    <td className="mono">{r.uf}</td>
                    <td className="small" style={{ color: "var(--text-2)" }}>{r.region}</td>
                    <td className="small" style={{ color: "var(--text-2)" }}>{r.basin}</td>
                    <td>
                      <span className="chip" style={{ 
                        fontSize: 9, 
                        padding: "1px 6px",
                        background: r.type === "Fluviométrica" ? "oklch(0.70 0.12 210 / 0.1)" : "oklch(0.75 0.14 140 / 0.1)",
                        color: r.type === "Fluviométrica" ? "var(--cyan)" : "var(--aqua)",
                        border: `1px solid ${r.type === "Fluviométrica" ? "var(--cyan-soft)" : "var(--border-soft)"}`
                      }}>
                        {r.type}
                      </span>
                    </td>
                    <td className="num" style={{ textAlign: "right" }}>{r.levelCm !== undefined ? `${r.levelCm} cm` : "-"}</td>
                    <td className="num" style={{ textAlign: "right" }}>{r.flowM3s !== undefined ? `${r.flowM3s.toLocaleString()} m³/s` : "-"}</td>
                    <td className="num" style={{ textAlign: "right" }}>{r.rainfall24hMm} mm</td>
                    <td className="num" style={{ textAlign: "right" }}>{r.rainfall7dMm} mm</td>
                    <td>
                      <span className="chip" style={{ 
                        fontSize: 10, 
                        padding: "2px 6px",
                        background: r.dataQuality === "consistido" ? "oklch(0.62 0.17 150 / 0.1)" : "oklch(0.75 0.14 40 / 0.1)",
                        color: r.dataQuality === "consistido" ? "var(--risk-low)" : "var(--risk-med)",
                        border: `1px solid ${r.dataQuality === "consistido" ? "var(--risk-low-bg)" : "var(--risk-med-bg)"}`
                      }}>
                        {r.dataQuality}
                      </span>
                    </td>
                    <td className="num mono" style={{ textAlign: "right", color: "var(--aqua)", fontWeight: 600 }}>{r.score.toFixed(2)}</td>
                    <td>
                      <StatusBadge level={r.risk} label={r.status} />
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
