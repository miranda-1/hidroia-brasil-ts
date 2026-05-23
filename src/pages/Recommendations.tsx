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
  const [selectedRegion, setSelectedRegion] = useState<string>("Rio Taquari-Antas");

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
    "Rio Taquari-Antas": {
      risk: "crit",
      title: "Rio Taquari-Antas",
      event: "Cheia / inundação crítica",
      details: "A bacia do Rio Taquari-Antas apresenta risco crítico devido à elevação extremamente acelerada do Rio Taquari (+112 cm em 24h na estação TAQ-01 / RS) sob chuva acumulada torrencial severa de 261 mm em 7 dias (dado bruto). O score de anomalia do Isolation Forest de 0.91 indica comportamento grave. Recomenda-se acionar o protocolo de evacuação imediata com a Defesa Civil local, intensificar o monitoramento em tempo real das cotas de transbordo e emitir alertas preventivos à população ribeirinha nos municípios de Lajeado, Estrela e Encantado.",
      action: "Evacuação / Alerta Máximo",
      time: "17:30",
      model: "if-kmeans-v0.2",
      conf: "91%"
    },
    "Rio Madeira": {
      risk: "fail",
      title: "Rio Madeira",
      event: "Suspeita de falha física de sensor",
      details: "A bacia do Rio Madeira exibe uma leitura nula e inativa (0 m³/s e 0 cm) na estação fluviométrica de Porto Velho (MAD-02 / RO) sob precipitação acumulada elevada antecedente (243 mm, dado bruto). A validação cruzada espacial com a estação de Humaitá (AM) confirma a inconsistência física do sinal. Recomenda-se a suspensão imediata de alertas de inundação automáticos para este nó e o envio de equipe técnica de campo para desobstrução e inspeção de calibração do sensor físico.",
      action: "Inspeção Técnica de Campo",
      time: "17:30",
      model: "if-kmeans-v0.2",
      conf: "88%"
    },
    "Rio São Francisco": {
      risk: "med",
      title: "Rio São Francisco",
      event: "Estiagem hídrica prolongada",
      details: "A bacia do Rio São Francisco apresenta padrão de estiagem severa (Cluster 0), com vazão em declínio contínuo e operando a apenas 31% da média histórica sazonal em Juazeiro (SFR-03 / BA, dado consistido). Recomenda-se acionar restrições graduais de captação para irrigação de grande porte não essencial e coordenar com o comitê de bacia a gestão de descarga dos reservatórios principais.",
      action: "Gestão de Outorgas / Captação",
      time: "17:30",
      model: "if-kmeans-v0.2",
      conf: "72%"
    },
    "Rio Paraguai": {
      risk: "high",
      title: "Rio Paraguai",
      event: "Seca severa no Pantanal",
      details: "A bacia do Rio Paraguai na estação de Alto Paraguai (PAN-04 / MT) exibe nível extremamente atípico e rebaixado (28 cm), estando 26% abaixo do desvio padrão sazonal esperado (dado bruto). O score de anomalia da IA é de 0.74. Recomenda-se o acionamento de alertas para navegação de grande porte para evitar encalhes, controle rigoroso de captações industriais no leito principal e reforço nas brigadas de incêndios florestais locais.",
      action: "Alerta à Navegação e Captação",
      time: "17:30",
      model: "if-kmeans-v0.2",
      conf: "84%"
    },
    "Capibaribe": {
      risk: "high",
      title: "Capibaribe",
      event: "Precipitação acumulada severa",
      details: "A bacia urbana do Capibaribe em Recife (REC-05 / PE) exibe chuva acumulada severa de 96 mm em 24h e 198 mm em 7 dias (dado bruto). O score de anomalia de 0.69 gerou alerta de chuva extrema. Recomenda-se acionar pré-alerta para evacuação preventiva de encostas sob risco de deslizamento de terra e mobilização imediata de equipes de drenagem urbana nos pontos críticos de alagamento.",
      action: "Drenagem e Deslizamentos",
      time: "17:30",
      model: "if-kmeans-v0.2",
      conf: "84%"
    },
    "Rio Doce": {
      risk: "med",
      title: "Rio Doce",
      event: "Pressão hídrica / Turbidez",
      details: "A bacia do Rio Doce em Governador Valadares (DOC-06 / MG) exibe nível de 298 cm com elevação gradual e turbidez de sedimentos atípica sob chuvas acumuladas de 118 mm (dado bruto). Recomenda-se acionar monitoramento químico especial de qualidade de água e notificar as concessionárias locais de tratamento para eventuais ajustes operacionais preventivos.",
      action: "Monitorar Qualidade / Captação",
      time: "17:30",
      model: "if-kmeans-v0.2",
      conf: "72%"
    },
    "Rio Parnaíba": {
      risk: "low",
      title: "Rio Parnaíba",
      event: "Comportamento hídrico estável",
      details: "A bacia do Rio Parnaíba (estação de Parnaíba SSE-08 / PI) exibe comportamento hidrológico estável dentro da normalidade estatística sazonal, com precipitação acumulada de apenas 14 mm em 7 dias (dado consistido). O score de anomalia da IA é baixo (0.22). Recomenda-se manter o ciclo ordinário de monitoramento eletrônico via satélite sem necessidade de intervenções.",
      action: "Monitoramento Ordinário",
      time: "17:30",
      model: "if-kmeans-v0.2",
      conf: "95%"
    }
  };

  const rec = RECOMMENDATIONS[selectedRegion] || RECOMMENDATIONS["Rio Taquari-Antas"];

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
              {REGIONS.filter(r => r !== "Todas as regiões").map(r => (
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
