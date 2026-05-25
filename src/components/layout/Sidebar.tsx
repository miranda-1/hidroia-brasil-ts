/* eslint-disable react-refresh/only-export-components */
import React from "react";
import {
  Home,
  BarChart2,
  Layers,
  AlertTriangle,
  Cpu,
  Shield,
  Database,
  GraduationCap
} from "lucide-react";

export interface NavItem {
  k: string;
  label: string;
  iconName: string;
  crumb: string;
  group: "PLATAFORMA" | "ANÁLISES DE IA" | "DOCUMENTAÇÃO";
}

export const NAV_ITEMS: NavItem[] = [
  { k: "landing",    label: "Página inicial",         iconName: "Home",          crumb: "INÍCIO",                  group: "PLATAFORMA" },
  { k: "dashboard",  label: "Dashboard nacional",     iconName: "BarChart2",     crumb: "DASHBOARD NACIONAL",      group: "PLATAFORMA" },
  { k: "data",       label: "Base de dados",          iconName: "Database",      crumb: "BASE DE DADOS",           group: "PLATAFORMA" },
  { k: "clustering", label: "Clusters e padrões",     iconName: "Layers",        crumb: "CLUSTERS E PADRÕES",      group: "ANÁLISES DE IA" },
  { k: "anomalies",  label: "Anomalias",              iconName: "AlertTriangle", crumb: "DETECÇÃO DE ANOMALIAS",    group: "ANÁLISES DE IA" },
  { k: "rec",        label: "Recomendações",          iconName: "Shield",        crumb: "RECOMENDAÇÕES",           group: "ANÁLISES DE IA" },
  { k: "ai",         label: "Metodologia de IA",      iconName: "Cpu",           crumb: "METODOLOGIA DE IA",       group: "DOCUMENTAÇÃO" },
  { k: "dac",        label: "Articulação DAC",        iconName: "GraduationCap", crumb: "ARTICULAÇÃO DAC",         group: "DOCUMENTAÇÃO" }
];

const iconMap: Record<string, React.ReactNode> = {
  Home: <Home size={15} />,
  BarChart2: <BarChart2 size={15} />,
  Layers: <Layers size={15} />,
  AlertTriangle: <AlertTriangle size={15} />,
  Cpu: <Cpu size={15} />,
  Shield: <Shield size={15} />,
  GraduationCap: <GraduationCap size={15} />,
  Database: <Database size={15} />
};

interface SidebarProps {
  route: string;
  go: (k: string) => void;
}

import { WaterDropLogo } from "../ui/WaterDropLogo";

export const Sidebar: React.FC<SidebarProps> = ({ route, go }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <aside 
      className="sidebar"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="brand">
        <WaterDropLogo size={28} />
        <div>
          <div className="brand-name" style={{ fontSize: "15px" }}>Hidro<span>IA</span></div>
          <div className="brand-sub" style={{ fontSize: "8.5px" }}>ANÁLISE HIDROMETEOROLÓGICA</div>
        </div>
      </div>
      <nav className="nav">
        {NAV_ITEMS.map((item, idx) => {
          const showHeader = idx === 0 || item.group !== NAV_ITEMS[idx - 1].group;
          return (
            <React.Fragment key={item.k}>
              {showHeader && (
                <div 
                  className="nav-section"
                  style={{
                    marginTop: idx > 0 ? "14px" : "4px",
                    borderTop: idx > 0 ? "1px solid oklch(0.78 0.13 210 / 0.1)" : "none",
                    paddingTop: idx > 0 ? "14px" : "4px"
                  }}
                >
                  {item.group}
                </div>
              )}
              <button 
                className={`nav-item ${route === item.k ? "active" : ""}`}
                onClick={() => go(item.k)}
                title={isHovered ? "" : item.label}
              >
                <span className="ico">{iconMap[item.iconName]}</span>
                <span>{item.label}</span>
              </button>
            </React.Fragment>
          );
        })}
      </nav>
      <div className="nav-foot" style={{ padding: "10px", fontSize: "11px", borderRadius: "10px", border: "1px solid var(--border-soft)", background: "oklch(1 0 0 / 0.015)" }}>
        <strong style={{ color: "var(--text)" }}>Plataforma Conceitual</strong>
        <div style={{ color: "var(--muted)", marginTop: 4, fontSize: "10.5px" }}>DAC • 5º semestre</div>
        <div className="mono" style={{ marginTop: 6, fontSize: "8.5px", color: "var(--cyan)", fontWeight: 600, letterSpacing: "0.02em" }}>
          DADOS SIMULADOS
        </div>
        <div className="mono" style={{ marginTop: 3, fontSize: "8px", color: "var(--risk-med)", fontWeight: 600, letterSpacing: "0.02em" }}>
          CENÁRIO CONCEITUAL
        </div>
      </div>
    </aside>
  );
};
