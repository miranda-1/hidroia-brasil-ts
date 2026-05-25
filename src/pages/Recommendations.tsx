import React, { useState } from "react";
import { PageHeader } from "../components/ui/PageHeader";
import { StatusBadge } from "../components/ui/StatusBadge";
import { REGIONS, STATIONS } from "../data/stations";
import {
  AlertTriangle,
  Brain,
  Cpu,
  Database,
  Download,
  FileText,
  List,
  Map,
  Shield,
  TrendingUp
} from "lucide-react";

type RiskLevel = "low" | "med" | "high" | "crit" | "fail";

interface RecommendationScenario {
  risk: RiskLevel;
  title: string;
  event: string;
  interpretation: string;
  recommendation: string;
  focus: string;
  model: string;
}

const RECOMMENDATIONS: Record<string, RecommendationScenario> = {
  "Rio Taquari-Antas": {
    risk: "crit",
    title: "Cenário crítico simulado",
    event: "Elevação hidrológica em base mockada",
    interpretation: "A leitura simulada de Taquari apresenta score elevado e subida acentuada de nível no cenário-base. Em contexto acadêmico, esse padrão representa uma condição didática de maior atenção para comparação com históricos simulados.",
    recommendation: "Registrar o cenário como prioridade de análise acadêmica, comparar com leituras históricas mockadas e documentar a hipótese de comportamento extremo na base simulada.",
    focus: "Comparação temporal e leitura conceitual de score",
    model: "if-kmeans-v0.2-demo"
  },
  "Rio Madeira": {
    risk: "fail",
    title: "Cenário de inconsistência de sensor",
    event: "Inconsistência telemétrica simulada",
    interpretation: "A estação de Porto Velho registra vazão nula no mesmo cenário em que há chuva acumulada elevada. Para fins didáticos, esse contraste sugere possível ruído ou falha simulada de telemetria.",
    recommendation: "Registrar possível falha de leitura, comparar variáveis associadas e sinalizar o caso como inconsistência simulada para revisão conceitual.",
    focus: "Qualidade do dado e coerência entre variáveis",
    model: "if-kmeans-v0.2-demo"
  },
  "Rio São Francisco": {
    risk: "med",
    title: "Cenário de estiagem simulada",
    event: "Padrão de baixa vazão e chuva acumulada",
    interpretation: "O cenário do Rio São Francisco indica vazão reduzida e chuva acumulada baixa na bacia mockada. A leitura apoia uma hipótese conceitual de estiagem para discussão acadêmica.",
    recommendation: "Comparar o cenário-base com padrões históricos mockados e registrar hipótese conceitual de estiagem.",
    focus: "Padrão de baixa vazão e chuva acumulada",
    model: "if-kmeans-v0.2-demo"
  },
  "Rio Paraguai": {
    risk: "high",
    title: "Cenário de estiagem severa simulada",
    event: "Persistência de baixa disponibilidade hídrica",
    interpretation: "A estação Alto Paraguai aparece com nível baixo e score atípico na simulação. O caso serve para demonstrar como um sistema futuro poderia destacar padrões persistentes de seca em ambiente controlado.",
    recommendation: "Priorizar análise comparativa com histórico simulado, observando variação de nível, vazão e chuva acumulada.",
    focus: "Persistência de baixa disponibilidade hídrica",
    model: "if-kmeans-v0.2-demo"
  },
  "Capibaribe": {
    risk: "high",
    title: "Cenário de chuva acumulada simulada",
    event: "Acúmulo pluviométrico elevado",
    interpretation: "Recife é uma estação pluviométrica na base simulada, portanto a leitura deve priorizar chuva 24h, chuva 7d, score, risco conceitual e qualidade do dado, sem inferir nível ou vazão medidos diretamente.",
    recommendation: "Interpretar o volume de chuva acumulada como ponto de atenção didático e comparar com padrões simulados de precipitação.",
    focus: "Acúmulo pluviométrico elevado",
    model: "if-kmeans-v0.2-demo"
  },
  "Rio Doce": {
    risk: "med",
    title: "Cenário de atenção simulado",
    event: "Transição sazonal e leitura de tendência",
    interpretation: "O cenário do Rio Doce combina elevação gradual de nível e score intermediário. A leitura é útil para explicar transições entre normalidade e comportamento atípico em uma base acadêmica.",
    recommendation: "Registrar como cenário de transição e acompanhar a coerência entre variáveis simuladas no cenário-base.",
    focus: "Transição sazonal e leitura de tendência",
    model: "if-kmeans-v0.2-demo"
  },
  "Rio Parnaíba": {
    risk: "low",
    title: "Cenário estável simulado",
    event: "Referência comparativa de normalidade",
    interpretation: "Parnaíba é uma estação pluviométrica simulada com score baixo e chuva acumulada reduzida. O caso funciona como contraponto didático aos cenários de maior desvio.",
    recommendation: "Utilizar como referência comparativa para análise acadêmica de cenários mais atípicos.",
    focus: "Referência comparativa de normalidade",
    model: "if-kmeans-v0.2-demo"
  }
};

const INTERPRETATION_STEPS = [
  {
    title: "01 Verificar score simulado",
    desc: "Observar o índice de anomalia como marcador didático, sem interpretá-lo como medição real."
  },
  {
    title: "02 Comparar com histórico mockado",
    desc: "Relacionar chuva, nível ou vazão com padrões simulados anteriores da mesma bacia."
  },
  {
    title: "03 Identificar hipótese conceitual",
    desc: "Classificar o caso como padrão, transição, estiagem, chuva acumulada ou possível ruído."
  },
  {
    title: "04 Registrar interpretação acadêmica",
    desc: "Documentar a leitura para apresentação, discussão técnica e avaliação especializada."
  },
  {
    title: "05 Exportar simulação",
    desc: "Exportar as conclusões e planos como artefato conceitual de simulação."
  }
];

export const Recommendations: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>("Rio Taquari-Antas");

  const scenario = RECOMMENDATIONS[selectedRegion] || RECOMMENDATIONS["Rio Taquari-Antas"];
  const activeStation = STATIONS.find((station) => station.region === selectedRegion) || STATIONS[0];
  const scenarioRegions = REGIONS.filter((region) => region !== "Todas as regiões" && region in RECOMMENDATIONS);

  const stationMetrics = [
    { label: "Estação simulada", value: `${activeStation.name} (${activeStation.uf})` },
    { label: "Tipo de estação", value: activeStation.type },
    { label: "Score simulado", value: activeStation.anomalyScore.toFixed(2), accent: "var(--cyan)" },
    { label: "Qualidade do dado", value: activeStation.dataQuality },
    { label: "Chuva 24h", value: `${activeStation.rainfall24hMm} mm`, accent: "var(--aqua)" },
    { label: "Chuva 7d", value: `${activeStation.rainfall7dMm} mm`, accent: "var(--aqua)" },
    activeStation.type === "Fluviométrica" && activeStation.levelCm !== undefined
      ? { label: "Nível simulado", value: `${activeStation.levelCm} cm` }
      : null,
    activeStation.type === "Fluviométrica" && activeStation.flowM3s !== undefined
      ? { label: "Vazão simulada", value: `${activeStation.flowM3s.toLocaleString()} m³/s` }
      : null
  ].filter((item): item is { label: string; value: string; accent?: string } => Boolean(item));

  return (
    <div className="page">
      <PageHeader
        category="RECOMENDAÇÕES CONCEITUAIS"
        title="Recomendações Conceituais"
        subtitle="Sugestões didáticas baseadas em scores simulados para interpretar cenários hidrometeorológicos em contexto acadêmico."
        rightElement={
          <div className="row" style={{ gap: 10, flexWrap: "wrap", justifyContent: "flex-end" }}>
            <span className="chip" style={{ cursor: "default", color: "var(--cyan)", borderColor: "var(--cyan-soft)" }}>
              Dados simulados
            </span>
            <span className="chip" style={{ cursor: "default" }}>
              Cenário-base
            </span>
            <span className="chip" style={{ cursor: "default", color: "var(--risk-med)", borderColor: "oklch(0.74 0.18 52 / 0.25)" }}>
              Sem uso operacional
            </span>
          </div>
        }
      />

      {/* Escopo da Simulação Alert */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 16px",
        borderRadius: 8,
        background: "oklch(0.74 0.18 52 / 0.05)",
        border: "1px solid oklch(0.74 0.18 52 / 0.15)",
        marginBottom: 24,
        flexWrap: "wrap"
      }}>
        <div className="row" style={{ gap: 6, color: "var(--risk-med)", flexShrink: 0 }}>
          <Shield size={14} />
          <span className="mono" style={{ fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Escopo da simulação
          </span>
        </div>
        <div style={{ width: 1, height: 14, background: "var(--border-soft)", display: "none" }} className="toolbar-sep" />
        <p className="small" style={{ margin: 0, color: "var(--text-2)", fontSize: 11.5, lineHeight: 1.45 }}>
          As recomendações abaixo são interpretações conceituais geradas a partir de cenários simulados. Elas não emitem alertas oficiais, não acionam órgãos públicos e não substituem análise técnica especializada.
        </p>
      </div>

      {/* Etapas do Plano Demonstrativo */}
      <div style={{ marginBottom: 24 }}>
        <div className="row" style={{ gap: 8, marginBottom: 12 }}>
          <Cpu size={16} style={{ color: "var(--cyan)" }} />
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>Etapas do plano demonstrativo</h3>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 12 }}>
          {INTERPRETATION_STEPS.map((step, index) => (
            <div key={step.title} className="card" style={{ padding: 12, display: "flex", flexDirection: "column", height: "100%" }}>
              <div className="mono" style={{ fontSize: 16, fontWeight: 700, color: "var(--border)", marginBottom: 6 }}>
                {String(index + 1).padStart(2, "0")}
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 4 }}>
                {step.title.substring(3)}
              </div>
              <p className="small" style={{ margin: 0, lineHeight: 1.4, fontSize: 11, color: "var(--text-2)" }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Cenários de Resposta Simulados */}
      <div style={{ marginBottom: 24 }}>
        <div className="row" style={{ gap: 8, marginBottom: 12 }}>
          <TrendingUp size={16} style={{ color: "var(--cyan)" }} />
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>Cenários de resposta simulados</h3>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
          {scenarioRegions.map((region) => {
            const item = RECOMMENDATIONS[region];
            const active = region === selectedRegion;

            return (
              <button
                key={region}
                type="button"
                onClick={() => setSelectedRegion(region)}
                className="card interactive-action"
                style={{
                  padding: "12px 14px",
                  textAlign: "left",
                  borderColor: active ? `var(--risk-${item.risk})` : "var(--border-soft)",
                  background: active 
                    ? `linear-gradient(180deg, var(--risk-${item.risk}-bg), oklch(0.215 0.030 235 / 0.8))` 
                    : "oklch(0.215 0.030 235 / 0.65)",
                  boxShadow: active ? `0 0 12px var(--risk-${item.risk}-bg)` : "none",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  width: "100%"
                }}
              >
                <div className="row" style={{ justifyContent: "space-between", gap: 10, width: "100%" }}>
                  <span style={{
                    width: 26,
                    height: 26,
                    borderRadius: 6,
                    background: `var(--risk-${item.risk}-bg)`,
                    color: `var(--risk-${item.risk})`,
                    display: "grid",
                    placeItems: "center",
                    flexShrink: 0
                  }}>
                    {item.risk === "fail" ? <Shield size={13} /> : item.risk === "crit" ? <Map size={13} /> : <Brain size={13} />}
                  </span>
                  <StatusBadge level={item.risk} label={item.title} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>
                    {region}
                  </div>
                  <div className="small" style={{ fontSize: 10.5, color: "var(--text-2)", marginTop: 2, textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                    {item.event}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Área Dinâmica de Inspeção */}
      <div>
        <div className="row" style={{ gap: 8, marginBottom: 12 }}>
          <Brain size={16} style={{ color: "var(--cyan)" }} />
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>Interpretação do cenário selecionado</h3>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 20, alignItems: "stretch" }} className="forecast-hero-grid">
          {/* Coluna Esquerda: Plano conceitual de leitura */}
          <div className="card" style={{
            borderColor: `var(--risk-${scenario.risk})`,
            background: `linear-gradient(180deg, var(--risk-${scenario.risk}-bg), oklch(0.215 0.030 235 / 0.72))`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}>
            <div>
              <div className="row" style={{ justifyContent: "space-between", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
                <span className="mono small" style={{ color: `var(--risk-${scenario.risk})`, fontWeight: 600 }}>
                  BACIA DO {selectedRegion.toUpperCase()}
                </span>
                <StatusBadge level={scenario.risk} label={scenario.title} />
              </div>

              <h2 style={{ margin: "4px 0 10px", fontSize: 20, fontWeight: 600, color: "var(--text)" }}>
                {scenario.event}
              </h2>
              <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: "var(--text-2)" }}>
                {scenario.interpretation}
              </p>

              <div style={{
                marginTop: 16,
                padding: 12,
                borderRadius: 8,
                border: "1px solid var(--border-soft)",
                background: "oklch(1 0 0 / 0.018)"
              }}>
                <div className="row" style={{ gap: 8, color: "var(--cyan)", marginBottom: 4 }}>
                  <FileText size={14} />
                  <strong style={{ fontSize: 12.5, color: "var(--text)" }}>Recomendação conceitual</strong>
                </div>
                <p className="small" style={{ margin: 0, lineHeight: 1.45, color: "var(--text-2)", fontSize: 11.5 }}>
                  {scenario.recommendation}
                </p>
              </div>
            </div>

            <div>
              <div className="row" style={{ gap: 6, marginTop: 14, flexWrap: "wrap" }}>
                <span className="chip" style={{ cursor: "default", padding: "2px 8px", fontSize: 10, borderColor: `var(--risk-${scenario.risk})`, color: `var(--risk-${scenario.risk})` }}>
                  Foco: {scenario.focus}
                </span>
                <span className="chip" style={{ cursor: "default", padding: "2px 8px", fontSize: 10 }}>Versão: {scenario.model}</span>
                <span className="chip" style={{ cursor: "default", padding: "2px 8px", fontSize: 10 }}>Fonte: base mockada</span>
              </div>

              <div className="row" style={{ gap: 10, marginTop: 18, flexWrap: "wrap" }}>
                <button className="btn btn-sm interactive-action" type="button" style={{ fontSize: 11 }}>
                  <Download size={12} /> Exportar simulação
                </button>
                <button className="btn btn-sm btn-ghost interactive-action" type="button" style={{ fontSize: 11 }}>
                  <List size={12} /> Registrar interpretação
                </button>
              </div>
            </div>
          </div>

          {/* Coluna Direita: Critérios considerados */}
          <div className="card" style={{ display: "flex", flexDirection: "column", gap: 12, justifyContent: "space-between" }}>
            <div>
              <div className="card-head" style={{ marginBottom: 12 }}>
                <div className="card-title" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Database size={14} /> Critérios considerados
                </div>
                <span className="mono small">SIMULADO</span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 8 }}>
                {stationMetrics.map((metric) => (
                  <div key={metric.label} style={{
                    padding: "8px 10px",
                    borderRadius: 6,
                    border: "1px solid var(--border-soft)",
                    background: "oklch(1 0 0 / 0.015)"
                  }}>
                    <div className="mono" style={{ fontSize: 8.5, color: "var(--muted-2)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                      {metric.label}
                    </div>
                    <div style={{ marginTop: 2, fontSize: 12, fontWeight: 600, color: metric.accent || "var(--text)" }}>
                      {metric.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              padding: 10,
              borderRadius: 8,
              border: "1px dashed var(--border-soft)",
              background: "oklch(1 0 0 / 0.01)"
            }}>
              <div className="row" style={{ gap: 6, color: "var(--risk-high)", marginBottom: 4 }}>
                <AlertTriangle size={13} />
                <strong style={{ fontSize: 11.5, color: "var(--text)" }}>Leitura por tipo de estação</strong>
              </div>
              <p className="small" style={{ margin: 0, lineHeight: 1.4, fontSize: 10.8, color: "var(--text-2)" }}>
                Estações pluviométricas priorizam chuva e score simulado. Estações fluviométricas também podem exibir nível e vazão quando esses campos existem na base.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
