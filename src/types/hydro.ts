export type HydroVariable = "Chuva" | "Nível do rio" | "Vazão";

export type AiStatus = "Normal" | "Atenção" | "Alto" | "Anomalia crítica" | "Falha provável";

export type ClusterName = 
  | "Estiagem" 
  | "Comportamento normal" 
  | "Chuva moderada / transição" 
  | "Evento extremo" 
  | "Falha provável";

export interface Station {
  id: string;
  name: string;
  city: string;
  region: string;
  river: string;
  x: number;
  y: number;
  risk: "low" | "med" | "high" | "crit" | "fail";
  level: number; // mantido para retrocompatibilidade
  rain7: number;  // mantido para retrocompatibilidade
  state: string;
  risk_type: string;

  // Novos campos padrão simulados inspirados pela ANA
  code: string;
  uf: string;
  basin: string;
  type: "Fluviométrica" | "Pluviométrica";
  source: string; // "Mock inspirado em ANA/HIDRO"
  status: "Normal" | "Atenção" | "Atípico" | "Anomalia" | "Falha";
  levelCm?: number;
  flowM3s?: number;
  rainfall24hMm: number;
  rainfall7dMm: number;
  anomalyScore: number;
  dataQuality: "bruto" | "consistido";
  lastReading: string;
  note: string;
}

export interface SubStation {
  st: string;
  city: string;
  river: string;
  lvl: number;
  d24: number;
  r7: number;
  risk: "low" | "med" | "high" | "crit" | "fail";
}

export interface HydroRecord {
  id: string;
  date: string;
  source: string; // ex: "Mock inspirado em ANA/HIDRO" ou "ANA" ou "INMET"
  code: string;       // Código ANA/SNIRH
  name: string;       // Estação (nome)
  uf: string;         // UF
  region: string;     // Região
  basin: string;      // Bacia
  type: "Fluviométrica" | "Pluviométrica";
  levelCm?: number;   // Nível (cm)
  flowM3s?: number;   // Vazão (m3/s)
  rainfall24hMm: number; // Chuva 24h (mm)
  rainfall7dMm: number;  // Chuva 7d (mm)
  dataQuality: "bruto" | "consistido";
  score: number;      // Score IA
  risk: "low" | "med" | "high" | "crit" | "fail"; // Status Risco (lógica interna)
  status: "Normal" | "Atenção" | "Atípico" | "Anomalia" | "Falha"; // Rótulo em PT
  cluster: string;
  note: string;
}
