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
  { label: "Algoritmo de Anomalia", value: "Isolation Forest", trend: "Desvio Multivariável", ok: true },
  { label: "Anomalias Críticas", value: "3", trend: "Score alto simulado", ok: true },
  { label: "Leituras sob análise", value: "1", trend: "Caso simulado: Porto Velho", ok: true },
  { label: "Cenários extremos", value: "2", trend: "Taquari e Recife", ok: true }
];

export const ANOMALY_ROWS: AnomalyRecord[] = [
  { 
    rank: 1, 
    date: "23/05/2026 08:30", 
    st: "TAQ-01", 
    region: "Rio Taquari-Antas", 
    state: "RS", 
    variable: "Nível do rio", 
    val: "685 cm", 
    score: 0.91, 
    risk: "crit", 
    desc: "Elevação extremamente acelerada (+112 cm em 24h) sob forte tempestade severa." 
  },
  { 
    rank: 2, 
    date: "23/05/2026 09:15", 
    st: "MAD-02", 
    region: "Rio Madeira", 
    state: "RO", 
    variable: "Vazão do rio", 
    val: "0 m³/s", 
    score: 0.88, 
    risk: "fail", 
    desc: "Leitura nula súbita após chuva intensa na bacia. Suspeita de hardware de telemetria." 
  },
  { 
    rank: 3, 
    date: "23/05/2026 16:40", 
    st: "PAN-04", 
    region: "Rio Paraguai", 
    state: "MT", 
    variable: "Nível do rio", 
    val: "28 cm", 
    score: 0.74, 
    risk: "high", 
    desc: "Nível de reservatório em Corumbá 26% abaixo do desvio sazonal esperado." 
  },
  { 
    rank: 4, 
    date: "23/05/2026 05:12", 
    st: "REC-05", 
    region: "Capibaribe", 
    state: "PE", 
    variable: "Chuva acumulada", 
    val: "198 mm (7d)", 
    score: 0.69, 
    risk: "high", 
    desc: "Chuva acumulada extremamente severa provocando alagamentos urbanos rápidos." 
  },
  { 
    rank: 5, 
    date: "23/05/2026 12:00", 
    st: "SFR-03", 
    region: "Rio São Francisco", 
    state: "BA", 
    variable: "Vazão do rio", 
    val: "31% média", 
    score: 0.63, 
    risk: "med", 
    desc: "Declínio sistemático e duradouro de vazão em período crítico de estiagem." 
  },
  { 
    rank: 6, 
    date: "23/05/2026 14:30", 
    st: "DOC-06", 
    region: "Rio Doce", 
    state: "MG", 
    variable: "Nível do rio", 
    val: "298 cm", 
    score: 0.58, 
    risk: "med", 
    desc: "Elevação gradual de turbidez de sedimentos sob monitoramento de chuvas." 
  }
];
