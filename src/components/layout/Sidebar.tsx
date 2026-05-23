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
  group: "PLATAFORMA" | "INTELIGÊNCIA" | "DADOS" | "DAC";
}

export const NAV_ITEMS: NavItem[] = [
  { k: "landing",    label: "Página inicial",                     iconName: "Home",           crumb: "INÍCIO",                  group: "PLATAFORMA" },
  { k: "dashboard",  label: "Dashboard nacional",                 iconName: "BarChart2",       crumb: "DASHBOARD NACIONAL",      group: "PLATAFORMA" },
  { k: "clustering", label: "Análise de clusters (K-Means)",      iconName: "Layers",         crumb: "AGRUPAMENTO K-MEANS",     group: "INTELIGÊNCIA" },
  { k: "anomalies",  label: "Detecção de anomalias (Iso Forest)", iconName: "AlertTriangle",  crumb: "DETECÇÃO DE ANOMALIAS",    group: "INTELIGÊNCIA" },
  { k: "ai",         label: "Metodologia de IA",                  iconName: "Cpu",            crumb: "METODOLOGIA DE IA",       group: "INTELIGÊNCIA" },
  { k: "rec",        label: "Recomendações de mitigação",         iconName: "Shield",         crumb: "MITIGAÇÃO",               group: "INTELIGÊNCIA" },
  { k: "dac",        label: "Articulação com o DAC",              iconName: "GraduationCap",  crumb: "DAC • ARTICULAÇÃO",       group: "DAC" },
  { k: "data",       label: "Base de dados consolidada",          iconName: "Database",       crumb: "BASE DE DADOS",           group: "DADOS" },
];

const iconMap: Record<string, React.ReactNode> = {
  Home: <Home size={16} />,
  BarChart2: <BarChart2 size={16} />,
  Layers: <Layers size={16} />,
  AlertTriangle: <AlertTriangle size={16} />,
  Cpu: <Cpu size={16} />,
  Shield: <Shield size={16} />,
  GraduationCap: <GraduationCap size={16} />,
  Database: <Database size={16} />
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
        <WaterDropLogo />
        <div>
          <div className="brand-name">Hidro<span>IA</span></div>
          <div className="brand-sub">monitoramento hídrico</div>
        </div>
      </div>
      <nav className="nav">
        {NAV_ITEMS.map((item, idx) => {
          const showHeader = idx === 0 || item.group !== NAV_ITEMS[idx - 1].group;
          return (
            <React.Fragment key={item.k}>
              {showHeader && <div className="nav-section">{item.group}</div>}
              <button className={`nav-item ${route === item.k ? "active" : ""}`}
                      onClick={() => go(item.k)}>
                <span className="ico">{iconMap[item.iconName]}</span>
                <span>{item.label}</span>
              </button>
            </React.Fragment>
          );
        })}
      </nav>
      <div className="nav-foot">
        <strong>Protótipo acadêmico</strong><br/>
        Desafio de Articulação de Competências<br/>
        Ciência da Computação — 5º semestre
        <div className="mono" style={{ marginTop: 8, fontSize: 10, letterSpacing: "0.04em", color: "var(--muted-2)", lineHeight: 1.4 }}>
          FONTES CONCEITUAIS: ANA E INMET
        </div>
        <div className="mono" style={{ marginTop: 4, fontSize: 9, color: "var(--risk-med)", letterSpacing: "0.02em" }}>
          DADOS SIMULADOS PARA APRESENTAÇÃO
        </div>
      </div>
    </aside>
  );
};
