import React from "react";
import { PageHeader } from "../components/ui/PageHeader";
import { DISCIPLINES } from "../data/disciplines";
import { 
  Database, 
  TrendingUp, 
  Layers, 
  Cpu, 
  Zap, 
  Calendar, 
  Shield, 
  Sparkles,
  Check 
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Database: <Database size={16} />,
  TrendingUp: <TrendingUp size={16} />,
  Layers: <Layers size={16} />,
  Cpu: <Cpu size={16} />,
  Zap: <Zap size={16} />,
  Calendar: <Calendar size={16} />,
  Shield: <Shield size={16} />
};

export const DacArticulation: React.FC = () => {
  return (
    <div className="page">
      <PageHeader 
        category="DAC • 5º SEMESTRE" 
        title="Articulação com o DAC" 
        subtitle="Como as disciplinas do semestre se conectam à proposta do HidroIA Brasil."
        rightElement={
          <span className="chip" style={{ padding: "4px 10px", fontSize: 11, background: "var(--cyan-soft)", color: "var(--cyan)", border: "1px solid var(--cyan)" }}>
            INTEGRAÇÃO ACADÊMICA
          </span>
        }
      />

      {/* Main integration card */}
      <div className="card" style={{
        background: "linear-gradient(135deg, oklch(0.18 0.03 238), oklch(0.14 0.02 238))",
        border: "1px solid var(--border-soft)",
        padding: 24,
        marginBottom: 20,
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute", top: "-20%", right: "-10%", width: 300, height: 300,
          background: "radial-gradient(circle, var(--cyan-soft) 0%, transparent 70%)",
          opacity: 0.6, pointerEvents: "none"
        }} />
        <div className="row" style={{ gap: 12, marginBottom: 12 }}>
          <span style={{ color: "var(--cyan)", display: "flex", alignItems: "center" }}>
            <Sparkles size={18} />
          </span>
          <div className="card-title" style={{ fontSize: 18, fontWeight: 600 }}>Integração Geral do Projeto</div>
        </div>
        <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.6, margin: 0 }}>
          O HidroIA Brasil foi desenvolvido como um artefato prático que materializa e consolida as competências exigidas no Desafio de Articulação de Competências (DAC) da Ciência da Computação. O projeto vai além do código bruto: ele conecta sensores eletrônicos simulados, engenharia de algoritmos de alta eficiência, paralelização em grande escala, rigoroso controle de projeto e autonomia intelectual para criar um painel dinâmico que atende a diretrizes reais de sustentabilidade e defesa civil no Brasil.
        </p>
      </div>

      {/* Grid of subjects */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
        gap: 20,
        marginBottom: 24
      }}>
        {DISCIPLINES.map((s, idx) => (
          <div key={idx} className="card" style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 20,
            border: "1px solid var(--border-soft)",
            background: "var(--card-bg)"
          }}>
            <div>
              <div className="row" style={{ justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <span className="mono" style={{ fontSize: 28, fontWeight: 700, opacity: 0.15, lineHeight: 1 }}>{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</span>
                <span className="chip" style={{
                  padding: "2px 8px",
                  fontSize: 10,
                  fontWeight: 600,
                  background: `${s.badgeColor}1a`,
                  color: s.badgeColor,
                  border: `1px solid ${s.badgeColor}33`
                }}>
                  {s.badge}
                </span>
              </div>

              <div className="row" style={{ gap: 8, marginBottom: 10 }}>
                <span style={{ color: s.badgeColor, display: "flex", alignItems: "center" }}>
                  {iconMap[s.iconName] || <Cpu size={16} />}
                </span>
                <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>{s.name}</h3>
              </div>

              <p className="small" style={{ lineHeight: 1.5, color: "var(--text-2)", marginBottom: 14 }}>
                {s.summary}
              </p>
            </div>

            <div>
              <div className="card-eyebrow" style={{ marginBottom: 6, fontSize: 10 }}>Tópicos Articulados</div>
              <ul style={{ margin: 0, paddingLeft: 16, display: "flex", flexDirection: "column", gap: 5 }}>
                {s.topics.map((p, pIdx) => (
                  <li key={pIdx} className="small" style={{ color: "var(--text)", lineHeight: 1.4 }}>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Synthesis section */}
      <div className="card" style={{
        background: "linear-gradient(180deg, var(--cyan-soft) 0%, transparent 100%)",
        border: "1px solid var(--cyan-soft)",
        padding: 24
      }}>
        <div className="row" style={{ gap: 8, marginBottom: 10 }}>
          <span style={{ color: "var(--cyan)", display: "flex", alignItems: "center" }}>
            <Check size={16} />
          </span>
          <div className="card-title" style={{ fontSize: 16, fontWeight: 600 }}>Síntese da Articulação</div>
        </div>
        <p style={{ fontSize: 14, color: "var(--text)", lineHeight: 1.6, margin: 0 }}>
          O HidroIA Brasil integra as competências do semestre ao transformar dados ambientais brutos em uma solução tecnológica de análise, visualização e apoio à decisão. A proposta une ciência de dados, algoritmos, estruturas de dados, eletrônica digital, paralelismo, gestão de projetos e autonomia intelectual em um protótipo acadêmico voltado à sustentabilidade e ao impacto social.
        </p>
      </div>
    </div>
  );
};
