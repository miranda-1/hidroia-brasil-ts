import React, { useState, useMemo } from "react";
import { BrazilSensorMap } from "../components/map/BrazilSensorMap";
import { STATIONS } from "../data/stations";
import { WaterDropLogo } from "../components/ui/WaterDropLogo";
import { 
  Database, 
  Layers, 
  BrainCircuit, 
  ShieldAlert, 
  Cpu, 
  ArrowRight,
  AlertTriangle
} from "lucide-react";

interface LandingProps {
  go: (k: string) => void;
}

export const Landing: React.FC<LandingProps> = ({ go }) => {
  const [isRaining, setIsRaining] = useState(false);

  const rainDrops = useMemo(
    () =>
      Array.from({ length: 24 }, (_, index) => ({
        left: 4 + ((index * 37) % 92),
        delay: (index % 8) * 0.11,
        duration: 0.75 + (index % 5) * 0.08,
        opacity: 0.22 + (index % 4) * 0.08,
      })),
    []
  );

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div style={{
      minHeight: "100vh",
      padding: "0",
      background: `
      radial-gradient(900px 600px at 80% 10%, oklch(0.32 0.08 215 / 0.5), transparent 60%),
      radial-gradient(900px 600px at 0% 100%, oklch(0.30 0.10 195 / 0.35), transparent 60%),
      var(--bg-deep)`,
      color: "var(--text)",
      overflow: "hidden",
      position: "relative",
    }}>
      {/* Top mini-bar */}
      <header style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "22px clamp(1rem, 4vw, 48px)", borderBottom: "1px solid var(--border-soft)",
        backdropFilter: "blur(8px)",
        background: "oklch(0.12 0.015 238 / 0.4)"
      }}>
        <div className="row">
          <WaterDropLogo size={30} />
          <div className="brand-name" style={{ fontSize: 18 }}>Hidro<span>IA</span></div>
        </div>
        <nav className="row" style={{ gap: 28, fontSize: 13, color: "var(--text-2)" }}>
          <a style={{ color: "inherit", textDecoration: "none", cursor: "pointer", fontWeight: 500 }} onClick={(e) => handleScroll(e, "sobre")}>Sobre</a>
        </nav>
      </header>

      {/* Hero */}
      <section style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 520px), 1fr))",
        gap: 40,
        width: "min(100%, 1720px)",
        margin: "0 auto",
        padding: "70px clamp(1rem, 4vw, 48px) 40px",
        alignItems: "center",
      }}>
        <div>
          <div className="chip" style={{ marginBottom: 24 }}>
            <span className="live-dot" style={{ width: 7, height: 7, background: "var(--cyan)" }}></span>
            <span className="mono" style={{ fontSize: 10, letterSpacing: "0.04em" }}>
              PROTÓTIPO ACADÊMICO • FRONTEND-ONLY • BASE SIMULADA • IA CONCEITUAL
            </span>
          </div>
          <h1
            className="landing-hero-title"
            style={{
            fontSize: "clamp(2.1rem, 1.45rem + 1.85vw, 3.55rem)",
            fontWeight: 600,
            letterSpacing: "-0.025em",
            margin: 0,
            lineHeight: 1.04,
            textWrap: "balance",
            maxWidth: 820
          }}>
            <span style={{
              background: "linear-gradient(180deg, var(--aqua), var(--cyan))",
              WebkitBackgroundClip: "text",
              color: "transparent"
            }}>
              IA conceitual
            </span>{" "}
            para análise{" "}
            <span className="landing-hero-nowrap">hidrometeorológica simulada</span>
          </h1>
          <p style={{
            fontSize: 15, color: "var(--text-2)", lineHeight: 1.6,
            maxWidth: 660, marginTop: 28
          }}>
            O <strong>HidroIA</strong> é um protótipo acadêmico frontend-only que utiliza uma base simulada de estações hidrometeorológicas, inspirada em estruturas ANA/HIDRO, para demonstrar visualização de dados, detecção conceitual de anomalias, agrupamento de padrões e previsão didática de tendências hidrológicas.
          </p>

          <div className="card" style={{
            marginTop: 22,
            padding: "12px 14px",
            maxWidth: 660,
            background: "oklch(0.20 0.03 235 / 0.55)",
            borderColor: "oklch(0.78 0.13 210 / 0.20)"
          }}>
            <div className="small" style={{ lineHeight: 1.55, color: "var(--text-2)" }}>
              Todos os dados, scores, cenários e previsões apresentados são simulados e possuem finalidade acadêmica, sem integração oficial, sem coleta em tempo real e sem uso operacional.
            </div>
          </div>

          <div className="row" style={{ gap: 12, marginTop: 36 }}>
            <button 
              className="btn" 
              onClick={() => go("dashboard")}
              style={{
                background: "oklch(0.78 0.13 210)",
                borderColor: "oklch(0.78 0.13 210)",
                color: "oklch(1 0 0)",
                fontWeight: 600,
                boxShadow: "0 0 24px oklch(0.78 0.13 210 / 0.35)",
                transition: "all 0.22s ease-in-out",
                textShadow: "0 1px 2px rgba(0, 0, 0, 0.15)",
                padding: "12px 24px",
                fontSize: "14px"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "oklch(0.83 0.11 210)";
                e.currentTarget.style.borderColor = "oklch(0.83 0.11 210)";
                e.currentTarget.style.boxShadow = "0 0 28px oklch(0.78 0.13 210 / 0.55)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "oklch(0.78 0.13 210)";
                e.currentTarget.style.borderColor = "oklch(0.78 0.13 210)";
                e.currentTarget.style.boxShadow = "0 0 24px oklch(0.78 0.13 210 / 0.35)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Entrar na plataforma <ArrowRight size={16} style={{ marginLeft: 6 }} />
            </button>
          </div>

          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: 24, marginTop: 52, paddingTop: 28,
            borderTop: "1px solid var(--border-soft)"
          }}>
            {[
              { k: "8", l: "estações simuladas" },
              { k: "IA", l: "pipeline demonstrativo" },
              { k: "100%", l: "dados simulados" },
            ].map((s, i) => (
              <div key={i}>
                <div style={{
                  fontFamily: "var(--font-mono)", fontSize: 28,
                  fontWeight: 500, letterSpacing: "-0.02em"
                }}>{s.k}</div>
                <div className="small" style={{ marginTop: 2 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero visual — abstract map + floating cards */}
        <div style={{ position: "relative" }}>
          <div 
            onClick={() => go("dashboard")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                go("dashboard");
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Abrir dashboard nacional"
            className="landing-map-interactive"
            onMouseEnter={() => setIsRaining(true)}
            onMouseLeave={() => setIsRaining(false)}
          >
            <BrazilSensorMap 
              height={520} 
              compact={false} 
              stations={STATIONS} 
              showLabels={false}
              isRaining={isRaining}
              rainDrops={rainDrops}
            />

            {/* Subtle premium interaction badge */}
            <div className="landing-map-badge">
              <span>ABRIR DASHBOARD</span>
            </div>
          </div>
          
          {/* Floating cards */}
          <div className="card" style={{
            position: "absolute", top: 30, left: -10, width: 220,
            padding: 14, backdropFilter: "blur(6px)",
            background: "oklch(0.20 0.03 235 / 0.92)",
            boxShadow: "var(--shadow-card)"
          }}>
            <div className="card-eyebrow" style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Layers size={10} /> K-Means conceitual
            </div>
            <div style={{ fontSize: 13, fontWeight: 500, marginTop: 4 }}>
              Grupos didáticos
            </div>
            <div className="row" style={{ marginTop: 8, gap: 4, alignItems: "center" }}>
              <span className="risk-pill risk-crit" style={{ fontSize: 8, padding: "2px 6px" }}>Crítico sim.</span>
              <span className="risk-pill risk-high" style={{ fontSize: 8, padding: "2px 6px" }}>Atípico</span>
              <span className="risk-pill risk-low" style={{ fontSize: 8, padding: "2px 6px" }}>Normal</span>
            </div>
          </div>

          <div className="card" style={{
            position: "absolute", bottom: 36, right: -10, width: 230,
            padding: 14, backdropFilter: "blur(6px)",
            background: "oklch(0.20 0.03 235 / 0.92)",
            boxShadow: "var(--shadow-card)"
          }}>
            <div className="card-eyebrow" style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <ShieldAlert size={10} /> Anomalias conceituais
            </div>
            <div style={{ fontSize: 12, fontWeight: 500, marginTop: 4 }}>
              Cheia, estiagem e ruído simulado
            </div>
            <div className="row" style={{ marginTop: 8, justifyContent: "space-between", alignItems: "center" }}>
              <span className="risk-pill risk-crit" style={{ fontSize: 8 }}>Score conceitual</span>
              <span className="small mono" style={{ fontSize: 9 }}>Isolation Forest</span>
            </div>
          </div>

          <div className="card" style={{
            position: "absolute", top: 180, right: -20, width: 200,
            padding: 12, backdropFilter: "blur(6px)",
            background: "oklch(0.20 0.03 235 / 0.92)",
            boxShadow: "var(--shadow-card)"
          }}>
            <div className="card-eyebrow" style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Cpu size={10} /> Previsão conceitual
            </div>
            <div style={{ fontSize: 11, color: "var(--text-2)", marginTop: 6, lineHeight: 1.4 }}>
              Tendências hidrológicas em cenário-base.
              <div className="mono small" style={{ marginTop: 4, color: "var(--cyan)", fontSize: 9 }}>
                Arquitetura didática de IA
              </div>
            </div>
          </div>

          <div className="card" style={{
            position: "absolute", top: 310, left: -20, width: 220,
            padding: 12, backdropFilter: "blur(6px)",
            background: "oklch(0.20 0.03 235 / 0.92)",
            boxShadow: "var(--shadow-card)"
          }}>
            <div className="card-eyebrow" style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <AlertTriangle size={10} /> Falha de sensor simulada
            </div>
            <div style={{ fontSize: 12, fontWeight: 500, marginTop: 4 }}>
              Inconsistência telemétrica
            </div>
            <div className="row" style={{ marginTop: 8, justifyContent: "space-between", alignItems: "center" }}>
              <span className="risk-pill risk-fail" style={{ fontSize: 8 }}>Leitura atípica</span>
              <span className="small mono" style={{ color: "var(--muted)", fontSize: 9 }}>Dado simulado</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features strip */}
      <section style={{
        width: "min(100%, 1720px)",
        margin: "0 auto",
        padding: "30px clamp(1rem, 4vw, 48px) 60px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
        gap: 16,
      }}>
        {[
          { ico: <Database size={16} />, title: "Base simulada", body: "Organiza estações hidrometeorológicas mockadas com chuva, nível, vazão, score e qualidade dos dados." },
          { ico: <BrainCircuit size={16} />, title: "Análise conceitual", body: "Demonstra scores, agrupamentos e detecção conceitual de anomalias com finalidade didática." },
          { ico: <Cpu size={16} />, title: "Previsão didática", body: "Apresenta uma arquitetura conceitual para estimar tendências hidrológicas, sem uso operacional." },
          { ico: <Layers size={16} />, title: "Interpretação acadêmica", body: "Transforma cenários simulados em leituras didáticas para apoiar a apresentação do DAC." },
        ].map((f, i) => (
          <div key={i} className="card">
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: "var(--cyan-soft)", color: "var(--cyan)",
              display: "grid", placeItems: "center", marginBottom: 12,
            }}>{f.ico}</div>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>{f.title}</div>
            <div className="small" style={{ lineHeight: 1.5 }}>{f.body}</div>
          </div>
        ))}
      </section>

      {/* Seção Sobre o HidroIA */}
      <section id="sobre" style={{
        padding: "60px clamp(1rem, 4vw, 48px)",
        borderTop: "1px solid var(--border-soft)",
        background: "oklch(0.16 0.02 240 / 0.15)"
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
          gap: 48,
          width: "min(100%, 1480px)",
          margin: "0 auto",
          alignItems: "center"
        }}>
          {/* Coluna Esquerda - Texto */}
          <div>
            <h2 style={{ fontSize: 32, fontWeight: 600, letterSpacing: "-0.02em", color: "var(--text)", margin: 0, marginBottom: 20 }}>
              Sobre o HidroIA
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, fontSize: 14.5, color: "var(--text-2)", lineHeight: 1.6 }}>
              <p style={{ margin: 0 }}>
                O <strong>HidroIA</strong> foi desenvolvido como um protótipo acadêmico frontend-only para o DAC (Desafio de Articulação de Competências) do 5º semestre de Ciência da Computação. A proposta é demonstrar como dados hidrometeorológicos simulados podem ser organizados, visualizados e analisados em uma interface moderna de apoio didático à análise socioambiental.
              </p>
              <p style={{ margin: 0 }}>
                A base do projeto utiliza 8 estações hidrometeorológicas simuladas, com campos inspirados em estruturas ANA/HIDRO, como bacia, tipo de estação, nível do rio, vazão estimada, chuva acumulada, qualidade do dado, marcador de cenário e score de anomalia.
              </p>
              <p style={{ margin: 0, color: "var(--muted)", fontSize: 13.5 }}>
                O sistema apresenta de forma interativa conceitos de Ciência de Dados e Aprendizado Não Supervisionado, incluindo K-Means, PCA, detecção conceitual de anomalias e previsão conceitual de tendências hidrológicas, sempre em contexto acadêmico.
              </p>
            </div>
          </div>

          {/* Coluna Direita - Mini Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { t: "Dados 100% simulados", s: "Base mockada com scores e cenários criados para demonstração acadêmica." },
              { t: "Previsão conceitual", s: "Arquitetura didática para representar tendências hidrológicas em um cenário-base." },
              { t: "Sem uso operacional", s: "Estrutura frontend-only sem backend, API, integração oficial ou coleta externa." }
            ].map((card, idx) => (
              <div key={idx} className="card" style={{ 
                padding: "14px 18px", 
                background: "oklch(0.20 0.03 235 / 0.6)", 
                borderRadius: 10,
                borderLeft: "3px solid var(--cyan)"
              }}>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--text)", marginBottom: 4 }}>{card.t}</div>
                <div className="small" style={{ lineHeight: 1.4, color: "var(--text-2)", fontSize: 11.5 }}>{card.s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: "26px clamp(1rem, 4vw, 48px)", borderTop: "1px solid var(--border-soft)",
        display: "flex", justifyContent: "center", alignItems: "center",
        fontSize: 12, color: "var(--muted)",
        background: "oklch(0.12 0.015 238 / 0.4)"
      }}>
        <div>
          HidroIA • Protótipo acadêmico frontend-only • DAC 5º semestre • Dados simulados • Previsão conceitual
        </div>
      </footer>
    </div>
  );
};
