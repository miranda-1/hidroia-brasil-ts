import React from "react";
import { PageHeader } from "../components/ui/PageHeader";
import { motion } from "framer-motion";
import {
  Database,
  RefreshCw,
  Shield,
  Cpu,
  Layers,
  TrendingUp,
  Activity,
  FileText,
  GitBranch,
  Brain,
  Gauge,
  LineChart,
  CheckCircle,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface ConceptualForecastProps {
  go: (k: string) => void;
}

export const ConceptualForecast: React.FC<ConceptualForecastProps> = ({ go }) => {
  const pipelineSteps = [
    {
      num: "01",
      title: "Entrada de dados simulados",
      zone: "ENTRADA",
      icon: <Database size={16} />,
      desc: "Organiza chuva 24h/7d, nível, vazão, qualidade do dado e cenário-base em uma base mockada inspirada em estruturas ANA/HIDRO.",
      chips: ["Dados simulados", "Cenário-base", "Frontend-only"],
    },
    {
      num: "02",
      title: "Pré-processamento e normalização",
      zone: "PROCESSAMENTO",
      icon: <RefreshCw size={16} />,
      desc: "Aplica preenchimento didático de lacunas, padronização de escalas e organização temporal para comparação entre estações simuladas.",
      chips: ["Normalização", "Tratamento", "Comparação temporal"],
    },
    {
      num: "03",
      title: "Filtro de qualidade e anomalias",
      zone: "QUALIDADE",
      icon: <Shield size={16} />,
      desc: "Usa Isolation Forest e Autoencoders em nível conceitual para sinalizar ruído, falhas simuladas de sensor e leituras atípicas.",
      chips: ["Isolation Forest", "Autoencoders", "Conceitual"],
    },
    {
      num: "04",
      title: "Redução e visualização",
      zone: "EXPLORAÇÃO",
      icon: <Cpu size={16} />,
      desc: "PCA, t-SNE e UMAP aparecem como técnicas de compactação e visualização 2D/3D conceitual para leitura exploratória de padrões.",
      chips: ["PCA", "t-SNE", "UMAP"],
    },
    {
      num: "05",
      title: "Agrupamento de padrões",
      zone: "AGRUPAMENTO",
      icon: <Layers size={16} />,
      desc: "K-Means, DBSCAN e Hierarchical Clustering representam perfis como estiagem, normalidade, atenção e evento extremo simulado.",
      chips: ["K-Means", "DBSCAN", "Hierarchical"],
    },
    {
      num: "06",
      title: "Previsão conceitual",
      zone: "PREVISÃO",
      icon: <TrendingUp size={16} />,
      desc: "XGBoost Regressor e SVR são apresentados como arquitetura futura para estimar tendências hidrológicas didáticas, sem execução operacional no protótipo atual.",
      chips: ["XGBoost", "SVR", "Arquitetura futura"],
    },
    {
      num: "07",
      title: "Avaliação metodológica",
      zone: "AVALIAÇÃO",
      icon: <Activity size={16} />,
      desc: "F1-Score, Silhouette Score, erro de magnitude do pico e erro de tempo do pico aparecem como referências metodológicas para uma base validada.",
      chips: ["F1-Score", "Silhouette", "Erro de pico"],
    },
    {
      num: "08",
      title: "Saída didática",
      zone: "SAÍDA",
      icon: <FileText size={16} />,
      desc: "Gera cenários simulados, recomendações conceituais e interpretação acadêmica como apoio didático à análise socioambiental.",
      chips: ["Interpretação acadêmica", "Cenários simulados", "Sem uso operacional"],
    },
  ];

  const modelCards = [
    {
      title: "XGBoost Regressor",
      badge: "ARQUITETURA FUTURA",
      desc: "Modelo supervisionado de árvores em conjunto que poderia apoiar estimativa de tendência hidrológica em base histórica validada.",
      note: "No protótipo atual, é referência metodológica e não há treino real nem validação operacional.",
      chips: ["Tendência futura", "Dados tabulares", "Conceitual"],
      icon: <Gauge size={14} />,
    },
    {
      title: "SVR",
      badge: "ARQUITETURA FUTURA",
      desc: "Regressão por vetores de suporte que poderia modelar tendência com margem de erro em séries tratadas com ruído controlado.",
      note: "No protótipo atual, é apresentado como possibilidade metodológica sem uso operacional.",
      chips: ["Margem de erro", "Séries tratadas", "Conceitual"],
      icon: <LineChart size={14} />,
    },
  ];

  const metrics = [
    {
      title: "F1-Score",
      desc: "Referência para equilíbrio entre precisão e revocação na detecção de anomalias em uma base validada.",
      icon: <CheckCircle size={14} />,
    },
    {
      title: "Silhouette Score",
      desc: "Referência para coerência de clusters; valores próximos de 1 indicam grupos mais separados e consistentes.",
      icon: <Layers size={14} />,
    },
    {
      title: "Erro de magnitude do pico",
      desc: "Referência para diferença entre pico previsto e pico observado em cenários de avaliação metodológica.",
      icon: <TrendingUp size={14} />,
    },
    {
      title: "Erro de tempo do pico",
      desc: "Referência para diferença entre o momento previsto e o observado de um pico hidrológico.",
      icon: <Activity size={14} />,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="page"
    >
      <PageHeader
        category="PREVISÃO CONCEITUAL"
        title="Arquitetura Conceitual de Previsão"
        subtitle="Pipeline demonstrativo que organiza dados hidrometeorológicos simulados, aplica etapas conceituais de IA e apresenta tendências hidrológicas didáticas, sem uso operacional."
      />

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
        {[
          "Frontend-only",
          "Dados simulados",
          "Arquitetura futura",
          "Sem uso operacional",
        ].map((tag) => (
          <span key={tag} className="chip" style={{ padding: "3px 9px", fontSize: 10.5, cursor: "default" }}>
            {tag}
          </span>
        ))}
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-eyebrow">AVISO ACADÊMICO</div>
        <p className="small" style={{ margin: "8px 0 0", lineHeight: 1.55, color: "var(--text-2)" }}>
          Esta página apresenta uma arquitetura conceitual de IA para fins acadêmicos. Os modelos citados não executam estimativas aplicadas no protótipo atual; eles representam possibilidades metodológicas para uma versão futura validada.
        </p>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-head">
          <div className="card-title" style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <GitBranch size={15} style={{ color: "var(--cyan)" }} />
            <span>Pipeline Conceitual de IA</span>
          </div>
          <span className="mono small">8 ETAPAS · ENTRADA → SAÍDA</span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(235px, 1fr))",
            gap: 12,
            marginTop: 14,
          }}
        >
          {pipelineSteps.map((step) => (
            <div
              key={step.num}
              className="pipeline-card"
              style={{
                padding: 12,
                background: "oklch(0.24 0.032 232 / 0.62)",
                borderColor: "oklch(0.78 0.13 210 / 0.14)",
              }}
            >
              <div className="row" style={{ justifyContent: "space-between", marginBottom: 8 }}>
                <span className="mono" style={{ fontSize: 10, color: "var(--muted)" }}>
                  ETAPA {step.num}
                </span>
                <span className="chip" style={{ padding: "2px 7px", fontSize: 10, cursor: "default" }}>
                  {step.zone}
                </span>
              </div>
              <div className="row" style={{ gap: 8, color: "var(--cyan)", marginBottom: 7 }}>
                {step.icon}
                <strong style={{ fontSize: 12.5, color: "var(--text)" }}>{step.title}</strong>
              </div>
              <p className="small" style={{ margin: 0, lineHeight: 1.42, color: "var(--text-2)", fontSize: 11.2 }}>
                {step.desc}
              </p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 9 }}>
                {step.chips.map((chip) => (
                  <span
                    key={chip}
                    className="chip"
                    style={{ padding: "2px 6px", fontSize: 9.8, cursor: "default", opacity: 0.9 }}
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="forecast-layout">
        <div>
          <div className="row" style={{ gap: 8, marginBottom: 12 }}>
            <Brain size={16} style={{ color: "var(--cyan)" }} />
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>Modelos de previsão em arquitetura futura</h3>
          </div>

          <div className="forecast-model-grid">
            {modelCards.map((model) => (
              <div key={model.title} className="model-card">
                <div className="model-card-header">
                  <span className="mono" style={{ fontSize: 9, color: "var(--cyan)", letterSpacing: "0.05em" }}>
                    {model.badge}
                  </span>
                  <h4 style={{ margin: "2px 0 0", fontSize: 14, fontWeight: 600, color: "var(--text)" }}>
                    {model.title}
                  </h4>
                </div>

                <p className="small" style={{ lineHeight: 1.45, color: "var(--text-2)", marginBottom: 12 }}>
                  {model.desc}
                </p>

                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
                  {model.chips.map((chip) => (
                    <span key={chip} className="chip" style={{ padding: "2px 6px", fontSize: 10, cursor: "default" }}>
                      {chip}
                    </span>
                  ))}
                </div>

                <div className="model-limitation" style={{ marginTop: "auto" }}>
                  <div className="row" style={{ gap: 4, color: "var(--risk-high)", marginBottom: 2 }}>
                    {model.icon}
                    <strong style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.02em" }}>
                      Nota metodológica
                    </strong>
                  </div>
                  <p className="small" style={{ margin: 0, fontSize: 10.5, lineHeight: 1.35, color: "var(--text-2)" }}>
                    {model.note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <div className="card-title" style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Activity size={15} style={{ color: "var(--cyan)" }} />
              <span>Métricas conceituais de avaliação</span>
            </div>
            <span className="mono small">REFERÊNCIA METODOLÓGICA</span>
          </div>

          <p className="small" style={{ margin: "0 0 14px", color: "var(--muted)", lineHeight: 1.45 }}>
            Essas métricas são apresentadas como referências metodológicas. No protótipo atual, não representam validação operacional ou avaliação com dados oficiais.
          </p>

          <div className="metrics-grid">
            {metrics.map((metric) => (
              <div key={metric.title} className="metric-card">
                <div className="row" style={{ gap: 6, marginBottom: 6, color: "var(--cyan)" }}>
                  {metric.icon}
                  <h4 style={{ margin: 0, fontSize: 12.5, fontWeight: 600 }}>{metric.title}</h4>
                </div>
                <p className="small" style={{ margin: 0, lineHeight: 1.4, fontSize: 11.2 }}>{metric.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-head" style={{ marginBottom: 10 }}>
            <div className="card-title" style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Sparkles size={15} style={{ color: "var(--cyan)" }} />
              <span>Do dado simulado à interpretação acadêmica</span>
            </div>
          </div>

          <p className="small" style={{ margin: 0, color: "var(--text-2)", lineHeight: 1.55 }}>
            O objetivo desta arquitetura é demonstrar como técnicas de IA poderiam se encadear em uma solução futura. No HidroIA atual, o foco é didático: organizar conceitos, visualizar padrões e explicar limites metodológicos.
          </p>

          <div className="safe-note" style={{ marginTop: 14 }}>
            <span style={{ color: "var(--cyan)", fontWeight: 600, marginRight: 12 }}>PIPELINE DEMONSTRATIVO</span>
            <span style={{ color: "var(--risk-high)", fontWeight: 600 }}>SEM USO OPERACIONAL</span>
          </div>
        </div>

        <div className="forecast-action-bar" style={{ gap: 8, flexWrap: "wrap", justifyContent: "space-between" }}>
          <div className="row" style={{ gap: 8, flexWrap: "wrap" }}>
            <button className="btn btn-sm interactive-action" onClick={() => go("ai")} style={{ fontSize: 11, padding: "8px 14px" }}>
              Ver metodologia
            </button>
            <button className="btn btn-sm interactive-action" onClick={() => go("clustering")} style={{ fontSize: 11, padding: "8px 14px" }}>
              Explorar clusters
            </button>
            <button className="btn btn-sm interactive-action" onClick={() => go("data")} style={{ fontSize: 11, padding: "8px 14px" }}>
              Consultar base simulada
            </button>
            <button className="btn btn-sm interactive-action" onClick={() => go("rec")} style={{ fontSize: 11, padding: "8px 14px" }}>
              Ver recomendações conceituais <ArrowRight size={12} />
            </button>
          </div>
          <button className="btn btn-sm interactive-action" onClick={() => go("dashboard")} style={{ fontSize: 11, padding: "8px 16px" }}>
            Voltar ao Dashboard
          </button>
        </div>
      </div>
    </motion.div>
  );
};
