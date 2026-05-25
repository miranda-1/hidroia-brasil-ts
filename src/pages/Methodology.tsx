import React from "react";
import { PageHeader } from "../components/ui/PageHeader";
import {
  Database,
  RefreshCw,
  AlertTriangle,
  Cpu,
  Layers,
  TrendingUp,
  Activity,
  Shield,
  Brain,
  GitBranch,
  Radar,
  Network,
  Gauge,
  LineChart,
  Zap,
  CheckCircle,
  FlaskConical
} from "lucide-react";

export const Methodology: React.FC = () => {
  const pipeline = [
    {
      num: "01",
      title: "Base simulada",
      ico: <Database size={16} />,
      status: "demonstrado",
      body:
        "Organiza estações hidrometeorológicas mockadas com chuva, nível, vazão, score e qualidade dos dados em um cenário-base acadêmico.",
    },
    {
      num: "02",
      title: "Tratamento e normalização",
      ico: <RefreshCw size={16} />,
      status: "demonstrado",
      body:
        "Aplica limpeza conceitual, preenchimento didático de lacunas e padronização para tornar as variáveis comparáveis entre regiões simuladas.",
    },
    {
      num: "03",
      title: "Detecção conceitual de anomalias",
      ico: <AlertTriangle size={16} />,
      status: "demonstrado",
      body:
        "Utiliza Isolation Forest conceitual para sinalizar leituras atípicas simuladas, incluindo ruídos e possíveis falhas de sensor.",
    },
    {
      num: "04",
      title: "Redução de dimensionalidade",
      ico: <Cpu size={16} />,
      status: "demonstrado",
      body:
        "Emprega PCA de forma didática para compactar variáveis redundantes e apoiar visualizações e etapas de agrupamento.",
    },
    {
      num: "05",
      title: "Agrupamento de padrões",
      ico: <Layers size={16} />,
      status: "demonstrado",
      body:
        "Executa K-Means para representar padrões simulados como estiagem, normalidade, atenção e cenário crítico simulado.",
    },
    {
      num: "06",
      title: "Previsão conceitual",
      ico: <TrendingUp size={16} />,
      status: "arquitetura futura",
      body:
        "Apresenta, em arquitetura futura, regressão com XGBoost e SVR para estimar tendências hidrológicas didáticas de cenários de cheia simulada.",
    },
    {
      num: "07",
      title: "Métricas de avaliação",
      ico: <Activity size={16} />,
      status: "conceitual",
      body:
        "Explica métricas de classificação, agrupamento e previsão como referência metodológica, sem validação operacional no protótipo.",
    },
    {
      num: "08",
      title: "Limitações do Escopo",
      ico: <Shield size={16} />,
      status: "demonstrado",
      body:
        "Demonstra que o fluxo opera sob uma base simulada de cenários pré-configurados, sem coleta em tempo real e sem uso operacional.",
    },
  ];

  const demonstratedTechniques = [
    {
      name: "Isolation Forest",
      icon: <AlertTriangle size={14} />,
      desc: "Identifica leituras atípicas a partir do isolamento de pontos incomuns no espaço de variáveis simuladas.",
      limitation: "O score é conceitual e depende da qualidade da base usada para comparação.",
      chips: ["Demonstrado", "Anomalias", "Score conceitual"]
    },
    {
      name: "K-Means",
      icon: <Layers size={14} />,
      desc: "Agrupa leituras com comportamento semelhante, apoiando a leitura de perfis hidrológicos simulados.",
      limitation: "Exige definição prévia do número de grupos e pode simplificar padrões complexos.",
      chips: ["Demonstrado", "Agrupamento", "Perfis"]
    },
    {
      name: "PCA",
      icon: <Cpu size={14} />,
      desc: "Reduz variáveis para componentes principais, facilitando visualização e interpretação de agrupamentos.",
      limitation: "Pode reduzir a interpretação direta das variáveis originais.",
      chips: ["Demonstrado", "Redução dimensional", "Visualização"]
    }
  ];

  const futureArchitecture = [
    {
      name: "DBSCAN",
      icon: <Radar size={14} />,
      desc: "Agrupa por densidade e identifica regiões densas e ruídos/outliers, sendo útil conceitualmente para episódios atípicos.",
      limitation: "Exige calibração fina de parâmetros e pode sofrer com densidade variável.",
      chips: ["Arquitetura futura", "Densidade", "Ruído"]
    },
    {
      name: "Hierarchical Clustering",
      icon: <Network size={14} />,
      desc: "Constrói uma árvore de proximidade, chamada dendrograma, que pode apoiar análise exploratória de relações entre períodos ou regiões simuladas.",
      limitation: "Tem custo computacional maior em séries históricas amplas.",
      chips: ["Arquitetura futura", "Dendrograma", "Exploratória"]
    },
    {
      name: "Autoencoders",
      icon: <Brain size={14} />,
      desc: "Podem ser utilizados como técnica não supervisionada ou auto-supervisionada, aprendendo a reconstruir a própria entrada por codificador, representação compactada e decodificador.",
      limitation: "Em uma arquitetura futura, poderiam apoiar anomalias por erro de reconstrução, mas exigem validação cuidadosa para não confundir evento extremo com falha de leitura.",
      chips: ["Arquitetura futura", "Erro de reconstrução", "Rede neural"]
    },
    {
      name: "t-SNE / UMAP",
      icon: <GitBranch size={14} />,
      desc: "Reduzem dados de alta dimensão para visualizações 2D/3D, ajudando a revelar padrões visuais em análise exploratória.",
      limitation: "Demandam processamento e ajuste cuidadoso de hiperparâmetros.",
      chips: ["Arquitetura futura", "2D/3D", "Exploração visual"]
    },
    {
      name: "XGBoost Regressor",
      icon: <Gauge size={14} />,
      desc: "Modelo supervisionado baseado em árvores de decisão em conjunto, podendo estimar tendências futuras em dados tabulares históricos.",
      limitation: "Depende de base de treino validada e pode ter dificuldade em extrapolar eventos nunca vistos.",
      chips: ["Arquitetura futura", "Regressão", "Importância de variáveis"]
    },
    {
      name: "SVR",
      icon: <LineChart size={14} />,
      desc: "Regressão por vetores de suporte que busca uma tendência dentro de uma margem de erro, podendo ser estável em cenários com ruído tratado.",
      limitation: "Pode ficar lenta com grandes volumes sem pré-processamento.",
      chips: ["Arquitetura futura", "Regressão", "Margem de erro"]
    }
  ];

  const metrics = [
    {
      name: "F1-Score",
      icon: <CheckCircle size={14} />,
      body:
        "Em uma base validada, poderia medir o equilíbrio entre acertos e falsos positivos na identificação de anomalias.",
    },
    {
      name: "Silhouette Score",
      icon: <Layers size={14} />,
      body:
        "No contexto acadêmico, ajuda a explicar se os agrupamentos simulados ficaram bem separados e consistentes.",
    },
    {
      name: "Erro de magnitude do pico",
      icon: <Zap size={14} />,
      body:
        "Métrica conceitual para comparar diferença entre pico previsto e pico observado em uma base validada.",
    },
    {
      name: "Erro de tempo do pico",
      icon: <TrendingUp size={14} />,
      body:
        "Métrica conceitual para avaliar a diferença entre o momento previsto e o momento observado de um pico hidrológico.",
    },
  ];

  return (
    <div className="page">
      <PageHeader
        category="METODOLOGIA DE IA"
        title="Pipeline conceitual para previsão didática de cenários de cheia"
        subtitle="Metodologia conceitual do HidroIA para base simulada, anomalias, agrupamento de padrões e previsão didática de tendências hidrológicas em contexto acadêmico."
      />

      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-eyebrow">AVISO ACADÊMICO</div>
        <div style={{ fontSize: 17, fontWeight: 600, marginTop: 4, color: "var(--cyan)" }}>
          Escopo metodológico conceitual e simulado
        </div>
        <p className="small" style={{ marginTop: 10, lineHeight: 1.55, color: "var(--text-2)" }}>
          O HidroIA é uma plataforma ambiental conceitual que utiliza uma base simulada de estações hidrometeorológicas, inspirada em estruturas ANA/HIDRO, para demonstrar visualização de dados, detecção de anomalias, agrupamento de padrões e previsão didática de tendências hidrológicas com apoio de técnicas de Inteligência Artificial.
        </p>
        <p className="small" style={{ marginTop: 8, lineHeight: 1.55, color: "var(--text-2)" }}>
          Todos os dados, scores, cenários e previsões apresentados são simulados e possuem finalidade acadêmica, sem integração oficial, sem coleta em tempo real e sem uso operacional.
        </p>
      </div>

      <div className="card">
        <div className="card-head" style={{ marginBottom: 12 }}>
          <div className="card-title" style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <GitBranch size={14} /> Pipeline metodológico conceitual
          </div>
          <span className="mono small">8 ETAPAS</span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(185px, 1fr))",
            gap: 10,
          }}
        >
          {pipeline.map((step) => (
            <div
              key={step.num}
              style={{
                border: "1px solid var(--border-soft)",
                borderRadius: 10,
                padding: 12,
                background: "oklch(1 0 0 / 0.02)",
              }}
            >
              <div className="row" style={{ justifyContent: "space-between", marginBottom: 8 }}>
                <span className="mono" style={{ fontSize: 10, color: "var(--muted)" }}>
                  ETAPA {step.num}
                </span>
                <span className="chip" style={{ padding: "2px 7px", fontSize: 10 }}>
                  {step.status}
                </span>
              </div>
              <div className="row" style={{ gap: 7, color: "var(--cyan)", marginBottom: 7 }}>
                {step.ico}
                <strong style={{ fontSize: 13, color: "var(--text)" }}>{step.title}</strong>
              </div>
              <p className="small" style={{ margin: 0, lineHeight: 1.45, color: "var(--text-2)" }}>
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ padding: 24, marginTop: 16 }}>
        <div style={{ marginBottom: 20 }}>
          <div className="row" style={{ gap: 8, color: "var(--cyan)", marginBottom: 4 }}>
            <Brain size={18} />
            <h3 style={{ margin: 0, fontSize: 19, fontWeight: 600 }}>Arquitetura conceitual de IA</h3>
          </div>
          <p className="small" style={{ margin: 0, lineHeight: 1.5, color: "var(--text-2)", fontSize: 13 }}>
            O HidroIA organiza técnicas demonstradas no protótipo e possibilidades metodológicas futuras para análise de padrões, anomalias e tendências em cenários hidrometeorológicos simulados.
          </p>
        </div>

        {/* Grupo 1 — Técnicas demonstradas */}
        <div style={{ marginBottom: 32 }}>
          <div className="row" style={{ justifyContent: "space-between", alignItems: "center", marginBottom: 14, borderBottom: "1px solid var(--border-soft)", paddingBottom: 8 }}>
            <div className="row" style={{ gap: 6, color: "var(--cyan)" }}>
              <FlaskConical size={14} />
              <strong style={{ fontSize: 14, color: "var(--text)" }}>Técnicas demonstradas no protótipo</strong>
            </div>
            <span className="mono small" style={{ fontSize: 10, color: "var(--cyan)", opacity: 0.85 }}>Foco Didático Atual</span>
          </div>

          <div
            className="methodology-models-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 14,
            }}
          >
            {demonstratedTechniques.map((tech) => (
              <div
                key={tech.name}
                className="model-card"
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div className="row" style={{ gap: 6, marginBottom: 8, color: "var(--cyan)" }}>
                    {tech.icon}
                    <strong style={{ fontSize: 13.5, color: "var(--text)" }}>{tech.name}</strong>
                  </div>
                  <p className="small" style={{ margin: "0 0 12px 0", color: "var(--text-2)", lineHeight: 1.45 }}>
                    {tech.desc}
                  </p>
                </div>
                <div>
                  <div className="model-limitation" style={{ marginBottom: 12 }}>
                    <p className="small" style={{ margin: 0, color: "var(--muted)", lineHeight: 1.4, fontSize: 11 }}>
                      <strong style={{ color: "var(--text-2)" }}>Limitação:</strong> {tech.limitation}
                    </p>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {tech.chips.map((chip) => (
                      <span key={chip} className="chip" style={{ padding: "2px 7px", fontSize: 10 }}>
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Grupo 2 — Possibilidades metodológicas futuras */}
        <div>
          <div className="row" style={{ justifyContent: "space-between", alignItems: "center", marginBottom: 14, borderBottom: "1px solid var(--border-soft)", paddingBottom: 8 }}>
            <div className="row" style={{ gap: 6, color: "var(--aqua)" }}>
              <Brain size={14} />
              <strong style={{ fontSize: 14, color: "var(--text)" }}>Possibilidades metodológicas futuras</strong>
            </div>
            <span className="mono small" style={{ fontSize: 10, color: "var(--aqua)", opacity: 0.85 }}>Arquitetura de Expansão</span>
          </div>

          <div
            className="methodology-models-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 14,
            }}
          >
            {futureArchitecture.map((tech) => (
              <div
                key={tech.name}
                className="model-card"
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div className="row" style={{ gap: 6, marginBottom: 8, color: "var(--aqua)" }}>
                    {tech.icon}
                    <strong style={{ fontSize: 13.5, color: "var(--text)" }}>{tech.name}</strong>
                  </div>
                  <p className="small" style={{ margin: "0 0 12px 0", color: "var(--text-2)", lineHeight: 1.45 }}>
                    {tech.desc}
                  </p>
                </div>
                <div>
                  <div className="model-limitation" style={{ marginBottom: 12 }}>
                    <p className="small" style={{ margin: 0, color: "var(--muted)", lineHeight: 1.4, fontSize: 11 }}>
                      <strong style={{ color: "var(--text-2)" }}>Limitação:</strong> {tech.limitation}
                    </p>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {tech.chips.map((chip) => (
                      <span key={chip} className="chip" style={{ padding: "2px 7px", fontSize: 10 }}>
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <div className="card-head" style={{ marginBottom: 8 }}>
          <div className="card-title" style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Activity size={14} /> Métricas conceituais de avaliação
          </div>
          <span className="mono small">REFERÊNCIA METODOLÓGICA</span>
        </div>
        <p className="small" style={{ margin: "0 0 12px", lineHeight: 1.45, color: "var(--muted)" }}>
          As métricas abaixo são explicadas conceitualmente e não representam validação operacional no protótipo atual.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 10,
          }}
        >
          {metrics.map((metric) => (
            <div
              key={metric.name}
              style={{
                border: "1px solid var(--border-soft)",
                borderRadius: 9,
                padding: 12,
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
