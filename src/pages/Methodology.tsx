import React from "react";
import { PageHeader } from "../components/ui/PageHeader";
import { 
  Database, 
  RefreshCw, 
  Cpu, 
  AlertTriangle, 
  Shield, 
  TrendingUp, 
  Zap, 
  Download 
} from "lucide-react";

export const Methodology: React.FC = () => {
  const steps = [
    { num: "01", title: "Ingestão Telemétrica",          ico: <Database size={16} />,    body: "Coleta em tempo real de dados fluviométricos e pluviométricos das estações ANA e INMET." },
    { num: "02", title: "Tratamento e Normalização",    ico: <RefreshCw size={16} />, body: "Imputação de gaps temporais e padronização das escalas com Z-Score Standard Scaling." },
    { num: "03", title: "Redução PCA",                  ico: <Cpu size={16} />,       body: "Redução das múltiplas variáveis temporais (precipitação de 1d, 3d, 7d, deltas de 24h, 48h) em 2 componentes principais." },
    { num: "04", title: "Agrupamento K-Means",          ico: <TrendingUp size={16} />,   ai: true, body: "Classificação em K=4 clusters para definição automática do perfil comportamental da estação." },
    { num: "05", title: "Cálculo de Anomalia",          ico: <AlertTriangle size={16} />,   body: "Passagem das séries temporais pelo Isolation Forest para estimar o score de isolamento (0.0 a 1.0)." },
    { num: "06", title: "Filtro de Densidade",          ico: <Zap size={16} />,     body: "Algoritmo DBSCAN isola ruídos geográficos de baixíssima densidade para capturar falhas telemétricas." },
    { num: "07", title: "Apoio à Decisão",              ico: <Shield size={16} />,  body: "Mapeamento dos status com regras e protocolos técnicos para órgãos reguladores e Defesa Civil." },
  ];

  const features = [
    { name: "Chuva acumulada 24h",       type: "Numérico", unit: "mm",      ex: "82 mm" },
    { name: "Chuva acumulada 3 dias",    type: "Numérico", unit: "mm",      ex: "174 mm" },
    { name: "Chuva acumulada 7 dias",    type: "Numérico", unit: "mm",      ex: "261 mm" },
    { name: "Nível observado / vazão",  type: "Numérico", unit: "cm / %",  ex: "685 cm / 31%" },
    { name: "Vazão estimada da bacia",   type: "Numérico", unit: "m³/s",    ex: "4.800 m³/s" },
    { name: "Variação de nível 24h (Δ)", type: "Numérico", unit: "cm / %",  ex: "+112 cm / -6%" },
    { name: "Variação de nível 48h (Δ)", type: "Numérico", unit: "cm / %",  ex: "+196 cm / -11%" },
    { name: "Silhouette Score local",    type: "Métrica",  unit: "Índice",   ex: "0.71" },
    { name: "Caminho médio de isolamento", type: "Métrica",  unit: "Passos",   ex: "4.2" },
    { name: "Densidade de vizinhança (ε)", type: "Métrica",  unit: "Distância", ex: "1.25" }
  ];

  return (
    <div className="page">
      <PageHeader 
        category="METODOLOGIA DE CIÊNCIA DE DADOS" 
        title="Metodologia e Arquitetura de IA" 
        subtitle="Como o HidroIA analisa séries temporais de dados públicos hidrometeorológicos usando Machine Learning Não Supervisionado."
        rightElement={
          <button className="btn btn-sm">
            <Download size={12} /> Artigo acadêmico (PDF)
          </button>
        }
      />

      {/* Flow diagram */}
      <div className="card">
        <div className="card-head">
          <div className="card-title" style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <TrendingUp size={14} /> Pipeline de Processamento e Modelagem Não Supervisionada
          </div>
          <span className="mono small">METODOLOGIA · 7 ETAPAS CONSECUTIVAS</span>
        </div>
        <div className="flow">
          {steps.map((s, i) => (
            <div key={i} className={`flow-step ${s.ai ? "is-ai" : ""}`} style={{ padding: 12 }}>
              <div className="flow-num">{s.num}</div>
              <div className="row" style={{ gap: 8, marginBottom: 8, color: s.ai ? "var(--aqua)" : "var(--cyan)" }}>
                {s.ico}
              </div>
              <div className="flow-title" style={{ fontSize: 12 }}>{s.title}</div>
              <div className="small" style={{ marginTop: 6, lineHeight: 1.35, fontSize: 10 }}>{s.body}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features + math cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 16, marginTop: 16 }}>
        <div className="card">
          <div className="card-head">
            <div className="card-title">
              <Database size={14} className="ico" style={{ marginRight: 6 }} /> Vetor de Atributos Hidrológicos (Features)
            </div>
            <span className="mono small">10 métricas calculadas</span>
          </div>
          <table className="table">
            <thead>
              <tr><th>Atributo</th><th>Tipo</th><th>Unidade</th><th>Exemplo (TAQ-01)</th></tr>
            </thead>
            <tbody>
              {features.map((f, i) => (
                <tr key={i}>
                  <td>{f.name}</td>
                  <td><span className="chip" style={{ padding: "2px 8px", fontSize: 11 }}>{f.type}</span></td>
                  <td className="num">{f.unit}</td>
                  <td className="num mono" style={{ color: "var(--cyan)" }}>{f.ex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="col" style={{ gap: 16 }}>
          <div className="card">
            <div className="card-eyebrow">Justificativa Acadêmica</div>
            <div style={{ fontSize: 18, fontWeight: 600, marginTop: 4, color: "var(--cyan)" }}>
              Por que Aprendizado Não Supervisionado?
            </div>
            <p className="small" style={{ lineHeight: 1.5, marginTop: 8, color: "var(--text-2)" }}>
              Os dados telemétricos brutos são coletados por sensores em campo e disponibilizados sem anotações prévias (labels). O uso de algoritmos não supervisionados permite identificar dinamicamente padrões anômalos de chuva e comportamento dos rios sem a necessidade de rotulação manual dispendiosa.
            </p>
          </div>

          <div className="card">
            <div className="card-eyebrow">Modelos e Funções Matemáticas</div>
            <div className="col" style={{ gap: 12, marginTop: 8 }}>
              {[
                { name: "PCA (Redução Dimensional)", desc: "Projeta o espaço de alta dimensão em componentes principais maximizando a variância explicada: Y = X * W." },
                { name: "K-Means (Agrupamento)", desc: "Minimiza a inércia intracluster: argmin ∑ ||x_i - μ_j||^2 para definir as 4 tipologias." },
                { name: "Isolation Forest (Isolamento)", desc: "Calcula score de anomalia s(x, n) = 2^(- E(h(x)) / c(n)). Caminhos curtos de árvore indicam anomalias." },
                { name: "DBSCAN (Densidade de Ruídos)", desc: "Usa métricas de densidade (Eps e MinPts) para separar pontos de ruído (Cluster -1), indicando falhas físicas." }
              ].map((model, idx) => (
                <div key={idx} style={{ padding: 10, borderRadius: 8, border: "1px solid var(--border-soft)", background: "oklch(1 0 0 / 0.015)" }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "var(--aqua)" }}>{model.name}</div>
                  <div className="small" style={{ marginTop: 2, color: "var(--text-2)", lineHeight: 1.35 }}>{model.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
