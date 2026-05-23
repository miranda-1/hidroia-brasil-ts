import type { HydroRecord } from "../types/hydro";


export const DB_ROWS: HydroRecord[] = [
  { date: "02/05/2024", source: "ANA",   id: "rec-1", st: "TAQ-01", region: "Bacia Taquari-Antas",    river: "Rio Taquari",       city: "Lajeado",        state: "RS", variable: "Nível do rio", lvl: "685 cm",     r24: 82, r7: 261, m7: "512 cm",     dev: "+34%",  cluster: "Evento extremo", score: 0.91, risk: "crit", d24: 112 },
  { date: "02/05/2024", source: "INMET", id: "rec-2", st: "REC-05", region: "Recife Metropolitana",   river: "Bacia urbana",      city: "Recife",         state: "PE", variable: "Chuva 24h",    lvl: "96 mm",      r24: 96, r7: 198, m7: "38 mm",      dev: "+152%", cluster: "Evento extremo", score: 0.69, risk: "high", d24: 64 },
  { date: "01/05/2024", source: "ANA",   id: "rec-3", st: "SFR-03", region: "Bacia do Rio São Francisco", river: "Rio São Francisco", city: "Juazeiro",       state: "BA", variable: "Vazão",        lvl: "31% média",  r24: 0,  r7: 48,  m7: "45% média",  dev: "-14%",  cluster: "Estiagem",       score: 0.63, risk: "med", d24: -6 },
  { date: "30/04/2024", source: "ANA",   id: "rec-4", st: "PAN-04", region: "Pantanal Alto Paraguai", river: "Rio Paraguai",      city: "Corumbá",        state: "MS", variable: "Nível do rio", lvl: "228 cm",     r24: 0,  r7: 36,  m7: "310 cm",     dev: "-26%",  cluster: "Estiagem",       score: 0.74, risk: "high", d24: -4 },
  { date: "25/04/2024", source: "ANA",   id: "rec-5", st: "MAD-02", region: "Bacia do Rio Madeira",   river: "Rio Madeira",       city: "Porto Velho",    state: "RO", variable: "Vazão",        lvl: "0 m³/s",     r24: 0,  r7: 243, m7: "860 m³/s",    dev: "-100%", cluster: "Falha provável", score: 0.88, risk: "fail", d24: -100 },
  { date: "24/04/2024", source: "INMET", id: "rec-6", st: "CUR-08", region: "Curitiba Metropolitana", river: "Bacia urbana",      city: "Curitiba",       state: "PR", variable: "Chuva 24h",    lvl: "0 mm",       r24: 0,  r7: 14,  m7: "14 mm",       dev: "-100%", cluster: "Comportamento normal",    score: 0.22, risk: "low", d24: 0 }
];
