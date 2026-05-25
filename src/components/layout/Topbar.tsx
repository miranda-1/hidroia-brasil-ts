import React, { useState } from "react";
import { RefreshCw, Bell, Calendar } from "lucide-react";
import { NAV_ITEMS } from "./Sidebar";

interface TopbarProps {
  route: string;
}

export const Topbar: React.FC<TopbarProps> = ({ route }) => {
  const [updating, setUpdating] = useState(false);
  const [scenarioBaseAt, setScenarioBaseAt] = useState<Date>(new Date(2024, 4, 2, 8, 30));
  const item = NAV_ITEMS.find(n => n.k === route) || NAV_ITEMS[1];

  const formattedScenarioBase = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).format(scenarioBaseAt).replace(",", " ·");

  const handleRefresh = () => {
    setUpdating(true);
    setScenarioBaseAt(new Date());
    setTimeout(() => {
      setUpdating(false);
    }, 800);
  };

  return (
    <div className="topbar">
      <span className="topbar-crumb">HIDROIA · {item.crumb}</span>
      <div style={{ width: 1, height: 16, background: "var(--border-soft)" }}/>
      <span className="topbar-title">{item.label}</span>
      <div className="topbar-spacer"/>
      
      <span className="row" style={{ gap: 6 }}>
        <span className="live-dot"/>
        <span className="mono" style={{ fontSize: 11, color: "var(--text-2)" }}>SIMULADO</span>
      </span>

      <div className="topbar-meta">
        <Calendar size={12} />
        <span>Cenário-base: {formattedScenarioBase}</span>
      </div>

      <button className="btn btn-sm" onClick={handleRefresh} disabled={updating}>
        <RefreshCw size={12} className={updating ? "animate-spin" : ""} />
        <span>{updating ? "Atualizando..." : "Atualizar"}</span>
      </button>

      <button className="btn btn-sm btn-ghost">
        <Bell size={12} />
      </button>
    </div>
  );
};
