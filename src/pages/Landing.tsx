import React from "react";
import { BrazilSensorMap } from "../components/map/BrazilSensorMap";
import { STATIONS } from "../data/stations";
import { WarningBox } from "../components/ui/WarningBox";
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
          <div className="chip" style={{ marginBottom: 22 }}>
            <span className="live-dot" style={{ width: 7, height: 7 }}></span>
            <span className="mono" style={{ fontSize: 10, letterSpacing: "0.04em" }}>
              MONITORAMENTO ATIVO • 128 ESTAÇÕES • 2 FALHAS DE SENSOR • 4 CLUSTERS • 37 ANOMALIAS
            </span>
          </div>
          <h1 style={{
            fontSize: 56, fontWeight: 600, letterSpacing: "-0.03em",
            margin: 0, lineHeight: 1.05, textWrap: "balance"
          }}>
            Inteligência artificial para{" "}
            <span style={{
              background: "linear-gradient(180deg, var(--aqua), var(--cyan))",
              WebkitBackgroundClip: "text", color: "transparent"
            }}>análise de dados hidrometeorológicos</span>{" "}
            no território nacional.
          </h1>
          <p style={{
            fontSize: 15, color: "var(--text-2)", lineHeight: 1.6,
            maxWidth: 580, marginTop: 24
          }}>
            O <strong>HidroIA</strong> é uma plataforma acadêmica de aprendizado não supervisionado que integra dados brutos da ANA e do INMET. Através de K-Means, Isolation Forest e PCA, a plataforma detecta anomalias temporais, aponta falhas de sensores e apoia decisões estratégicas de gestão hídrica, ambiental e socioambiental.
          </p>

          <div className="row" style={{ gap: 12, marginTop: 32 }}>
            <button className="btn btn-primary" onClick={() => go("dashboard")}>
              <LayoutGrid size={14} style={{ marginRight: 4 }} /> Ver Dashboard
            </button>
            <button className="btn btn-ghost" onClick={() => go("ai")}>
              Metodologia de IA <ArrowRight size={14} />
            </button>
          </div>

          <div style={{
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20, marginTop: 48, paddingTop: 28,
            borderTop: "1px solid var(--border-soft)"
          }}>
            {[
              { k: "128", l: "estações monitoradas" },
              { k: "4", l: "clusters de comportamento" },
              { k: "37", l: "anomalias críticas isoladas" },
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
              <Layers size={10} /> K-Means Clustering
            </div>
            <div style={{ fontSize: 13, fontWeight: 500, marginTop: 4 }}>
              4 Clusters de Comportamento
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
              <ShieldAlert size={10} /> Isolation Forest
            </div>
            <div style={{ fontSize: 12, fontWeight: 500, marginTop: 4 }}>
              Anomalia Crítica: TAQ-01
            </div>
            <div className="row" style={{ marginTop: 8, justifyContent: "space-between", alignItems: "center" }}>
              <span className="risk-pill risk-crit" style={{ fontSize: 8 }}>Score: 0.91</span>
              <span className="small mono" style={{ fontSize: 9 }}>Severidade Máx</span>
            </div>
          </div>

          <div className="card" style={{
            position: "absolute", top: 180, right: -20, width: 200,
            padding: 12, backdropFilter: "blur(6px)",
            background: "oklch(0.20 0.03 235 / 0.92)",
            boxShadow: "var(--shadow-card)"
          }}>
            <div className="card-eyebrow" style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Cpu size={10} /> PCA 2D Projection
            </div>
            <div style={{ fontSize: 11, color: "var(--text-2)", marginTop: 6, lineHeight: 1.4 }}>
              92% da variabilidade explicada em duas dimensões.
              <div className="mono small" style={{ marginTop: 4, color: "var(--cyan)", fontSize: 9 }}>
                Redução de dimensionalidade
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
              <AlertTriangle size={10} /> Falha de Sensor Isolada
            </div>
            <div style={{ fontSize: 12, fontWeight: 500, marginTop: 4 }}>
              Inconsistência: Estação MAD-02
            </div>
            <div className="row" style={{ marginTop: 8, justifyContent: "space-between", alignItems: "center" }}>
              <span className="risk-pill risk-fail" style={{ fontSize: 8 }}>Leitura Zero</span>
              <span className="small mono" style={{ color: "var(--muted)", fontSize: 9 }}>Sinal nulo</span>
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
          { ico: <Database size={16} />, title: "Dados brutos ANA/INMET",  body: "Coleta e ingestão de séries históricas de chuva e vazão diretamente de sensores telemétricos públicos." },
          { ico: <BrainCircuit size={16} />, title: "ML Não Supervisionado",   body: "Modelagem inteligente com K-Means, Isolation Forest e DBSCAN para agrupar e identificar tendências." },
          { ico: <ShieldAlert size={16} />, title: "Detecção de Falhas",       body: "Algoritmos que isolam leituras atípicas indicando problemas físicos de hardware e falhas de transmissão." },
          { ico: <Layers size={16} />, title: "Análise Multidimensional", body: "Redução de dimensionalidade com PCA para mapear relações complexas entre chuva, nível e tempo." },
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
      <section id="limitacoes" style={{ padding: "0 48px 40px" }}>
        <WarningBox />
      </section>

      {/* Footer */}
      <footer id="academico" style={{
        padding: "26px 48px", borderTop: "1px solid var(--border-soft)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontSize: 12, color: "var(--muted)",
        background: "oklch(0.12 0.015 238 / 0.4)"
      }}>
        <div>
          HidroIA · Desafio de Articulação de Competências · Ciência da Computação · ANA • INMET
        </div>
      </footer>
    </div>
  );
};
