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
    title: "Cenario critico simulado",
    event: "Elevacao hidrologica em base mockada",
    interpretation: "A leitura simulada de Taquari apresenta score elevado e subida acentuada de nivel no cenario-base. Em contexto academico, esse padrao representa uma condicao didatica de maior atencao para comparacao com historicos simulados.",
    recommendation: "Registrar o cenario como prioridade de analise academica, comparar com leituras historicas mockadas e documentar a hipotese de comportamento extremo na base simulada.",
    focus: "Comparacao temporal e leitura conceitual de score",
    model: "if-kmeans-v0.2-demo"
  },
  "Rio Madeira": {
    risk: "fail",
    title: "Cenario de inconsistencia de sensor",
    event: "Leitura incoerente em estacao fluviometrica simulada",
    interpretation: "A estacao de Porto Velho registra vazao nula no mesmo cenario em que ha chuva acumulada elevada. Para fins didaticos, esse contraste sugere possivel ruido ou falha simulada de telemetria.",
    recommendation: "Sinalizar a leitura como possivel ruido e evitar usa-la diretamente em uma interpretacao conceitual sem validacao especializada no estudo academico.",
    focus: "Qualidade do dado e coerencia entre variaveis",
    model: "if-kmeans-v0.2-demo"
  },
  "Rio São Francisco": {
    risk: "med",
    title: "Cenario de estiagem simulada",
    event: "Baixa persistente em vazao simulada",
    interpretation: "O cenario do Rio Sao Francisco indica vazao reduzida e chuva acumulada baixa na base mockada. A leitura apoia uma hipotese conceitual de estiagem para discussao academica.",
    recommendation: "Comparar o padrao com periodos simulados anteriores e registrar a hipotese de estiagem no estudo, sem converter a leitura em orientacao operacional.",
    focus: "Padrao de baixa vazao e chuva acumulada",
    model: "if-kmeans-v0.2-demo"
  },
  "Rio Paraguai": {
    risk: "high",
    title: "Cenario de estiagem severa simulada",
    event: "Nivel rebaixado em serie demonstrativa",
    interpretation: "A estacao Alto Paraguai aparece com nivel baixo e score atipico na simulacao. O caso serve para demonstrar como um sistema futuro poderia destacar padroes persistentes de seca em ambiente controlado.",
    recommendation: "Acompanhar o cenario-base simulado, observar a tendencia nos graficos historicos mockados e registrar a hipotese de estiagem para avaliacao especializada.",
    focus: "Persistencia do padrao e variacao de nivel",
    model: "if-kmeans-v0.2-demo"
  },
  "Capibaribe": {
    risk: "high",
    title: "Cenario de chuva acumulada simulada",
    event: "Precipitacao elevada em estacao pluviometrica",
    interpretation: "Recife e uma estacao pluviometrica na base simulada, portanto a leitura deve priorizar chuva 24h, chuva 7d, score, risco conceitual e qualidade do dado, sem inferir nivel ou vazao medidos diretamente.",
    recommendation: "Usar o caso como estudo de comunicacao preventiva simulada e comparar a chuva acumulada com outros cenarios mockados da plataforma.",
    focus: "Chuva acumulada e classificacao conceitual",
    model: "if-kmeans-v0.2-demo"
  },
  "Rio Doce": {
    risk: "med",
    title: "Cenario de atencao simulado",
    event: "Variacao moderada em leitura fluviometrica",
    interpretation: "O cenario do Rio Doce combina elevacao gradual de nivel e score intermediario. A leitura e util para explicar transicoes entre normalidade e comportamento atipico em uma base academica.",
    recommendation: "Acompanhar o cenario-base simulado, observar tendencia em graficos historicos e registrar a interpretacao como marcador didatico de transicao.",
    focus: "Transicao sazonal e leitura de tendencia",
    model: "if-kmeans-v0.2-demo"
  },
  "Rio Parnaíba": {
    risk: "low",
    title: "Cenario estavel simulado",
    event: "Precipitacao dentro da normalidade mockada",
    interpretation: "Parnaiba e uma estacao pluviometrica simulada com score baixo e chuva acumulada reduzida. O caso funciona como contraponto didatico aos cenarios de maior desvio.",
    recommendation: "Manter o registro como referencia de comportamento estavel na base simulada e usa-lo para comparacao com padroes mais atipicos.",
    focus: "Referencia comparativa de normalidade simulada",
    model: "if-kmeans-v0.2-demo"
  }
};

const INTERPRETATION_STEPS = [
  {
    title: "Verificar score simulado",
    desc: "Observar o indice de anomalia como marcador didatico, sem interpreta-lo como medicao real."
  },
  {
    title: "Comparar com historico mockado",
    desc: "Relacionar chuva, nivel ou vazao com padroes simulados anteriores da mesma bacia."
  },
  {
    title: "Identificar hipotese conceitual",
    desc: "Classificar o caso como padrao, transicao, estiagem, chuva acumulada ou possivel ruido."
  },
  {
    title: "Registrar interpretacao academica",
    desc: "Documentar a leitura para apresentacao, discussao tecnica e avaliacao especializada."
  },
  {
    title: "Exportar simulacao",
    desc: "Usar o plano apenas como artefato demonstrativo do prototipo frontend-only."
  }
];

export const Recommendations: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>("Rio Taquari-Antas");

  const scenario = RECOMMENDATIONS[selectedRegion] || RECOMMENDATIONS["Rio Taquari-Antas"];
  const activeStation = STATIONS.find((station) => station.region === selectedRegion) || STATIONS[0];
  const scenarioRegions = REGIONS.filter((region) => region !== "Todas as regiões" && region in RECOMMENDATIONS);

  const stationMetrics = [
    { label: "Estacao simulada", value: `${activeStation.name} (${activeStation.uf})` },
    { label: "Tipo de estacao", value: activeStation.type },
    { label: "Score simulado", value: activeStation.anomalyScore.toFixed(2), accent: "var(--cyan)" },
    { label: "Qualidade do dado", value: activeStation.dataQuality },
    { label: "Chuva 24h", value: `${activeStation.rainfall24hMm} mm`, accent: "var(--aqua)" },
    { label: "Chuva 7d", value: `${activeStation.rainfall7dMm} mm`, accent: "var(--aqua)" },
    activeStation.type === "Fluviométrica" && activeStation.levelCm !== undefined
      ? { label: "Nivel simulado", value: `${activeStation.levelCm} cm` }
      : null,
    activeStation.type === "Fluviométrica" && activeStation.flowM3s !== undefined
      ? { label: "Vazao simulada", value: `${activeStation.flowM3s.toLocaleString()} m³/s` }
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
            <span className="chip" style={{ cursor: "default", color: "var(--risk-high)", borderColor: "var(--risk-high-bg)" }}>
              Sem uso operacional
            </span>
          </div>
        }
      />

      <div className="card" style={{
        marginBottom: 18,
        borderColor: "oklch(0.78 0.13 210 / 0.34)",
        background: "linear-gradient(135deg, oklch(0.78 0.13 210 / 0.10), oklch(1 0 0 / 0.015))"
      }}>
        <div className="row" style={{ alignItems: "flex-start", gap: 12 }}>
          <span style={{ color: "var(--cyan)", display: "flex", marginTop: 1 }}>
            <Shield size={18} />
          </span>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)", marginBottom: 6 }}>
              Aviso acadêmico sobre os cenários
            </div>
            <p className="small" style={{ margin: 0, lineHeight: 1.55, color: "var(--text-2)" }}>
              Esta tela apresenta recomendações conceituais baseadas em cenários simulados. Ela não emite alertas oficiais, não aciona órgãos públicos e não substitui protocolos técnicos, Defesa Civil ou especialistas.
            </p>
            <p className="small" style={{ margin: "8px 0 0", lineHeight: 1.55, color: "var(--muted)" }}>
              Todos os dados, scores, cenários e previsões apresentados são simulados e possuem finalidade acadêmica, sem integração oficial, sem coleta em tempo real e sem uso operacional. Os planos exibidos representam interpretações didáticas de scores simulados.
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))", gap: 20, alignItems: "stretch" }}>
        <div className="card" style={{
          borderColor: `var(--risk-${scenario.risk})`,
          background: `linear-gradient(180deg, var(--risk-${scenario.risk}-bg), oklch(0.215 0.030 235 / 0.72))`
        }}>
          <div className="card-head">
            <div className="card-title" style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Brain size={14} /> Plano demonstrativo de interpretação
            </div>
            <div className="row" style={{ gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
              <StatusBadge level={scenario.risk} label={scenario.title} />
              <span className="mono small">Modo demonstrativo</span>
            </div>
          </div>

          <div className="card-eyebrow" style={{ color: `var(--risk-${scenario.risk})` }}>{selectedRegion}</div>
          <h2 style={{ margin: "4px 0 8px", fontSize: 22, fontWeight: 600, color: "var(--text)" }}>
            {scenario.event}
          </h2>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: "var(--text-2)", maxWidth: 1040 }}>
            {scenario.interpretation}
          </p>

          <div style={{
            marginTop: 16,
            padding: 14,
            borderRadius: 10,
            border: "1px solid var(--border-soft)",
            background: "oklch(1 0 0 / 0.018)"
          }}>
            <div className="row" style={{ gap: 8, color: "var(--cyan)", marginBottom: 6 }}>
              <FileText size={14} />
              <strong style={{ fontSize: 13, color: "var(--text)" }}>Recomendação conceitual</strong>
            </div>
            <p className="small" style={{ margin: 0, lineHeight: 1.5, color: "var(--text-2)" }}>
              {scenario.recommendation}
            </p>
          </div>

          <div className="row" style={{ gap: 8, marginTop: 14, flexWrap: "wrap" }}>
            <span className="chip" style={{ cursor: "default", borderColor: `var(--risk-${scenario.risk})`, color: `var(--risk-${scenario.risk})` }}>
              Foco: {scenario.focus}
            </span>
            <span className="chip" style={{ cursor: "default" }}>Versão demonstrativa: {scenario.model}</span>
            <span className="chip" style={{ cursor: "default" }}>Fonte: base mockada</span>
          </div>

          <div className="row" style={{ gap: 10, marginTop: 18, flexWrap: "wrap" }}>
            <button className="btn btn-sm" type="button">
              <Download size={12} /> Exportar simulação
            </button>
            <button className="btn btn-sm btn-ghost" type="button">
              <List size={12} /> Registrar interpretação
            </button>
          </div>
        </div>

        <div className="card" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="card-head" style={{ marginBottom: 0 }}>
            <div className="card-title" style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Database size={14} /> Critérios considerados
            </div>
            <span className="mono small">SIMULADO</span>
          </div>

          <select
            className="select"
            value={selectedRegion}
            onChange={(event) => setSelectedRegion(event.target.value)}
            style={{ width: "100%", fontSize: 12 }}
          >
            {scenarioRegions.map((region) => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10 }}>
            {stationMetrics.map((metric) => (
              <div key={metric.label} style={{
                padding: 10,
                borderRadius: 8,
                border: "1px solid var(--border-soft)",
                background: "oklch(1 0 0 / 0.018)"
              }}>
                <div className="mono small" style={{ fontSize: 9.5, color: "var(--muted-2)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  {metric.label}
                </div>
                <div style={{ marginTop: 4, fontSize: 13, fontWeight: 600, color: metric.accent || "var(--text)" }}>
                  {metric.value}
                </div>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: "auto",
            padding: 12,
            borderRadius: 8,
            border: "1px dashed var(--border-soft)",
            background: "oklch(1 0 0 / 0.012)"
          }}>
            <div className="row" style={{ gap: 6, color: "var(--risk-high)", marginBottom: 6 }}>
              <AlertTriangle size={13} />
              <strong style={{ fontSize: 12, color: "var(--text)" }}>Leitura por tipo de estação</strong>
            </div>
            <p className="small" style={{ margin: 0, lineHeight: 1.45, color: "var(--text-2)" }}>
              Estações pluviométricas priorizam chuva e score simulado. Estações fluviométricas também podem exibir nível e vazão quando esses campos existem na base.
            </p>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <div className="row" style={{ gap: 8, marginBottom: 12 }}>
          <Cpu size={16} style={{ color: "var(--cyan)" }} />
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>Etapas do plano demonstrativo</h3>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
          {INTERPRETATION_STEPS.map((step, index) => (
            <div key={step.title} className="card" style={{ padding: 14 }}>
              <div className="mono" style={{ fontSize: 18, fontWeight: 700, color: "var(--border)", marginBottom: 8 }}>
                {String(index + 1).padStart(2, "0")}
              </div>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--text)", marginBottom: 6 }}>
                {step.title}
              </div>
              <p className="small" style={{ margin: 0, lineHeight: 1.45, color: "var(--text-2)" }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <div className="row" style={{ gap: 8, marginBottom: 12 }}>
          <TrendingUp size={16} style={{ color: "var(--cyan)" }} />
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>Cenários de resposta simulados</h3>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
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
                  padding: 16,
                  textAlign: "left",
                  borderColor: active ? `var(--risk-${item.risk})` : "var(--border-soft)",
                  background: active ? `linear-gradient(180deg, var(--risk-${item.risk}-bg), oklch(0.215 0.030 235 / 0.72))` : "oklch(0.215 0.030 235 / 0.7)"
                }}
              >
                <div className="row" style={{ justifyContent: "space-between", gap: 10, marginBottom: 10 }}>
                  <span style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: `var(--risk-${item.risk}-bg)`,
                    color: `var(--risk-${item.risk})`,
                    display: "grid",
                    placeItems: "center",
                    flexShrink: 0
                  }}>
                    {item.risk === "fail" ? <Shield size={15} /> : item.risk === "crit" ? <Map size={15} /> : <Brain size={15} />}
                  </span>
                  <StatusBadge level={item.risk} label={item.title} />
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)", marginBottom: 5 }}>
                  {region}
                </div>
                <p className="small" style={{ margin: 0, lineHeight: 1.45, color: "var(--text-2)" }}>
                  {item.focus}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
