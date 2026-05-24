export interface Kpi {
  label: string;
  value: string;
  unit: string;
  trend: string;
  trendUp: boolean;
  ok?: boolean;
}

export const KPIS: Kpi[] = [
  { label: "Estações simuladas",      value: "8", unit: "nós", trend: "Mock inspirado na ANA/HIDRO", trendUp: false, ok: true },
  { label: "Estações fluviométricas", value: "6", unit: "estações", trend: "Nível / Vazão", trendUp: false, ok: true },
  { label: "Estações pluviométricas",  value: "2", unit: "estações", trend: "Precipitação", trendUp: false, ok: true },
  { label: "Anomalias críticas",      value: "3", unit: "alertas", trend: "Isolation Forest", trendUp: true },
  { label: "Sensores em falha",       value: "1", unit: "sensor", trend: "Telemetria inativa", trendUp: false, ok: true },
];

export interface AnomalyStat {
  score: number;
  cluster: string;
  factor: string;
}

export const ANOMALY_STATS: Record<string, AnomalyStat> = {
  "TAQ-01": { 
    score: 0.91, 
    cluster: "Cluster 3 (Extremos de Inundação)", 
    factor: "Desvio crítico de nível (+112 cm em 24h) sob chuva torrencial severa (261 mm acumulado 7d) no Rio Taquari." 
  },
  "MAD-02": { 
    score: 0.88, 
    cluster: "Cluster -1 (Ruído / Falha Física)", 
    factor: "Perda abrupta de sinal com vazão nula (0 m³/s) sob chuva intensa antecedente (243 mm) na estação de Porto Velho." 
  },
  "SFR-03": { 
    score: 0.63, 
    cluster: "Cluster 0 (Estiagem Crítica)", 
    factor: "Redução crônica e sistemática de vazão para 31% da média histórica sazonal no Rio São Francisco em Juazeiro." 
  },
  "PAN-04": { 
    score: 0.74, 
    cluster: "Cluster 0 (Estiagem Crítica)", 
    factor: "Nível de reservatório em Corumbá 26% abaixo da normal histórica para o período no Rio Paraguai." 
  },
  "REC-05": { 
    score: 0.69, 
    cluster: "Cluster 3 (Extremos de Inundação)", 
    factor: "Alagamento repentino provocado por chuva acumulada severa (198 mm) na bacia urbana do Capibaribe." 
  },
  "DOC-06": { 
    score: 0.58, 
    cluster: "Cluster 2 (Transição de Vazão)", 
    factor: "Vazão gradual com leve elevação do nível e turbidez de sedimentos sob alerta leve no Rio Doce." 
  },
  "AMZ-07": { 
    score: 0.15, 
    cluster: "Cluster 1 (Comportamento Normal)", 
    factor: "Parâmetros hidrológicos e fluviométricos dentro dos desvios padrão climatológicos no Rio Madeira em Humaitá." 
  },
  "SSE-08": { 
    score: 0.22, 
    cluster: "Cluster 1 (Comportamento Normal)", 
    factor: "Ausência de desvios significativos, chuva acumulada dentro da normal histórica sazonal no Rio Parnaíba." 
  }
};
