import React from "react";
import type { Station } from "../../types/hydro";


interface BrazilSensorMapProps {
  height?: number | string;
  selectedId?: string | null;
  onSelectStation?: (s: Station) => void;
  showLabels?: boolean;
  compact?: boolean;
  stations: Station[];
}

const BRAZIL_OUTLINE_PATH = "M 380,80 C 420,75 480,90 560,110 C 620,130 670,140 700,165 C 730,190 735,220 720,250 C 700,290 650,330 620,380 C 590,430 550,470 510,505 C 490,522 470,522 460,510 C 445,490 440,470 425,450 C 410,430 360,420 330,390 C 290,350 210,340 130,310 C 90,295 100,240 140,200 C 180,160 260,120 340,90 Z";

const RIVER_PATHS = [
  "M 150,210 C 250,200 350,180 470,160 C 580,140 640,150 700,165", // Rio Amazonas principal
  "M 220,330 C 240,290 280,260 350,210",                         // Rio Madeira
  "M 480,320 C 500,270 540,210 590,200 C 640,190 670,210 700,215", // Rio São Francisco
  "M 330,390 C 370,410 410,430 435,460 C 450,480 460,510 460,510", // Rio Paraguai / Bacia do Prata
  "M 560,370 C 590,365 620,375 640,360",                         // Rio Doce
  "M 465,480 C 480,485 490,490 495,505 C 490,515 475,515 470,510"  // Rio Taquari-Antas
];

export const BrazilSensorMap: React.FC<BrazilSensorMapProps> = ({
  height = 520,
  selectedId = null,
  onSelectStation = () => {},
  showLabels = true,
  compact = false,
  stations
}) => {
  const riskFill: Record<string, string> = {
    low:  "var(--risk-low)",
    med:  "var(--risk-med)",
    high: "var(--risk-high)",
    crit: "var(--risk-crit)",
    fail: "var(--risk-fail)",
  };

  return (
    <div className="map-wrap" style={{ height }}>
      <div className="map-grid"></div>
      <svg className="map-svg" viewBox="0 0 800 560" preserveAspectRatio="xMidYMid meet"
           style={{ height: "100%" }}>
        <defs>
          <linearGradient id="brFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="oklch(0.30 0.05 220)" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="oklch(0.22 0.04 230)" stopOpacity="0.4"/>
          </linearGradient>
          <linearGradient id="riverGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="oklch(0.82 0.12 195)" stopOpacity="0.55"/>
            <stop offset="100%" stopColor="oklch(0.78 0.13 210)" stopOpacity="0.75"/>
          </linearGradient>
          <radialGradient id="critGlow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%"  stopColor="oklch(0.66 0.22 25)" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="oklch(0.66 0.22 25)" stopOpacity="0"/>
          </radialGradient>
        </defs>

        {/* Topo contours (abstract) */}
        {[0.92, 0.84, 0.76, 0.68].map((s, i) => (
          <path key={i} d={BRAZIL_OUTLINE_PATH}
                transform={`translate(${(1-s)*400}, ${(1-s)*280}) scale(${s})`}
                fill="none"
                stroke="oklch(1 0 0 / 0.04)"
                strokeWidth="1"/>
        ))}

        {/* State outline */}
        <path d={BRAZIL_OUTLINE_PATH}
              fill="url(#brFill)"
              stroke="oklch(0.78 0.13 210 / 0.45)"
              strokeWidth="1.2"/>

        {/* Rivers */}
        {RIVER_PATHS.map((d, i) => (
          <path key={i} d={d}
                fill="none"
                stroke="url(#riverGrad)"
                strokeWidth="2.2"
                strokeLinecap="round"
                opacity="0.85"/>
        ))}

        {/* "BR" watermark */}
        {!compact && (
          <text x="430" y="270" fontSize="72" fontWeight="700"
                fontFamily="Space Grotesk"
                fill="oklch(1 0 0 / 0.025)"
                letterSpacing="8">BR</text>
        )}

        {/* Capital pin - Brasília */}
        <g transform="translate(480, 280)">
          <circle r="14" fill="oklch(0.78 0.13 210 / 0.18)"/>
          <circle r="3.5" fill="var(--cyan)"/>
          {showLabels && (
            <text x="10" y="-8" fontSize="10" fontFamily="JetBrains Mono"
                  fill="var(--text-2)">Brasília</text>
          )}
        </g>

        {/* Stations */}
        {stations.map(s => {
          const selected = s.id === selectedId;
          const isCrit = s.risk === "crit";
          return (
            <g key={s.id} className="station-dot"
               onClick={() => onSelectStation(s)}
               transform={`translate(${s.x}, ${s.y})`}>
              {isCrit && <circle r="22" fill="url(#critGlow)">
                <animate attributeName="r" values="18;26;18" dur="2.4s" repeatCount="indefinite"/>
              </circle>}
              <circle r={selected ? 9 : 7}
                       fill="oklch(0.15 0.025 240)"
                       stroke={riskFill[s.risk]}
                       strokeWidth="2"/>
              <circle r={selected ? 4 : 3} fill={riskFill[s.risk]}/>
              {selected && (
                <circle r="14" fill="none" stroke="var(--cyan)" strokeWidth="1.5" strokeDasharray="3 3">
                  <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="8s" repeatCount="indefinite"/>
                </circle>
              )}
            </g>
          );
        })}

        {/* compass / scale */}
        {!compact && (
          <g transform="translate(720, 500)" fontFamily="JetBrains Mono" fontSize="9" fill="var(--muted)">
            <line x1="0" y1="0" x2="40" y2="0" stroke="var(--muted)"/>
            <line x1="0" y1="-3" x2="0" y2="3" stroke="var(--muted)"/>
            <line x1="40" y1="-3" x2="40" y2="3" stroke="var(--muted)"/>
            <text x="44" y="3">~ 1000 km</text>
            <g transform="translate(-20, -40)">
              <text x="0" y="0" textAnchor="middle" fill="var(--text-2)">N</text>
              <path d="M0,2 L-4,12 L0,8 L4,12 Z" fill="var(--cyan)"/>
            </g>
          </g>
        )}
      </svg>

      {/* Disclaimer */}
      <div style={{
        position: "absolute", bottom: 10, left: 12,
        fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--muted-2)",
        letterSpacing: "0.06em", textTransform: "uppercase"
      }}>
        Mapa esquemático — protótipo acadêmico
      </div>
    </div>
  );
};

export const RiskLegendInline: React.FC = () => {
  const items = [
    { k: "low",  label: "Normal" },
    { k: "med",  label: "Atenção" },
    { k: "high", label: "Atípico" },
    { k: "crit", label: "Anomalia" },
    { k: "fail", label: "Falha" },
  ];
  return (
    <div className="row" style={{ gap: 18, flexWrap: "wrap" }}>
      <span className="mono small" style={{ letterSpacing: "0.08em" }}>LEGENDA</span>
      {items.map(it => (
        <div key={it.k} className="row" style={{ gap: 8 }}>
          <span style={{
            width: 8, height: 8, borderRadius: 999,
            background: `var(--risk-${it.k})`,
            boxShadow: `0 0 0 3px var(--risk-${it.k}-bg)`
          }}/>
          <span className="small" style={{ color: "var(--text-2)" }}>{it.label}</span>
        </div>
      ))}
    </div>
  );
};

export const RiskLegend: React.FC<{ orientation?: "horizontal" | "vertical" }> = ({ orientation = "horizontal" }) => {
  const items = [
    { k: "low",  label: "Baixo",    note: "≤ 30 % de probabilidade" },
    { k: "med",  label: "Atenção",  note: "30 – 55 %" },
    { k: "high", label: "Alto",     note: "55 – 80 %" },
    { k: "crit", label: "Crítico",  note: "> 80 %" },
  ];
  return (
    <div className="card" style={{ padding: 14 }}>
      <div className="card-eyebrow">Legenda · níveis de risco</div>
      <div style={{
        display: "grid",
        gridTemplateColumns: orientation === "horizontal" ? "repeat(4, 1fr)" : "1fr",
        gap: 10, marginTop: 6,
      }}>
        {items.map(it => (
          <div key={it.k} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{
              width: 10, height: 10, borderRadius: 999,
              background: `var(--risk-${it.k})`,
              boxShadow: `0 0 0 4px var(--risk-${it.k}-bg)`
            }}/>
            <div>
              <div style={{ fontSize: 12, fontWeight: 500 }}>{it.label}</div>
              <div className="mono small" style={{ fontSize: 10 }}>{it.note}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
