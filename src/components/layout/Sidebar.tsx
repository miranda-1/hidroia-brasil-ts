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
  GraduationCap,
  TrendingUp
} from "lucide-react";

export interface NavItem {
  k: string;
  label: string;
  iconName: string;
  crumb: string;
  group: "PLATAFORMA" | "INTELIGÊNCIA" | "DAC";
}

export const NAV_ITEMS: NavItem[] = [
  { k: "landing",    label: "Página inicial",         iconName: "Home",          crumb: "INÍCIO",                  group: "PLATAFORMA" },
  { k: "dashboard",  label: "Dashboard nacional",     iconName: "BarChart2",     crumb: "DASHBOARD NACIONAL",      group: "PLATAFORMA" },
  { k: "data",       label: "Base de dados",          iconName: "Database",      crumb: "BASE DE DADOS",           group: "PLATAFORMA" },
  { k: "clustering", label: "Clusters K-Means",       iconName: "Layers",        crumb: "AGRUPAMENTO K-MEANS",     group: "INTELIGÊNCIA" },
  { k: "forecast",   label: "Previsão conceitual",    iconName: "TrendingUp",    crumb: "PREVISÃO CONCEITUAL",     group: "INTELIGÊNCIA" },
  { k: "anomalies",  label: "Anomalias Iso Forest",   iconName: "AlertTriangle", crumb: "DETECÇÃO DE ANOMALIAS",    group: "INTELIGÊNCIA" },
  { k: "ai",         label: "Metodologia de IA",      iconName: "Cpu",           crumb: "METODOLOGIA DE IA",       group: "INTELIGÊNCIA" },
  { k: "rec",        label: "Recomendações",          iconName: "Shield",        crumb: "MITIGAÇÃO",               group: "INTELIGÊNCIA" },
  { k: "dac",        label: "Articulação acadêmica",  iconName: "GraduationCap", crumb: "DAC • ARTICULAÇÃO",       group: "DAC" }
];

const iconMap: Record<string, React.ReactNode> = {
  Home: <Home size={15} />,
  BarChart2: <BarChart2 size={15} />,
  Layers: <Layers size={15} />,
  AlertTriangle: <AlertTriangle size={15} />,
  Cpu: <Cpu size={15} />,
  Shield: <Shield size={15} />,
  GraduationCap: <GraduationCap size={15} />,
  Database: <Database size={15} />,
  TrendingUp: <TrendingUp size={15} />
};

interface SidebarProps {
  route: string;
  go: (k: string) => void;
}

import { WaterDropLogo } from "../ui/WaterDropLogo";

export const Sidebar: React.FC<SidebarProps> = ({ route, go }) => {
  return (
    <aside className="sidebar">
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
              {showHeader && <div className="nav-section">{item.group}</div>}
              <button className={`nav-item ${route === item.k ? "active" : ""}`}
                      onClick={() => go(item.k)}
                      title={item.label}>
                <span className="ico">{iconMap[item.iconName]}</span>
                <span>{item.label}</span>
              </button>
            </React.Fragment>
          );
        })}
      </nav>
      <div className="nav-foot" style={{ padding: "10px", fontSize: "11px", borderRadius: "10px", border: "1px solid var(--border-soft)", background: "oklch(1 0 0 / 0.015)" }}>
        <strong style={{ color: "var(--text)" }}>Protótipo acadêmico</strong>
        <div style={{ color: "var(--muted)", marginTop: 4, fontSize: "10.5px" }}>DAC • 5º semestre</div>
        <div className="mono" style={{ marginTop: 6, fontSize: "8.5px", color: "var(--cyan)", fontWeight: 600, letterSpacing: "0.02em" }}>
          DADOS SIMULADOS
        </div>
        <div className="mono" style={{ marginTop: 3, fontSize: "8px", color: "var(--risk-high)", fontWeight: 600, letterSpacing: "0.02em" }}>
          SEM INTEGRAÇÃO REAL
        </div>
      </div>
    </aside>
  );
};
