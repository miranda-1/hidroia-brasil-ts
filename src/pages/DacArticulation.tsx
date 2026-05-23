import React, { useState } from "react";
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
  Check,
  Info,
  ArrowRight
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

export const DacArticulation: React.FC<{ go?: (route: string) => void }> = ({ go }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="page">
      <PageHeader 
        category="DAC • 5º SEMESTRE" 
        title="Articulação com o DAC" 
        subtitle="Como as disciplinas do semestre se conectam à proposta do HidroIA."
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
          O HidroIA foi desenvolvido como um artefato prático que materializa e consolida as competências exigidas no Desafio de Articulação de Competências (DAC) da Ciência da Computação. O projeto vai além do código bruto: ele conecta sensores eletrônicos simulados, engenharia de algoritmos de alta eficiência, paralelização em grande escala, rigoroso controle de projeto e autonomia intelectual para criar um painel dinâmico que atende a diretrizes reais de sustentabilidade e defesa civil no Brasil.
        </p>
      </div>

      {/* Grid of subjects */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
        gap: 20,
        marginBottom: 24
      }}>
        {DISCIPLINES.map((s, idx) => {
          const isClickable = !!s.targetRoute;
          const isHovered = hoveredId === s.id;
          const isExpanded = expandedId === s.id;

          return (
            <div 
              key={idx} 
              className="card" 
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: 20,
                background: "var(--card-bg)",
                border: isHovered && isClickable ? "1px solid var(--cyan)" : "1px solid var(--border-soft)",
                boxShadow: isHovered && isClickable ? "0 0 16px var(--cyan-soft)" : "var(--shadow-card)",
                cursor: isClickable ? "pointer" : "default",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: isHovered && isClickable ? "translateY(-2px)" : "none"
              }}
              onMouseEnter={() => isClickable && setHoveredId(s.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => {
                if (isClickable && go) {
                  go(s.targetRoute!);
                }
              }}
            >
              <div>
                <div className="row" style={{ justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <span className="mono" style={{ fontSize: 28, fontWeight: 700, opacity: 0.15, lineHeight: 1 }}>{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</span>
                  <div className="row" style={{ gap: 8, alignItems: "center" }}>
                    {/* Botão de Informações "Como usamos?" */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedId(isExpanded ? null : s.id);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        padding: "2px 8px",
                        fontSize: 10,
                        fontWeight: 600,
                        borderRadius: 4,
                        background: isExpanded ? "var(--cyan-soft)" : "transparent",
                        color: isExpanded ? "var(--cyan)" : "var(--text-3)",
                        border: `1px solid ${isExpanded ? "var(--cyan)" : "var(--border-soft)"}`,
                        cursor: "pointer",
                        transition: "all 0.2s ease"
                      }}
                      title="Como usamos esta disciplina no projeto?"
                    >
                      <Info size={11} />
                      <span>Como usamos?</span>
                    </button>

                    {/* Badge da Disciplina */}
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

                {/* Caixa explicativa de aplicação da disciplina no HidroIA */}
                {isExpanded && (
                  <div 
                    style={{
                      marginTop: 8,
                      marginBottom: 14,
                      padding: 12,
                      borderRadius: 6,
                      background: "oklch(0.14 0.02 238 / 0.7)",
                      border: "1px solid var(--cyan-soft)",
                      borderLeft: "3px solid var(--cyan)",
                      transition: "all 0.3s ease"
                    }}
                    onClick={(e) => e.stopPropagation()} // impede cliques na caixa explicativa de navegarem
                  >
                    <div style={{ fontSize: 10, fontWeight: 600, color: "var(--cyan)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Aplicação Prática no HidroIA:
                    </div>
                    <p className="small" style={{ color: "var(--text)", lineHeight: 1.4, margin: 0 }}>
                      {s.applicationText}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <div style={{ marginBottom: 12 }}>
                  <div className="card-eyebrow" style={{ marginBottom: 6, fontSize: 10 }}>Tópicos Articulados</div>
                  <ul style={{ margin: 0, paddingLeft: 16, display: "flex", flexDirection: "column", gap: 5 }}>
                    {s.topics.map((p, pIdx) => (
                      <li key={pIdx} className="small" style={{ color: "var(--text)", lineHeight: 1.4 }}>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Indicação visual de destino */}
                <div style={{ marginTop: 16, paddingTop: 12, borderTop: "1px solid var(--border-soft)" }}>
                  {isClickable ? (
                    <div 
                      className="row" 
                      style={{ 
                        justifyContent: "space-between", 
                        alignItems: "center", 
                        color: isHovered ? "var(--cyan)" : "var(--text-2)", 
                        transition: "all 0.2s ease" 
                      }}
                    >
                      <span style={{ fontSize: 11, fontWeight: 600 }}>{s.visualIndication || "Abrir módulo aplicado"}</span>
                      <ArrowRight 
                        size={14} 
                        style={{
                          transform: isHovered ? "translateX(4px)" : "translateX(0)",
                          transition: "transform 0.2s ease"
                        }} 
                      />
                    </div>
                  ) : (
                    <div className="row" style={{ justifyContent: "space-between", alignItems: "center", color: "var(--text-3)" }}>
                      <span style={{ fontSize: 11, fontWeight: 500, fontStyle: "italic" }}>{s.visualIndication || "Aplicação transversal"}</span>
                      <span style={{ 
                        fontSize: 9, 
                        padding: "2px 6px", 
                        borderRadius: 4, 
                        background: "oklch(1 0 0 / 0.05)", 
                        border: "1px solid var(--border-soft)", 
                        textTransform: "uppercase" 
                      }}>
                        Conceitual
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
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
          O HidroIA integra as competências do semestre ao transformar dados ambientais brutos em uma solução tecnológica de análise, visualização e apoio à decisão. A proposta une ciência de dados, algoritmos, estruturas de dados, eletrônica digital, paralelismo, gestão de projetos e autonomia intelectual em um protótipo acadêmico voltado à sustentabilidade e ao impacto social.
        </p>
      </div>
    </div>
  );
};
