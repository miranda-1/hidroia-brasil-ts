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
      chips: ["Dados simulados", "Cenário-base", "Conceitual"],
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
          "IA Conceitual",
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
          <div className="card" style={{ padding: 20 }}>
            <div className="row" style={{ gap: 8, marginBottom: 12, justifyContent: "space-between", flexWrap: "wrap" }}>
              <div className="row" style={{ gap: 8, color: "var(--cyan)" }}>
                <LineChart size={18} />
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>Comparação conceitual de regressão</h3>
              </div>
              <span className="mono small" style={{ color: "var(--cyan)", opacity: 0.8 }}>ARQUITETURA FUTURA</span>
            </div>

            <p className="small" style={{ color: "var(--text-2)", lineHeight: 1.5, marginBottom: 16 }}>
              Esta visualização representa uma simulação didática de como modelos de regressão supervisionados poderiam estimar tendências futuras a partir de dados históricos tabulares simulados em uma arquitetura futura de IA.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 20, alignItems: "stretch" }} className="forecast-hero-grid">
              {/* Gráfico SVG de Tendência */}
              <div style={{
                background: "oklch(0.12 0.015 240)",
                border: "1px solid var(--border-soft)",
                borderRadius: 10,
                padding: 16,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, flexWrap: "wrap", gap: 6 }}>
                    <span className="mono small" style={{ fontSize: 9.5 }}>Simulação temporal do nível do rio</span>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 9.5, display: "flex", alignItems: "center", gap: 4, color: "var(--text-2)" }}>
                        <span style={{ width: 8, height: 2, background: "var(--muted)", display: "inline-block" }} /> Série observada simulada
                      </span>
                      <span style={{ fontSize: 9.5, display: "flex", alignItems: "center", gap: 4, color: "var(--cyan)" }}>
                        <span style={{ width: 8, height: 2, background: "var(--cyan)", display: "inline-block", borderBottom: "1px dashed var(--cyan)" }} /> XGBoost
                      </span>
                      <span style={{ fontSize: 9.5, display: "flex", alignItems: "center", gap: 4, color: "var(--aqua)" }}>
                        <span style={{ width: 8, height: 2, background: "var(--aqua)", display: "inline-block", borderBottom: "1px dotted var(--aqua)" }} /> SVR
                      </span>
                    </div>
                  </div>
                  
                  {/* SVG do Gráfico */}
                  <svg viewBox="0 0 400 180" width="100%" height="220" style={{ display: "block" }}>
                    {/* Grid lines */}
                    <line x1="20" x2="390" y1="30" y2="30" stroke="oklch(1 0 0 / 0.04)" />
                    <line x1="20" x2="390" y1="80" y2="80" stroke="oklch(1 0 0 / 0.04)" />
                    <line x1="20" x2="390" y1="130" y2="130" stroke="oklch(1 0 0 / 0.04)" />
                    <line x1="20" x2="20" y1="10" y2="160" stroke="oklch(1 0 0 / 0.08)" />
                    <line x1="20" x2="390" y1="160" y2="160" stroke="oklch(1 0 0 / 0.08)" />

                    {/* Curva Observada Simulada */}
                    <path
                      d="M 20 150 C 90 145, 120 40, 180 40 C 240 40, 280 120, 350 125 C 370 126, 380 135, 390 140"
                      fill="none"
                      stroke="var(--muted)"
                      strokeWidth="2"
                      opacity="0.7"
                    />
                    
                    {/* Curva Projeção XGBoost (Dashed, com delay) */}
                    <path
                      d="M 20 150 C 92 147, 122 45, 210 45 C 260 45, 290 118, 350 123 C 370 124, 380 134, 390 138"
                      fill="none"
                      stroke="var(--cyan)"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />

                    {/* Curva Projeção SVR (Dotted, mais suave) */}
                    <path
                      d="M 20 150 C 85 138, 115 50, 160 50 C 220 50, 270 125, 350 128 C 370 129, 380 137, 390 140"
                      fill="none"
                      stroke="var(--aqua)"
                      strokeWidth="2"
                      strokeDasharray="1.5 2.5"
                    />

                    {/* Destaque do Pico */}
                    <circle cx="180" cy="40" r="3.5" fill="var(--risk-crit)" />
                    <text x="180" y="32" fill="var(--text)" fontSize="8" textAnchor="middle" fontFamily="var(--font-mono)">Pico máximo</text>

                    {/* Rótulos de tempo */}
                    <text x="20" y="172" fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)">t=0h</text>
                    <text x="180" y="172" fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">t=12h (Pico)</text>
                    <text x="390" y="172" fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="end">t=24h</text>
                    
                    {/* Rótulos de nível */}
                    <text x="14" y="33" fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="end">6.0m</text>
                    <text x="14" y="83" fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="end">3.0m</text>
                    <text x="14" y="133" fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="end">1.0m</text>
                  </svg>
                </div>

                <div style={{
                  marginTop: 10,
                  padding: "8px 12px",
                  borderRadius: 6,
                  background: "oklch(0.74 0.18 52 / 0.04)",
                  border: "1px solid oklch(0.74 0.18 52 / 0.10)"
                }}>
                  <p className="small" style={{ margin: 0, fontSize: 10.5, color: "var(--muted)", fontStyle: "italic", lineHeight: 1.45 }}>
                    As curvas representam uma projeção didática de como modelos de regressão poderiam estimar tendências em uma arquitetura futura.
                  </p>
                </div>
              </div>

              {/* Informações e Métricas dos Modelos */}
              <div className="col" style={{ gap: 12, justifyContent: "space-between" }}>
                <div className="col" style={{ gap: 10 }}>
                  {/* XGBoost Card */}
                  <div style={{
                    padding: 12,
                    borderRadius: 10,
                    border: "1px solid var(--border-soft)",
                    background: "oklch(1 0 0 / 0.015)"
                  }}>
                    <div className="row" style={{ gap: 6, color: "var(--cyan)", marginBottom: 4 }}>
                      <Gauge size={14} />
                      <strong style={{ fontSize: 13, color: "var(--text)" }}>XGBoost Regressor</strong>
                    </div>
                    <p className="small" style={{ margin: 0, fontSize: 11.5, lineHeight: 1.4, color: "var(--text-2)" }}>
                      Modelo supervisionado baseado em árvores de decisão em conjunto (ensemble). Estima a tendência de elevação a partir de cenários tabulares simulados de chuva e vazão.
                    </p>
                    <div style={{ display: "flex", gap: 14, marginTop: 8, borderTop: "1px dashed var(--border-soft)", paddingTop: 6 }}>
                      <div>
                        <span className="small text-3" style={{ fontSize: 9.5 }}>Erro de magnitude do pico:</span>
                        <div className="mono" style={{ fontSize: 11.5, color: "var(--risk-low)", fontWeight: 600 }}>-5.2%</div>
                      </div>
                      <div>
                        <span className="small text-3" style={{ fontSize: 9.5 }}>Erro de tempo do pico:</span>
                        <div className="mono" style={{ fontSize: 11.5, color: "var(--cyan)", fontWeight: 600 }}>+2h</div>
                      </div>
                    </div>
                  </div>

                  {/* SVR Card */}
                  <div style={{
                    padding: 12,
                    borderRadius: 10,
                    border: "1px solid var(--border-soft)",
                    background: "oklch(1 0 0 / 0.015)"
                  }}>
                    <div className="row" style={{ gap: 6, color: "var(--aqua)", marginBottom: 4 }}>
                      <LineChart size={14} />
                      <strong style={{ fontSize: 13, color: "var(--text)" }}>SVR (Support Vector Regressor)</strong>
                    </div>
                    <p className="small" style={{ margin: 0, fontSize: 11.5, lineHeight: 1.4, color: "var(--text-2)" }}>
                      Regressão por vetores de suporte robusta a ruídos. Busca estabelecer uma tendência contínua e suave, minimizando desvios com margens de erro toleradas.
                    </p>
                    <div style={{ display: "flex", gap: 14, marginTop: 8, borderTop: "1px dashed var(--border-soft)", paddingTop: 6 }}>
                      <div>
                        <span className="small text-3" style={{ fontSize: 9.5 }}>Erro de magnitude do pico:</span>
                        <div className="mono" style={{ fontSize: 11.5, color: "var(--risk-med)", fontWeight: 600 }}>+8.4%</div>
                      </div>
                      <div>
                        <span className="small text-3" style={{ fontSize: 9.5 }}>Erro de tempo do pico:</span>
                        <div className="mono" style={{ fontSize: 11.5, color: "var(--aqua)", fontWeight: 600 }}>+4h</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notas didáticas */}
                <div style={{
                  padding: 10,
                  borderRadius: 8,
                  background: "oklch(1 0 0 / 0.01)",
                  border: "1px dashed var(--border-soft)"
                }}>
                  <div className="small" style={{ fontWeight: 600, color: "var(--text-2)", marginBottom: 4 }}>Métricas de avaliação na regressão:</div>
                  <ul className="small" style={{ margin: 0, paddingLeft: 16, color: "var(--muted)", lineHeight: 1.4, fontSize: 11 }}>
                    <li><strong>Erro de magnitude do pico:</strong> Diferença percentual na estimativa da altura máxima do rio.</li>
                    <li><strong>Erro de tempo do pico:</strong> Diferença em horas no momento de ocorrência do pico máximo.</li>
                  </ul>
                </div>
              </div>
            </div>
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
