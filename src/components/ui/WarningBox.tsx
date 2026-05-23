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
          Limitações do Protótipo Acadêmico
        </span>
      </div>
      <p className="small" style={{ margin: 0, lineHeight: 1.6, color: "var(--muted)" }}>
        Este sistema é um <strong>protótipo frontend-only com dados 100% simulados</strong> para fins de demonstração acadêmica (DAC - 5º Semestre). A plataforma <strong>não possui backend</strong> ativo, não realiza chamadas em tempo real ou integração física com os servidores da ANA ou do INMET, e seus algoritmos de Inteligência Artificial (K-Means, Isolation Forest, DBSCAN e PCA) são <strong>representados de forma conceitual</strong> na interface gráfica. O HidroIA Brasil foi concebido puramente como uma ferramenta educacional de apoio à decisão, <strong>não devendo ser utilizado</strong> para previsões reais de desastres ou como substituto dos boletins oficiais emitidos pelos órgãos de Defesa Civil e especialistas em hidrologia.
      </p>
    </div>
  );
};
