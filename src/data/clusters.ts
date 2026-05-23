export interface ClusterProfile {
  name: string;
  color: string;
  desc: string;
  lvl: string;
  rain: string;
  count: number;
  stations: string;
}

export const CLUSTER_KPIS = [
  { label: "Métrica de Validação", value: "Silhouette Score: 0.71", trend: "Alta separabilidade", ok: true },
  { label: "Número de Perfis (K)", value: "K = 4 + Outliers", trend: "K-Means Otimizado", ok: true },
  { label: "Variabilidade Explicada", value: "92%", trend: "2 componentes PCA", ok: true }
];

export const CLUSTER_PROFILES: Record<string, ClusterProfile> = {
  "0": {
    name: "Cluster 0: Estiagem Crítica",
    color: "var(--risk-med)",
    desc: "Estações que apresentam vazão severamente abaixo da média histórica associada a índices baixos de precipitação. Característico de seca prolongada.",
    lvl: "Vazão média: 31%",
    rain: "Precipitação: 45 mm (7d)",
    count: 2,
    stations: "Alto Paraguai (MT) [Seca Severa] e São Francisco (BA) [Escassez Hídrica]"
  },
  "1": {
    name: "Cluster 1: Comportamento Normal",
    color: "var(--risk-low)",
    desc: "Padrão de estabilidade hídrica onde as vazões e níveis dos rios estão de acordo com as médias climatológicas para a época do ano.",
    lvl: "Vazão média: 100%",
    rain: "Precipitação: 110 mm (7d)",
    count: 2,
    stations: "Humaitá (AM) [Fluviométrica Normal] e Parnaíba (PI) [Pluviométrica Normal]"
  },
  "2": {
    name: "Cluster 2: Transição Sazonal",
    color: "var(--risk-high)",
    desc: "Regimes fluviométricos com variação moderada e gradual de vazão decorrente de precipitação constante em cabeceiras.",
    lvl: "Nível médio: 298 cm",
    rain: "Precipitação: 118 mm (7d)",
    count: 1,
    stations: "Rio Doce (MG) [Variação de Turbidez / Pressão Sazonal]"
  },
  "3": {
    name: "Cluster 3: Extremos de Inundação",
    color: "var(--risk-crit)",
    desc: "Eventos extremos caracterizados por elevações abruptas e críticas no nível dos rios sob precipitações acumuladas excessivas.",
    lvl: "Nível médio: 685 cm",
    rain: "Precipitação: 261 mm (7d)",
    count: 2,
    stations: "Taquari (RS) [Cheia Crítica] e Recife (PE) [Chuva Extrema]"
  },
  "-1": {
    name: "Cluster -1: Inconsistência Telemétrica (Falhas)",
    color: "var(--risk-fail)",
    desc: "Leituras anômalas isoladas por DBSCAN que exibem desconexão física: leitura de nível nulo sob forte chuva.",
    lvl: "Medição nula: 0 m³/s",
    rain: "Precipitação: 243 mm (7d)",
    count: 1,
    stations: "Porto Velho (RO) [Falha de Hardware/Sensor]"
  }
};
