import type { Station, SubStation } from "../types/hydro";


export const STATIONS: Station[] = [
  { id: "TAQ-01", name: "Estação Taquari-01", city: "Lajeado",       region: "Bacia Taquari-Antas",    river: "Rio Taquari",    x: 470, y: 505, risk: "crit",  level: 685, rain7: 261, state: "RS", risk_type: "Cheia / inundação" },
  { id: "MAD-02", name: "Estação Madeira-02", city: "Porto Velho",   region: "Bacia do Rio Madeira",   river: "Rio Madeira",    x: 260, y: 280, risk: "fail",  level: 0,   rain7: 243, state: "AM/RO", risk_type: "Falha de sensor" },
  { id: "SFR-03", name: "Estação São Francisco-03", city: "Juazeiro", region: "Bacia do Rio São Francisco", river: "Rio São Francisco", x: 580, y: 215, risk: "med",   level: 31,  rain7: 48,  state: "MG/BA/PE", risk_type: "Escassez hídrica" },
  { id: "PAN-04", name: "Estação Paraguai-04", city: "Corumbá",       region: "Pantanal Alto Paraguai", river: "Rio Paraguai",   x: 360, y: 390, risk: "high",  level: 28,  rain7: 36,  state: "MS/MT", risk_type: "Seca e variação" },
  { id: "REC-05", name: "Estação Recife-05",  city: "Recife",        region: "Recife Metropolitana",   river: "Bacia urbana",   x: 710, y: 210, risk: "high",  level: 421, rain7: 198, state: "PE", risk_type: "Alagamento urbano" },
  { id: "DOC-06", name: "Estação Doce-06",   city: "Gov. Valadares", region: "Bacia do Rio Doce",      river: "Rio Doce",       x: 610, y: 360, risk: "med",   level: 298, rain7: 118, state: "MG/ES", risk_type: "Pressão hídrica" },
  { id: "AMZ-07", name: "Estação Solimões-07",city: "Manaus",        region: "Bacia do Rio Amazonas",  river: "Rio Solimões",   x: 220, y: 190, risk: "low",   level: 1240,rain7: 152, state: "AM", risk_type: "Comportamento normal" },
  { id: "SSE-08", name: "Estação Costeira-08",city: "Angra dos Reis",region: "Litoral Sudeste",        river: "Estação Costeira",x: 550, y: 440, risk: "fail",  level: 0,   rain7: 0,   state: "RJ", risk_type: "Falha de sensor" }
];

export const REGIONS: string[] = [
  "Todas as regiões",
  "Bacia Taquari-Antas",
  "Bacia do Rio Madeira",
  "Bacia do Rio São Francisco",
  "Pantanal Alto Paraguai",
  "Recife Metropolitana",
  "Bacia do Rio Doce",
  "Bacia do Rio Amazonas",
  "Litoral Sudeste"
];

export const SUB_STATIONS: Record<string, SubStation[]> = {
  "Bacia Taquari-Antas": [
    { st: "Taquari-01", city: "Lajeado",   river: "Rio Taquari", lvl: 685, d24: 112, r7: 261, risk: "crit" },
    { st: "Taquari-02", city: "Estrela",   river: "Rio Taquari", lvl: 612, d24: 96,  r7: 248, risk: "crit" },
    { st: "Taquari-03", city: "Encantado", river: "Rio Taquari", lvl: 498, d24: 71,  r7: 216, risk: "high" }
  ],
  "Bacia do Rio Madeira": [
    { st: "Madeira-02", city: "Porto Velho", river: "Rio Madeira", lvl: 0,   d24: -100, r7: 243, risk: "fail" },
    { st: "Madeira-01", city: "Abunã",       river: "Rio Madeira", lvl: 495, d24: 72,  r7: 220, risk: "high" },
    { st: "Madeira-03", city: "Humaitá",     river: "Rio Madeira", lvl: 380, d24: 45,  r7: 185, risk: "med" }
  ],
  "Bacia do Rio São Francisco": [
    { st: "SF-03", city: "Juazeiro",  river: "Rio São Francisco", lvl: 31,  d24: -6,  r7: 48, risk: "med" },
    { st: "SF-01", city: "Pirapora",  river: "Rio São Francisco", lvl: 38,  d24: -4,  r7: 35, risk: "low" },
    { st: "SF-02", city: "Petrolina", river: "Rio São Francisco", lvl: 33,  d24: -5,  r7: 42, risk: "med" }
  ],
  "Pantanal Alto Paraguai": [
    { st: "Paraguai-04", city: "Corumbá", river: "Rio Paraguai", lvl: 28,  d24: -4,  r7: 36, risk: "high" },
    { st: "Paraguai-01", city: "Cáceres", river: "Rio Paraguai", lvl: 34,  d24: -3,  r7: 29, risk: "med" },
    { st: "Paraguai-02", city: "Ladário", river: "Rio Paraguai", lvl: 30,  d24: -4,  r7: 32, risk: "high" }
  ],
  "Recife Metropolitana": [
    { st: "Recife-05", city: "Recife",    river: "Bacia urbana", lvl: 421, d24: 61,  r7: 198, risk: "high" },
    { st: "Recife-01", city: "Olinda",    river: "Bacia urbana", lvl: 385, d24: 55,  r7: 172, risk: "high" },
    { st: "Recife-02", city: "Jaboatão",  river: "Bacia urbana", lvl: 290, d24: 38,  r7: 145, risk: "med" }
  ],
  "Bacia do Rio Doce": [
    { st: "Doce-06", city: "Gov. Valadares", river: "Rio Doce", lvl: 298, d24: 18,  r7: 118, risk: "med" },
    { st: "Doce-01", city: "Colatina",       river: "Rio Doce", lvl: 275, d24: 12,  r7: 95,  risk: "med" },
    { st: "Doce-02", city: "Ipatinga",       river: "Rio Doce", lvl: 210, d24: 8,   r7: 84,  risk: "low" }
  ],
  "Bacia do Rio Amazonas": [
    { st: "Solimões-07", city: "Manaus",     river: "Rio Solimões", lvl: 1240, d24: 12, r7: 152, risk: "low" }
  ],
  "Litoral Sudeste": [
    { st: "Costeira-08", city: "Angra dos Reis", river: "Estação Costeira", lvl: 0, d24: 0, r7: 0, risk: "fail" }
  ]
};
