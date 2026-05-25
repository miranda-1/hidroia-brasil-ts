import React from "react";
import { PageHeader } from "../components/ui/PageHeader";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Brain,
  CheckCircle,
  Cpu,
  Database,
  GitBranch,
  Layers,
  Network,
  Radar,
  RefreshCw,
  Shield,
  Zap,
} from "lucide-react";

interface MethodologyProps {
  go: (k: string) => void;
}

type TechniqueRoute = "clustering" | "anomalies";

export const Methodology: React.FC<MethodologyProps> = ({ go }) => {
  const pipelineSteps = [
    {
      num: "01",
      title: "Base simulada",
      icon: <Database size={15} />,
      status: "simulado",
      body: "Organiza leituras de chuva, nível, vazão, qualidade e score no cenário-base didático.",
    },
    {
      num: "02",
      title: "Tratamento e normalização",
      icon: <RefreshCw size={15} />,
      status: "simulado",
      body: "Padroniza variáveis e organiza a base para comparações coerentes entre regiões simuladas.",
    },
    {
      num: "03",
      title: "Detecção conceitual de anomalias",
      icon: <AlertTriangle size={15} />,
      status: "conceitual",
      body: "Sinaliza leituras atípicas e possíveis inconsistências por meio de critérios conceituais.",
    },
    {
      num: "04",
      title: "Redução e visualização",
      icon: <Cpu size={15} />,
      status: "conceitual",
      body: "Resume relações multivariáveis para facilitar a leitura visual de padrões no espaço de análise.",
    },
    {
      num: "05",
      title: "Agrupamento de padrões",
      icon: <Layers size={15} />,
      status: "simulado",
      body: "Agrupa comportamentos semelhantes para destacar perfis hidrológicos didáticos.",
    },
    {
      num: "06",
      title: "Métricas de avaliação",
      icon: <Activity size={15} />,
      status: "conceitual",
      body: "Usa referências de qualidade analítica para explicar interpretação de classificação e clusterização.",
    },
    {
      num: "07",
      title: "Limitações do escopo",
      icon: <Shield size={15} />,
      status: "conceitual",
      body: "Delimita o uso didático da metodologia em base simulada e sem aplicação operacional.",
    },
  ];

  const prototypeTechniques: Array<{
    name: string;
    icon: React.ReactNode;
    body: string;
    route: TechniqueRoute;
    cta: string;
  }> = [
    {
      name: "K-Means",
      icon: <Layers size={14} />,
      body: "Agrupa leituras semelhantes para formar perfis hidrológicos didáticos no cenário-base.",
      route: "clustering",
      cta: "Ver em Clusters",
    },
    {
      name: "DBSCAN",
      icon: <Radar size={14} />,
      body: "Destaca ilhas de similaridade por densidade e evidencia ruídos conceituais no conjunto simulado.",
      route: "clustering",
      cta: "Ver em Clusters",
    },
    {
      name: "Hierarchical Clustering",
      icon: <Network size={14} />,
      body: "Organiza leituras por níveis de proximidade para leitura hierárquica de comportamentos hidrológicos.",
      route: "clustering",
      cta: "Ver em Clusters",
    },
    {
      name: "Isolation Forest",
      icon: <AlertTriangle size={14} />,
      body: "Sinaliza comportamentos atípicos no espaço de variáveis e apoia leitura de anomalias conceituais.",
      route: "anomalies",
      cta: "Ver em Anomalias",
    },
    {
      name: "Autoencoders",
      icon: <Brain size={14} />,
      body: "Modelam erro de reconstrução para apoiar detecção conceitual de padrões raros e inconsistências.",
      route: "anomalies",
      cta: "Ver em Anomalias",
    },
  ];

  const supportTechniques = [
    {
      name: "PCA",
      icon: <Cpu size={14} />,
      label: "Apoio metodológico",
      body: "Reduz variáveis para componentes principais de forma didática, apoiando a compreensão de correlações multivariáveis em cenários simulados.",
    },
    {
      name: "t-SNE / UMAP",
      icon: <GitBranch size={14} />,
      label: "Arquitetura futura",
      body: "Podem apoiar visualizações 2D/3D em arquiteturas futuras, especialmente para explorar ilhas de similaridade em dados de alta dimensão.",
    },
  ];

  const metrics = [
    {
      name: "F1-Score",
      icon: <CheckCircle size={14} />,
      body: "Referência para equilibrar acertos e falsos positivos na leitura de anomalias.",
    },
    {
      name: "Silhouette Score",
      icon: <Layers size={14} />,
      body: "Referência de separação e consistência entre grupos em processos de clusterização.",
    },
    {
      name: "Erro de magnitude do pico",
      icon: <Zap size={14} />,
      body: "Referência para comparar diferença entre pico estimado e pico observado.",
    },
    {
      name: "Erro de tempo do pico",
      icon: <Activity size={14} />,
      body: "Referência para avaliar diferença entre momento estimado e momento observado de um pico.",
    },
  ];

  const routeTheme: Record<
    TechniqueRoute,
    { color: string; bg: string; border: string; chip: string }
  > = {
    clustering: {
      color: "var(--cyan)",
      bg: "oklch(0.78 0.13 210 / 0.10)",
      border: "oklch(0.78 0.13 210 / 0.28)",
      chip: "Clusters",
    },
    anomalies: {
      color: "var(--risk-crit)",
      bg: "var(--risk-crit-bg)",
      border: "var(--risk-crit)",
      chip: "Anomalias",
    },
  };

  return (
    <div className="page">
      <PageHeader
        category="METODOLOGIA DE IA"
        title="Pipeline conceitual de análise hidrometeorológica"
        subtitle="Guia metodológico com fluxo visual, técnicas conceituais e referências de interpretação para o cenário-base simulado."
      />

      <div
        className="card"
        style={{
          marginBottom: 16,
          padding: "12px 14px",
          background: "oklch(0.78 0.13 210 / 0.08)",
          borderColor: "oklch(0.78 0.13 210 / 0.24)",
        }}
      >
        <div
          className="mono"
          style={{
            fontSize: 10.5,
            letterSpacing: "0.08em",
            color: "var(--cyan)",
            marginBottom: 6,
          }}
        >
          Escopo metodológico
        </div>
        <p className="small" style={{ margin: 0, lineHeight: 1.5, color: "var(--text-2)" }}>
          A metodologia utiliza dados simulados e visualizações conceituais para demonstrar padrões, anomalias, agrupamentos e tendências hidrológicas didáticas, sem uso operacional ou validação em bases externas.
        </p>
      </div>

      <div className="card">
        <div className="card-head" style={{ marginBottom: 10 }}>
          <div className="card-title" style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <GitBranch size={14} /> Pipeline metodológico conceitual
          </div>
          <span className="mono small">7 ETAPAS</span>
        </div>

        <p className="small" style={{ margin: "0 0 12px 0", color: "var(--muted)", lineHeight: 1.45 }}>
          Fluxo sequencial do cenário-base, da organização da base simulada até as limitações de uso conceitual.
        </p>

        <div style={{ display: "flex", gap: 12, overflowX: "auto", padding: "2px 2px 8px" }}>
          {pipelineSteps.map((step, index) => (
            <div
              key={step.num}
              style={{
                position: "relative",
                flex: "0 0 220px",
                minHeight: 162,
                border: "1px solid var(--border-soft)",
                borderRadius: 10,
                padding: 12,
                background: "oklch(1 0 0 / 0.018)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {index < pipelineSteps.length - 1 && (
                <span
                  style={{
                    position: "absolute",
                    right: -11,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 18,
                    height: 18,
                    borderRadius: 99,
                    border: "1px solid var(--border-soft)",
                    background: "var(--bg-panel)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--muted)",
                    zIndex: 1,
                  }}
                >
                  <ArrowRight size={11} />
                </span>
              )}
              <div className="row" style={{ justifyContent: "space-between", marginBottom: 8 }}>
                <span className="mono" style={{ fontSize: 10, color: "var(--muted)" }}>
                  ETAPA {step.num}
                </span>
                <span className="chip" style={{ padding: "2px 7px", fontSize: 9.5 }}>
                  {step.status}
                </span>
              </div>
              <div className="row" style={{ gap: 7, color: "var(--cyan)", marginBottom: 6 }}>
                {step.icon}
                <strong style={{ fontSize: 13, color: "var(--text)" }}>{step.title}</strong>
              </div>
              <p className="small" style={{ margin: 0, lineHeight: 1.4, color: "var(--text-2)" }}>
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <div className="card-head" style={{ marginBottom: 10 }}>
          <div className="card-title" style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Brain size={14} /> Técnicas com protótipo visual
          </div>
          <span className="mono small">5 TÉCNICAS</span>
        </div>

        <div
          className="methodology-models-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}
        >
          {prototypeTechniques.map((tech) => {
            const theme = routeTheme[tech.route];
            return (
              <div
                key={tech.name}
                className="model-card"
                style={{
                  padding: 14,
                  borderColor: theme.border,
                  background: `linear-gradient(180deg, ${theme.bg}, oklch(1 0 0 / 0.015))`,
                }}
              >
                <div className="row" style={{ justifyContent: "space-between", marginBottom: 10 }}>
                  <div className="row" style={{ gap: 7, color: theme.color }}>
                    {tech.icon}
                    <strong style={{ fontSize: 13.5, color: "var(--text)" }}>{tech.name}</strong>
                  </div>
                  <span className="chip" style={{ padding: "2px 7px", fontSize: 9.5 }}>
                    {theme.chip}
                  </span>
                </div>
                <p className="small" style={{ margin: "0 0 12px 0", color: "var(--text-2)", lineHeight: 1.45 }}>
                  {tech.body}
                </p>
                <button
                  onClick={() => go(tech.route)}
                  className="btn btn-sm btn-ghost"
                  style={{
                    marginTop: "auto",
                    alignSelf: "flex-start",
                    borderColor: theme.border,
                    color: theme.color,
                    background: theme.bg,
                    fontSize: 11.5,
                    gap: 6,
                  }}
                >
                  {tech.cta}
                  <ArrowRight size={11} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <div className="card-head" style={{ marginBottom: 10 }}>
          <div className="card-title" style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Cpu size={14} /> Apoios metodológicos e arquitetura futura
          </div>
          <span className="mono small">2 REFERÊNCIAS</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 10 }}>
          {supportTechniques.map((tech) => (
            <div
              key={tech.name}
              style={{
                border: "1px solid var(--border-soft)",
                borderRadius: 10,
                padding: 12,
                background: "oklch(1 0 0 / 0.015)",
              }}
            >
              <div className="row" style={{ justifyContent: "space-between", marginBottom: 8 }}>
                <div className="row" style={{ gap: 7, color: "var(--aqua)" }}>
                  {tech.icon}
                  <strong style={{ fontSize: 13.5, color: "var(--text)" }}>{tech.name}</strong>
                </div>
                <span className="chip" style={{ padding: "2px 7px", fontSize: 9.5 }}>
                  {tech.label}
                </span>
              </div>
              <p className="small" style={{ margin: 0, color: "var(--text-2)", lineHeight: 1.45 }}>
                {tech.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <div className="card-head" style={{ marginBottom: 6 }}>
          <div className="card-title" style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Activity size={14} /> Métricas conceituais de avaliação
          </div>
          <span className="mono small">REFERÊNCIA METODOLÓGICA</span>
        </div>
        <p className="small" style={{ margin: "0 0 10px", lineHeight: 1.45, color: "var(--muted)" }}>
          As métricas abaixo são referências metodológicas para bases validadas e, no HidroIA, aparecem como explicação conceitual.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 10,
          }}
        >
          {metrics.map((metric) => (
            <div
              key={metric.name}
              style={{
                border: "1px solid var(--border-soft)",
                borderRadius: 9,
                padding: 10,
                background: "oklch(1 0 0 / 0.015)",
              }}
            >
              <div className="row" style={{ gap: 6, color: "var(--cyan)", marginBottom: 6 }}>
                {metric.icon}
                <strong style={{ fontSize: 13 }}>{metric.name}</strong>
              </div>
              <p className="small" style={{ margin: 0, lineHeight: 1.45, color: "var(--text-2)" }}>
                {metric.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
