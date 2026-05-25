import React from "react";
import { Shield } from "lucide-react";

interface WarningBoxProps {
  style?: React.CSSProperties;
}

export const WarningBox: React.FC<WarningBoxProps> = ({ style }) => {
  return (
    <div className="card" style={{
      background: "oklch(0.18 0.015 238 / 0.4)",
      borderColor: "var(--border-soft)",
      padding: "20px 24px",
      ...style
    }}>
      <div className="row" style={{ gap: 8, marginBottom: 8, color: "var(--muted)" }}>
        <Shield size={16} />
        <span style={{ fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Limitações do Escopo Conceitual
        </span>
      </div>
      <p className="small" style={{ margin: 0, lineHeight: 1.6, color: "var(--muted)" }}>
        Este sistema é uma <strong>plataforma conceitual com dados simulados</strong> para fins didáticos (DAC - 5º Semestre). A plataforma opera com cenários pré-configurados, sem coleta em tempo real ou integração física com servidores da ANA ou do INMET. Os modelos de Inteligência Artificial (K-Means, Isolation Forest e PCA) são <strong>representados graficamente de forma conceitual</strong>. O HidroIA atua como simulador conceitual de apoio à decisão, <strong>não devendo ser utilizado</strong> para previsões operacionais de desastres ou como substituto dos boletins oficiais emitidos pelos órgãos de Defesa Civil e especialistas em hidrologia.
      </p>
    </div>
  );
};
