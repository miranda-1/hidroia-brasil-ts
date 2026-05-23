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
  level: number;
  rain7: number;
  state: string;
  risk_type: string;
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
  source: "ANA" | "INMET";
  st: string; // matches st in mock DB_ROWS
  stationCode?: string;
  region: string;
  state: string;
  river?: string;
  city?: string;
  variable: string;
  lvl: string;
  r24: number;
  r7: number;
  m7: string;
  dev: string;
  cluster: string; // allows flexibility for clusters like "Evento extremo" etc.
  score: number; // matches score in mock DB_ROWS
  anomalyScore?: number;
  risk: "low" | "med" | "high" | "crit" | "fail";
  d24: number;
}
