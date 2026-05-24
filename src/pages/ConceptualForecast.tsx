import React from "react";
import { PageHeader } from "../components/ui/PageHeader";
import { motion } from "framer-motion";
import {
  Database,
  RefreshCw,
  Cpu,
  Layers,
  TrendingUp,
  Brain,
  GitBranch,
  AlertTriangle,
  Activity,
  CheckCircle,
  HelpCircle
} from "lucide-react";

interface ConceptualForecastProps {
  go: (k: string) => void;
}

export const ConceptualForecast: React.FC<ConceptualForecastProps> = ({ go }) => {
  const steps = [
    {
      num: "01",
      title: "Base simulada",
      ico: <Database size={16} />,
      desc: "Leituras mockadas de chuva, nível e vazão organizadas por estação, região, rio e bacia."
    },
    {
      num: "02",
      title: "Qualidade dos dados",
      ico: <RefreshCw size={16} />,
      desc: "Identificação conceitual de ruídos, falhas simuladas de sensores e valores fora do padrão esperado."
    },
    {
      num: "03",
      title: "Redução de variáveis",
      ico: <Cpu size={16} />,
      desc: "Uso didático de PCA para compactar informações redundantes e facilitar a leitura dos dados."
    },
    {
      num: "04",
      title: "Padrões de comportamento",
      ico: <Layers size={16} />,
      desc: "Visualização de agrupamentos e transições entre estiagem, normalidade, atenção e eventos extremos simulados."
    },
    {
      num: "05",
      title: "Regressão conceitual",
      ico: <TrendingUp size={16} />,
      desc: "Representação acadêmica de como modelos como XGBoost e SVR poderiam estimar tendências hidrológicas futuras."
    }
  ];

  const models = [
    {
      title: "Autoencoders",
      category: "DETECÇÃO DE ANOMALIAS",
      desc: "Redes neurais que aprendem a reconstruir padrões considerados normais. No HidroIA, aparecem como possibilidade conceitual para sinalizar leituras simuladas com alto erro de reconstrução.",
      chips: ["Padrões complexos", "Análise multivariada", "Ruído simulado"],
      limitation: "Exigiriam maior volume de dados, ajuste cuidadoso e validação para não confundir evento extremo com falha de leitura."
    },
    {
      title: "PCA (Principal Component Analysis)",
      category: "REDUÇÃO DE DIMENSÕES",
      desc: "Método estatístico que resume muitas variáveis em poucos componentes principais. É usado de forma didática para explicar como dados redundantes poderiam ser compactados.",
      chips: ["Simplicidade", "Velocidade", "Visualização"],
      limitation: "Pode perder parte da interpretação direta das variáveis originais ao transformar os dados em componentes."
    },
    {
      title: "t-SNE / UMAP",
      category: "VISUALIZAÇÃO EXPLORATÓRIA",
      desc: "Técnicas de projeção visual que ajudam a representar dados complexos em gráficos de duas ou três dimensões, revelando grupos e transições de comportamento.",
      chips: ["Padrões ocultos", "Exploração visual", "Separação de grupos"],
      limitation: "Demandam processamento e devem ser interpretadas como apoio visual, não como previsão operacional."
    },
    {
      title: "XGBoost Regressor",
      category: "REGRESSÃO CONCEITUAL",
      desc: "Modelo supervisionado baseado em árvores de decisão sequenciais. Em uma versão futura, poderia estimar tendências do nível dos rios a partir de histórico de chuva, vazão e leituras anteriores.",
      chips: ["Alto desempenho", "Dados tabulares", "Importância das variáveis"],
      limitation: "Dependeria de base histórica validada e poderia ter dificuldade diante de eventos muito diferentes dos exemplos de treino."
    },
    {
      title: "SVR (Support Vector Regression)",
      category: "REGRESSÃO CONCEITUAL",
      desc: "Técnica de regressão que busca uma tendência estável dentro de uma margem de erro. No projeto, aparece como alternativa conceitual para suavizar ruídos e estimar tendências.",
      chips: ["Estabilidade", "Margem de erro", "Resistência a ruídos"],
      limitation: "Pode ficar lento em grandes volumes de dados sem tratamento prévio ou redução de dimensionalidade."
    }
  ];

  const metrics = [
    {
      title: "F1-Score",
      desc: "Métrica explicativa para avaliar equilíbrio entre precisão e revocação em cenários futuros com dados rotulados."
    },
    {
      title: "Silhouette Score",
      desc: "Indicador didático para medir o quanto os grupos formados por K-Means estão separados e consistentes."
    },
    {
      title: "Erro de magnitude do pico",
      desc: "Conceito usado para comparar a diferença entre um pico previsto e um pico observado em estudos hidrológicos."
    },
    {
      title: "Erro de tempo do pico",
      desc: "Representa a diferença entre o momento estimado e o momento observado de um pico hidrológico."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="page"
    >
      {/* 1. Header with page details */}
      <PageHeader
        category="PREVISÃO CONCEITUAL"
        title="Análise de tendências hidrológicas com IA demonstrativa."
      />

      {/* Hero Layout in 2 Columns */}
      <div className="forecast-hero-grid" style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <p className="page-sub" style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "var(--text-2)", maxWidth: "100%" }}>
            Esta página apresenta uma arquitetura acadêmica para demonstrar como dados hidrometeorológicos simulados poderiam passar por limpeza, compactação, análise de padrões e regressão conceitual para estimar tendências futuras do nível dos rios.
          </p>
        </div>
        
        <div className="forecast-side-card" style={{ borderLeft: "3px solid var(--cyan)", minHeight: "100px" }}>
          <div className="row" style={{ gap: 6, marginBottom: 8, color: "var(--cyan)" }}>
            <CheckCircle size={15} />
            <span className="mono" style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.08em" }}>ESCOPO ACADÊMICO</span>
          </div>
          <p className="small" style={{ margin: 0, lineHeight: 1.45, color: "var(--text)", fontWeight: 500 }}>
            As previsões, scores e cenários exibidos no HidroIA são simulados. Eles não representam alertas oficiais, medições em tempo real ou uso operacional.
          </p>
        </div>
      </div>

      <div className="forecast-layout">
        
        {/* 2. Pipeline section (Full-width) */}
        <div className="card">
          <div className="card-head">
            <div className="card-title" style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <GitBranch size={15} style={{ color: "var(--cyan)" }} />
              <span>Fluxo Metodológico Conceitual (Pipeline)</span>
            </div>
            <span className="mono small">5 ETAPAS DIDÁTICAS</span>
          </div>
          
          <div className="conceptual-pipeline-grid">
            {steps.map((step, idx) => (
              <div key={idx} className="pipeline-card">
                <div className="pipeline-index">{step.num}</div>
                <div className="row" style={{ gap: 8, color: "var(--cyan)", marginBottom: 10 }}>
                  {step.ico}
                  <strong style={{ fontSize: 13, color: "var(--text)" }}>{step.title}</strong>
                </div>
                <p className="small" style={{ lineHeight: 1.45, margin: 0, fontSize: 11.5 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Models and Techniques section (Full-width) */}
        <div>
          <div className="row" style={{ gap: 8, marginBottom: 12 }}>
            <Brain size={16} style={{ color: "var(--cyan)" }} />
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>Técnicas e Modelos Didáticos Analisados</h3>
          </div>
          
          <div className="forecast-model-grid">
            {models.map((model, idx) => (
              <div key={idx} className="model-card">
                <div className="model-card-header">
                  <span className="mono" style={{ fontSize: 9, color: "var(--cyan)", letterSpacing: "0.05em" }}>
                    {model.category}
                  </span>
                  <h4 style={{ margin: "2px 0 0", fontSize: 14, fontWeight: 600, color: "var(--text)" }}>
                    {model.title}
                  </h4>
                </div>
                
                <p className="small" style={{ lineHeight: 1.45, color: "var(--text-2)", marginBottom: 12, flexGrow: 1 }}>
                  {model.desc}
                </p>
                
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
                  {model.chips.map((chip, cIdx) => (
                    <span key={cIdx} className="chip" style={{ padding: "2px 6px", fontSize: 10, cursor: "default" }}>
                      {chip}
                    </span>
                  ))}
                </div>
                
                <div className="model-limitation">
                  <div className="row" style={{ gap: 4, color: "var(--risk-high)", marginBottom: 2 }}>
                    <AlertTriangle size={10} />
                    <strong style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.02em" }}>Limitação Conceitual:</strong>
                  </div>
                  <p className="small" style={{ margin: 0, fontSize: 10.5, lineHeight: 1.35, color: "var(--text-2)" }}>
                    {model.limitation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. How to Interpret This Screen section (Full-width, 3 cards side by side) */}
        <div className="card">
          <div className="card-head" style={{ marginBottom: 10 }}>
            <div className="card-title" style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <HelpCircle size={15} style={{ color: "var(--cyan)" }} />
              <span>Como interpretar esta tela?</span>
            </div>
            <span className="mono small">SEGURANÇA E ACADEMIA</span>
          </div>
          
          <p className="small" style={{ margin: "0 0 16px 0", color: "var(--text-2)", lineHeight: 1.5 }}>
            A previsão conceitual não executa um modelo real em produção. Ela apresenta uma proposta metodológica para explicar como uma versão futura do HidroIA poderia combinar tratamento de dados, análise exploratória e regressão.
          </p>

          <div className="interpretation-grid">
            <div style={{ padding: 12, borderRadius: 8, background: "oklch(1 0 0 / 0.015)", border: "1px solid var(--border-soft)" }}>
              <strong style={{ fontSize: 12, display: "block", color: "var(--text)", marginBottom: 4 }}>
                Não é alerta oficial.
              </strong>
              <span className="small" style={{ display: "block", lineHeight: 1.4, color: "var(--text-2)" }}>
                A página serve para apresentação acadêmica, prototipação e explicação técnica.
              </span>
            </div>
            
            <div style={{ padding: 12, borderRadius: 8, background: "oklch(1 0 0 / 0.015)", border: "1px solid var(--border-soft)" }}>
              <strong style={{ fontSize: 12, display: "block", color: "var(--text)", marginBottom: 4 }}>
                Não é tempo real.
              </strong>
              <span className="small" style={{ display: "block", lineHeight: 1.4, color: "var(--text-2)" }}>
                A base utilizada é mockada e representa cenários hidrológicos simulados.
              </span>
            </div>
            
            <div style={{ padding: 12, borderRadius: 8, background: "oklch(1 0 0 / 0.015)", border: "1px solid var(--border-soft)" }}>
              <strong style={{ fontSize: 12, display: "block", color: "var(--text)", marginBottom: 4 }}>
                Não substitui especialistas.
              </strong>
              <span className="small" style={{ display: "block", lineHeight: 1.4, color: "var(--text-2)" }}>
                A interpretação operacional dependeria de validação técnica, dados reais confiáveis e órgãos competentes.
              </span>
            </div>
          </div>

          <div className="safe-note" style={{ marginTop: 16 }}>
            <span style={{ color: "var(--cyan)", fontWeight: 600, marginRight: 16 }}>DADOS SIMULADOS</span>
            <span style={{ color: "var(--risk-high)", fontWeight: 600 }}>SEM USO OPERACIONAL</span>
          </div>
        </div>

        {/* 5. Metrics section (Full-width) */}
        <div className="card">
          <div className="card-head">
            <div className="card-title" style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Activity size={15} style={{ color: "var(--cyan)" }} />
              <span>Métricas Conceituais de Avaliação</span>
            </div>
            <span className="mono small">PROPOSTA METODOLÓGICA</span>
          </div>
          
          <p className="small" style={{ margin: "0 0 16px 0", color: "var(--muted)", lineHeight: 1.45 }}>
            As métricas abaixo são apresentadas como referência metodológica. No protótipo atual, elas não representam validação operacional real.
          </p>
          
          <div className="metrics-grid">
            {metrics.map((metric, idx) => (
              <div key={idx} className="metric-card">
                <h4 style={{ margin: "0 0 6px 0", fontSize: 13, fontWeight: 600, color: "var(--cyan)" }}>
                  {metric.title}
                </h4>
                <p className="small" style={{ margin: 0, lineHeight: 1.4, fontSize: 11.5 }}>
                  {metric.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Action Bar at the end */}
        <div className="forecast-action-bar">
          <button 
            className="btn btn-sm interactive-action" 
            onClick={() => go("dashboard")}
            style={{ fontSize: 11, padding: "8px 16px" }}
          >
            Voltar ao Dashboard
          </button>
        </div>

      </div>
    </motion.div>
  );
};
