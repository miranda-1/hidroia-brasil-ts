export interface AnomalyRecord {
  rank: number;
  date: string;
  st: string;
  region: string;
  state: string;
  variable: string;
  val: string;
  score: number;
  risk: "low" | "med" | "high" | "crit" | "fail";
  desc: string;
}

export const ANOMALY_KPIS = [
  { label: "Algoritmo de Anomalia", value: "Isolation Forest", trend: "Algoritmo de Isolamento", ok: true },
  { label: "Anomalias Críticas", value: "37", trend: "Contaminação: 3%", ok: true },
  { label: "Sensibilidade de Hardware", value: "9", trend: "Sensores sob suspeita", ok: true },
  { label: "Extremos Classificados", value: "14", trend: "Alertas de campo", ok: true }
];

export const ANOMALY_ROWS: AnomalyRecord[] = [
  { rank: 1, date: "02/05/2024 08:30", st: "TAQ-01", region: "Bacia Taquari-Antas", state: "RS", variable: "Nível do rio", val: "685 cm", score: 0.91, risk: "crit", desc: "Elevação extremamente acelerada (+112 cm) sob forte tempestade." },
  { rank: 2, date: "25/04/2024 09:15", st: "MAD-02", region: "Bacia do Rio Madeira", state: "RO", variable: "Vazão do rio", val: "0 m³/s", score: 0.88, risk: "fail", desc: "Leitura nula súbita após chuva intensa na bacia. Suspeita de hardware." },
  { rank: 3, date: "02/05/2024 07:55", st: "SSE-08", region: "Litoral Sudeste", state: "RJ", variable: "Nível do rio", val: "0 cm", score: 0.82, risk: "fail", desc: "Telemetria travada em zero constante sob precipitação pluviométrica local." },
  { rank: 4, date: "30/04/2024 16:40", st: "PAN-04", region: "Pantanal Alto Paraguai", state: "MS", variable: "Nível do rio", val: "28 cm", score: 0.74, risk: "high", desc: "Nível de reservatório em Corumbá 26% abaixo do desvio sazonal." },
  { rank: 5, date: "02/05/2024 05:12", st: "REC-05", region: "Recife Metropolitana", state: "PE", variable: "Chuva acumulada", val: "198 mm (7d)", score: 0.69, risk: "high", desc: "Chuva acumulada extremamente severa provocando alagamentos." },
  { rank: 6, date: "01/05/2024 12:00", st: "SFR-03", region: "Bacia do Rio São Francisco", state: "BA", variable: "Vazão do rio", val: "31%", score: 0.63, risk: "med", desc: "Declínio sistemático e duradouro de vazão em período crítico." },
  { rank: 7, date: "29/04/2024 14:30", st: "DOC-06", region: "Bacia do Rio Doce", state: "MG", variable: "Nível do rio", val: "298 cm", score: 0.58, risk: "med", desc: "Turbidez de sedimentos com elevação gradual sob monitoramento." }
];
