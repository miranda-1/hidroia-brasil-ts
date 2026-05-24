import React from "react";
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
  AlertTriangle,
  LayoutGrid
} from "lucide-react";



interface LandingProps {
  go: (k: string) => void;
}

export const Landing: React.FC<LandingProps> = ({ go }) => {
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
        padding: "22px 48px", borderBottom: "1px solid var(--border-soft)",
        backdropFilter: "blur(8px)",
        background: "oklch(0.12 0.015 238 / 0.4)"
      }}>
        <div className="row">
          <WaterDropLogo size={30} />
          <div>
            <div className="brand-name">Hidro<span>IA</span></div>
            <div className="brand-sub">Ciência de Dados • v0.2 acadêmico</div>
          </div>
        </div>
        <nav className="row" style={{ gap: 28, fontSize: 13, color: "var(--text-2)" }}>
          <a style={{ color: "inherit", textDecoration: "none" }} href="#sobre">Sobre</a>
          <a style={{ color: "inherit", textDecoration: "none" }} href="#limitacoes">Limitações</a>
          <a style={{ color: "inherit", textDecoration: "none" }} href="#academico">Acadêmico</a>
          <button className="btn btn-ghost btn-sm" onClick={() => go("dashboard")}>
            Entrar na plataforma <ArrowRight size={12} />
          </button>
        </nav>
      </header>

      {/* Hero */}
      <section style={{
        display: "grid",
        gridTemplateColumns: "1.1fr 1fr",
        gap: 40,
        padding: "70px 48px 40px",
        alignItems: "center",
      }}>
        <div>
          <div className="chip" style={{ marginBottom: 24 }}>
            <span className="live-dot" style={{ width: 7, height: 7, background: "var(--cyan)" }}></span>
            <span className="mono" style={{ fontSize: 10, letterSpacing: "0.04em" }}>
              PROTÓTIPO ACADÊMICO • 8 ESTAÇÕES SIMULADAS • 4 PERFIS HIDROLÓGICOS • IA CONCEITUAL
            </span>
          </div>
          <h1 style={{
            fontSize: 52, fontWeight: 600, letterSpacing: "-0.03em",
            margin: 0, lineHeight: 1.1, textWrap: "balance"
          }}>
            Análise hidrometeorológica com{" "}
            <span style={{
              background: "linear-gradient(180deg, var(--aqua), var(--cyan))",
              WebkitBackgroundClip: "text", color: "transparent"
            }}>dados simulados</span>{" "}
            e IA conceitual.
          </h1>
          <p style={{
            fontSize: 15, color: "var(--text-2)", lineHeight: 1.6,
            maxWidth: 580, marginTop: 28
          }}>
            O <strong>HidroIA</strong> é um protótipo acadêmico frontend-only que organiza, visualiza e interpreta dados hidrometeorológicos simulados, com estrutura inspirada na ANA/HIDRO. A plataforma demonstra conceitos de K-Means, PCA e detecção de anomalias para apoiar a análise socioambiental.
          </p>

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
                textShadow: "0 1px 2px rgba(0, 0, 0, 0.15)"
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
              <LayoutGrid size={14} style={{ marginRight: 4 }} /> Ver Dashboard
            </button>
            <button 
              className="btn btn-ghost" 
              onClick={() => go("ai")}
              style={{
                borderColor: "oklch(0.78 0.13 210 / 0.3)",
                color: "var(--text-2)",
                transition: "all 0.22s ease-in-out"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "oklch(0.78 0.13 210 / 0.65)";
                e.currentTarget.style.color = "var(--text)";
                e.currentTarget.style.background = "oklch(0.78 0.13 210 / 0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "oklch(0.78 0.13 210 / 0.3)";
                e.currentTarget.style.color = "var(--text-2)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              Metodologia de IA <ArrowRight size={14} />
            </button>
          </div>

          <div style={{
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24, marginTop: 52, paddingTop: 28,
            borderTop: "1px solid var(--border-soft)"
          }}>
            {[
              { k: "8", l: "estações simuladas" },
              { k: "2", l: "tipos de coleta" },
              { k: "4 + ruído", l: "perfis hidrológicos" },
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
          <BrazilSensorMap height={520} compact={false} stations={STATIONS} showLabels={false} />
          
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
              4 perfis simulados
            </div>
            <div className="row" style={{ marginTop: 8, gap: 4, alignItems: "center" }}>
              <span className="risk-pill risk-crit" style={{ fontSize: 8, padding: "2px 6px" }}>Extremo</span>
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
              <ShieldAlert size={10} /> Eventos simulados
            </div>
            <div style={{ fontSize: 12, fontWeight: 500, marginTop: 4 }}>
              Cheia, estiagem e falha
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
              <Cpu size={10} /> Projeção PCA
            </div>
            <div style={{ fontSize: 11, color: "var(--text-2)", marginTop: 6, lineHeight: 1.4 }}>
              Similaridade entre estações.
              <div className="mono small" style={{ marginTop: 4, color: "var(--cyan)", fontSize: 9 }}>
                Redução conceitual de dimensionalidade
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
      <section id="sobre" style={{
        padding: "30px 48px 60px",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 16,
      }}>
        {[
          { ico: <Database size={16} />, title: "Dados simulados",  body: "Base mockada inspirada na estrutura ANA/HIDRO, com bacia, nível, vazão, chuva e qualidade do dado." },
          { ico: <BrainCircuit size={16} />, title: "Aprendizado não supervisionado",   body: "Demonstração conceitual de K-Means, PCA e Isolation Forest aplicada ao monitoramento hídrico." },
          { ico: <ShieldAlert size={16} />, title: "Detecção de anomalias",       body: "Identificação visual de eventos como cheia, estiagem, chuva extrema e falha de sensor." },
          { ico: <Layers size={16} />, title: "Análise multidimensional", body: "Visualização de similaridade entre estações por meio de projeção PCA e agrupamentos." },
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

      {/* Limitações do protótipo */}
      <section id="limitacoes" style={{ padding: "10px 48px 60px" }}>
        <div className="card" style={{
          background: "oklch(0.14 0.015 238 / 0.7)",
          borderColor: "oklch(1 0 0 / 0.08)",
          padding: "24px 28px",
          borderRadius: 12
        }}>
          <div className="row" style={{ gap: 8, marginBottom: 14, color: "var(--risk-fail)" }}>
            <AlertTriangle size={18} />
            <span style={{ fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Limitações do Protótipo Acadêmico
            </span>
          </div>
          <ul style={{ 
            margin: 0, 
            paddingLeft: 20, 
            lineHeight: 1.6, 
            color: "var(--text-2)", 
            fontSize: 13.5, 
            display: "flex", 
            flexDirection: "column", 
            gap: 10 
          }}>
            <li>
              <strong>Dados simulados para fins acadêmicos:</strong> Todas as leituras e séries do sistema são mockadas e inspiradas na estrutura ANA/HIDRO, sem qualquer integração real ou física com servidores federais da ANA, SNIRH ou INMET.
            </li>
            <li>
              <strong>Algoritmos conceituais no frontend:</strong> As técnicas de Aprendizado Não Supervisionado (K-Means, PCA) e detecção de anomalias (Isolation Forest) são representadas de forma didática diretamente no frontend, sem pipelines pesados ou backend ativo.
            </li>
            <li>
              <strong>Sem fins operacionais:</strong> O sistema funciona estritamente como um protótipo educacional de Ciência da Computação (DAC - 5º Semestre) e de apoio didático à decisão socioambiental. Ele não opera em tempo real e não substitui os boletins oficiais da Defesa Civil e órgãos especialistas em hidrologia.
            </li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer id="academico" style={{
        padding: "26px 48px", borderTop: "1px solid var(--border-soft)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontSize: 12, color: "var(--muted)",
        background: "oklch(0.12 0.015 238 / 0.4)"
      }}>
        <div>
          HidroIA • Protótipo acadêmico • DAC 5º semestre • Dados simulados inspirados em ANA/HIDRO
        </div>
      </footer>
    </div>
  );
};
