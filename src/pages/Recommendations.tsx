import React, { useState } from "react";
import { PageHeader } from "../components/ui/PageHeader";
import { StatusBadge } from "../components/ui/StatusBadge";
import { REGIONS } from "../data/stations";
import { 
  Bell, 
  Waves, 
  AlertTriangle, 
  Map, 
  Shield, 
  TrendingUp, 
  List, 
  Download,
  Brain,
  Cpu
} from "lucide-react";

export const Recommendations: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>("Bacia Taquari-Antas");

  const RECOMMENDATIONS: Record<string, {
    risk: "low" | "med" | "high" | "crit" | "fail";
    title: string;
    event: string;
    details: string;
    action: string;
    time: string;
    model: string;
    conf: string;
  }> = {
    "Bacia Taquari-Antas": {
      risk: "crit",
      title: "Bacia Taquari-Antas",
      event: "Inundação rápida",
      details: "A região da Bacia Taquari-Antas apresenta risco crítico devido à elevação extremamente acelerada do Rio Taquari (+112 cm em 24h) e ao acumulado elevado de chuva nos últimos 7 dias (261 mm). Recomenda-se acionar o protocolo de evacuação imediata com a Defesa Civil local, intensificar o monitoramento em tempo real das cotas de transbordo e priorizar o alerta preventivo para a população ribeirinha nos municípios de Lajeado, Estrela e Encantado.",
      action: "Evacuação e Resgate",
      time: "08:30",
      model: "if-kmeans-v0.2",
      conf: "91%"
    },
    "Bacia do Rio Madeira": {
      risk: "fail",
      title: "Bacia do Rio Madeira",
      event: "Falha física de sensor telemétrico",
      details: "A região da Bacia do Rio Madeira (estação de Porto Velho MAD-02) exibe leitura nula (0 m³/s) sob chuva intensa. A validação cruzada com as estações vizinhas indica divergência física de hardware. Recomenda-se a suspensão de alertas automáticos e envio imediato de equipe técnica para desobstrução e calibração dos sensores de campo.",
      action: "Manutenção Técnica",
      time: "08:30",
      model: "if-kmeans-v0.2",
      conf: "88%"
    },
    "Bacia do Rio São Francisco": {
      risk: "med",
      title: "Bacia do Rio São Francisco",
      event: "Escassez hídrica crônica",
      details: "A região da Bacia do Rio São Francisco apresenta padrão de estiagem severa (Cluster 0), com vazão em declínio contínuo e operando a 31% da média histórica seasonal em Juazeiro. Recomenda-se acionar restrições graduais de captação para irrigação não essencial e coordenar com o comitê de bacia a gestão de descarga dos reservatórios.",
      action: "Gestão de Outorgas",
      time: "08:30",
      model: "if-kmeans-v0.2",
      conf: "72%"
    },
    "Pantanal Alto Paraguai": {
      risk: "high",
      title: "Pantanal Alto Paraguai",
      event: "Seca e variação hidrológica extrema",
      details: "A região apresenta anomalia severa de baixo nível no Rio Paraguai em Corumbá (cota 28 cm). Recomenda-se controle rigoroso de captação nas cabeceiras e restrições preventivas à navegação de grande porte para evitar encalhes, além de reforço nas brigadas contra incêndios florestais.",
      action: "Navegação / Captação",
      time: "08:30",
      model: "if-kmeans-v0.2",
      conf: "84%"
    },
    "Recife Metropolitana": {
      risk: "high",
      title: "Recife Metropolitana",
      event: "Alagamento rápido",
      details: "Risco alto devido a precipitação acumulada extrema (198 mm) na bacia urbana. Recomenda-se acionar pré-alerta para evacuação preventiva de encostas sob risco de deslizamento e mobilização imediata de equipes de drenagem urbana nos pontos críticos de Recife, Olinda e Jaboatão.",
      action: "Evacuação Encostas",
      time: "08:30",
      model: "if-kmeans-v0.2",
      conf: "84%"
    },
    "Bacia do Rio Doce": {
      risk: "med",
      title: "Bacia do Rio Doce",
      event: "Comportamento atípico / Sedimentos",
      details: "Região em atenção por elevação de nível gradual (+18 cm) com aumento na turbidez. Recomenda-se acionar monitoramento químico especial de qualidade de água e notificar as concessionárias de tratamento para eventuais ajustes de coagulação.",
      action: "Qualidade da Água",
      time: "08:30",
      model: "if-kmeans-v0.2",
      conf: "72%"
    }
  };

  const rec = RECOMMENDATIONS[selectedRegion] || RECOMMENDATIONS["Bacia Taquari-Antas"];

  const groups = [
    { k: "crit", title: "Recomendações para risco CRÍTICO", items: [
      { ico: <Bell size={16} />,   t: "Acionar Defesa Civil local",       n: "Notificação imediata aos órgãos municipais de defesa civil." },
      { ico: <Waves size={16} />,  t: "Monitorar áreas próximas aos rios", n: "Patrulhas de inspeção em bairros ribeirinhos." },
      { ico: <AlertTriangle size={16} />,  t: "Emitir alerta preventivo à população", n: "Comunicação multicanal: SMS, rádio, sirenes, redes." },
      { ico: <Map size={16} />,    t: "Verificar rotas de evacuação",     n: "Conferir trafegabilidade e abrigos disponíveis." },
      { ico: <Shield size={16} />, t: "Priorizar municípios vulneráveis", n: "População em encostas e zonas alagáveis em primeiro plano." },
      { ico: <TrendingUp size={16} />,  t: "Acompanhar tendência de chuva",    n: "Modelos meteorológicos e radar nas próximas 6–24 h." },
    ] },
    { k: "high", title: "Recomendações para risco ALTO", items: [
      { ico: <Bell size={16} />, t: "Pré-alerta para defesa civil",    n: "Equipes em prontidão, sem ativação total." },
      { ico: <Map size={16} />,  t: "Mapear pontos de risco",          n: "Atualizar cadastro de famílias em áreas críticas." },
      { ico: <Cpu size={16} />,  t: "Aumentar frequência de coleta",   n: "Redução de janela de leitura para 1 hora." },
    ] },
    { k: "med", title: "Recomendações para ATENÇÃO", items: [
      { ico: <TrendingUp size={16} />, t: "Monitoramento intensificado",  n: "Acompanhar variação a cada 3 horas." },
      { ico: <List size={16} />,  t: "Revisar plano de contingência", n: "Conferir recursos e canais de comunicação." },
    ] },
  ];

  return (
    <div className="page">
      <PageHeader 
        category="MITIGAÇÃO E TOMADA DE DECISÃO" 
        title="Recomendações de mitigação" 
        subtitle="Ações preventivas sugeridas pela IA conforme o nível de risco classificado para cada região."
        rightElement={
          <div className="row" style={{ gap: 10 }}>
            <select 
              className="select" 
              value={selectedRegion} 
              onChange={e => setSelectedRegion(e.target.value)}
              style={{ fontSize: 12, padding: "5px 10px" }}
            >
              {REGIONS.filter(r => r !== "Todas as regiões" && r !== "Bacia do Rio Amazonas" && r !== "Litoral Sudeste").map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            <button className="btn btn-sm">
              <Download size={12} /> Exportar plano
            </button>
            <button className="btn btn-primary btn-sm">
              <Bell size={12} /> Enviar para Defesa Civil
            </button>
          </div>
        }
      />

      {/* IA action plan */}
      <div className="card" style={{
        borderColor: `var(--risk-${rec.risk})`,
        background: `linear-gradient(180deg, var(--risk-${rec.risk}-bg), oklch(0.215 0.030 235 / 0.7))`,
        marginBottom: 16
      }}>
        <div className="card-head">
          <div className="card-title" style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Brain size={14} /> Plano de Ação Sugerido pela IA
          </div>
          <div className="row" style={{ gap: 8 }}>
            <StatusBadge level={rec.risk} label={rec.title} />
            <span className="mono small">Gerado às {rec.time}</span>
          </div>
        </div>
        <p style={{
          fontSize: 16, lineHeight: 1.55, color: "var(--text)",
          maxWidth: 920, textWrap: "pretty", margin: "10px 0"
        }}>
          {rec.details}
        </p>
        <div className="row" style={{ gap: 8, marginTop: 14, flexWrap: "wrap" }}>
          <span className="chip" style={{ borderColor: `var(--risk-${rec.risk})`, color: `var(--risk-${rec.risk})` }}>
            ◉ {rec.action}
          </span>
          <span className="chip">Tipo de evento: {rec.event}</span>
          <span className="chip">Confiança {rec.conf}</span>
          <span className="chip">Versão modelo: {rec.model}</span>
        </div>
      </div>

      {/* Relatório Técnico Automático - TAQ-01 */}
      <div className="card" style={{ marginTop: 16, border: "1px solid var(--risk-crit)" }}>
        <div className="card-head">
          <div className="card-title" style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Cpu size={14} /> Relatório Técnico de Anomalia Crítica · Estação TAQ-01
          </div>
          <span className="mono small" style={{ color: "var(--risk-crit)" }}>GERADO AUTOMATICAMENTE PELA IA</span>
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 16, marginTop: 8 }}>
          <div>
            <p className="small" style={{ lineHeight: 1.5, margin: 0, color: "var(--text-2)" }}>
              O sistema detectou um comportamento hidrológico extremamente anômalo na estação <strong>TAQ-01 (Rio Taquari - Lajeado/RS)</strong>. Os algoritmos não supervisionados classificaram a assinatura temporal no <strong>Cluster 3 (Extremos de Inundação)</strong> com um índice de isolamento no Isolation Forest de <strong>s = 0.91</strong>.
            </p>
            
            <div className="mono small" style={{ marginTop: 12, padding: 10, borderRadius: 8, background: "oklch(1 0 0 / 0.015)", border: "1px solid var(--border-soft)" }}>
              <strong>Parâmetros Hidrológicos Calculados:</strong>
              <div style={{ marginTop: 4 }}>• Nível do Rio: 685 cm (+112 cm em 24h)</div>
              <div>• Chuva acumulada 7d: 261 mm (excedendo 350% a normal climatológica)</div>
              <div>• Silhouette Score local: 0.76 (alto nível de isolamento em relação ao comportamento padrão)</div>
            </div>
          </div>
          
          <div style={{ padding: 12, borderRadius: 8, background: "oklch(1 0 0 / 0.015)", border: "1px solid var(--border-soft)", display: "flex", flexDirection: "column", gap: 8 }}>
            <div className="small"><strong>Mitigação Emergencial Recomendada:</strong></div>
            <ul className="small" style={{ margin: 0, paddingLeft: 18, color: "var(--text-2)", lineHeight: 1.45 }}>
              <li>Disparo imediato do alarme sonoro via sirenes nas áreas de risco de Lajeado e Estrela.</li>
              <li>Evacuação imediata das comunidades ribeirinhas cadastradas nas cotas abaixo de 720 cm.</li>
              <li>Suspensão temporária do tráfego em pontes e vias próximas à calha do rio Taquari.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Grouped action cards */}
      <div className="col" style={{ gap: 16, marginTop: 20 }}>
        {groups.map((g, idx) => (
          <div key={idx}>
            <div className="row" style={{ marginBottom: 10, gap: 12 }}>
              <span className={`risk-pill risk-${g.k}`} />
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>{g.title}</h3>
            </div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 12,
            }}>
              {g.items.map((it, i) => (
                <div key={i} className="card" style={{ padding: 16 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 8,
                    background: `var(--risk-${g.k}-bg)`, color: `var(--risk-${g.k})`,
                    display: "grid", placeItems: "center", marginBottom: 12,
                  }}>{it.ico}</div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{it.t}</div>
                  <div className="small" style={{ marginTop: 6, lineHeight: 1.45 }}>{it.n}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
