export interface Kpi {
  label: string;
  value: string;
  unit: string;
  trend: string;
  trendUp: boolean;
  ok?: boolean;
}

export const KPIS: Kpi[] = [
  { label: "Estações monitoradas",    value: "128", unit: "ativas", trend: "Dados ANA/INMET", trendUp: false, ok: true },
  { label: "Anomalias isoladas",      value: "37",  unit: "críticas", trend: "Isolation Forest", trendUp: true },
  { label: "Clusters identificados",  value: "4",   unit: "perfis",   trend: "Algoritmo K-Means", trendUp: false, ok: true },
  { label: "Variabilidade explicada", value: "92%", unit: "PCA",      trend: "2 componentes", trendUp: false, ok: true },
  { label: "Sensores em falha",       value: "2",   unit: "estações",   trend: "Telemetria inativa", trendUp: false, ok: true },
];

export interface AnomalyStat {
  score: number;
  cluster: string;
  factor: string;
}

export const ANOMALY_STATS: Record<string, AnomalyStat> = {
  "TAQ-01": { score: 0.91, cluster: "Cluster 3 (Extremos de Inundação)", factor: "Desvio crítico de nível (+34% em 24h) sob chuva torrencial severa (261 mm acumulado 7d)." },
  "MAD-02": { score: 0.88, cluster: "Cluster -1 (Ruído / Falha Física)", factor: "Perda abrupta de sinal com vazão nula (0 m³/s) sob chuva intensa antecedente (243 mm)." },
  "SFR-03": { score: 0.63, cluster: "Cluster 0 (Estiagem Crítica)", factor: "Redução crônica e sistemática de vazão para 31% da média histórica sazonal." },
  "PAN-04": { score: 0.74, cluster: "Cluster 0 (Estiagem Crítica)", factor: "Nível de reservatório em Corumbá 26% abaixo da normal histórica para o período." },
  "REC-05": { score: 0.69, cluster: "Cluster 3 (Extremos de Inundação)", factor: "Alagamento repentino provocado por chuva acumulada severa (198 mm)." },
  "DOC-06": { score: 0.58, cluster: "Cluster 2 (Transição de Vazão)", factor: "Vazão gradual com leve elevação do nível e turbidez de sedimentos sob alerta leve." },
  "AMZ-07": { score: 0.15, cluster: "Cluster 1 (Comportamento Normal)", factor: "Parâmetros hidrológicos e fluviométricos dentro dos desvios padrão climatológicos." },
  "SSE-08": { score: 0.82, cluster: "Cluster -1 (Ruído / Falha Física)", factor: "Ausência total de telemetria ativa (leitura de sensores travada em zero constante)." }
};
