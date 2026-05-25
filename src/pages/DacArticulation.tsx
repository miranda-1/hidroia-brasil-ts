import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PageHeader } from "../components/ui/PageHeader";
import { DISCIPLINES } from "../data/disciplines";
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Database,
  Layers,
  Shield,
  Sparkles,
  TrendingUp,
  X,
  Zap
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Database: <Database size={17} />,
  TrendingUp: <TrendingUp size={17} />,
  Layers: <Layers size={17} />,
  Cpu: <Cpu size={17} />,
  Zap: <Zap size={17} />,
  Calendar: <Calendar size={17} />,
  Shield: <Shield size={17} />
};

const smoothEase = [0.22, 1, 0.36, 1] as const;

export const DacArticulation: React.FC<{ go?: (route: string) => void }> = ({ go }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [navDirection, setNavDirection] = useState<1 | -1>(1);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const totalDisciplines = DISCIPLINES.length;
  const activeDiscipline = activeIndex !== null ? DISCIPLINES[activeIndex] : null;

  const formatIndex = (index: number) => String(index + 1).padStart(2, "0");

  const openDisciplineModal = (index: number) => {
    setNavDirection(1);
    setActiveIndex(index);
    setIsModalOpen(true);
  };

  const closeDisciplineModal = () => setIsModalOpen(false);

  const goToPreviousDiscipline = () => {
    if (activeIndex === null) return;
    setNavDirection(-1);
    setActiveIndex((prev) => {
      if (prev === null) return 0;
      return prev === 0 ? totalDisciplines - 1 : prev - 1;
    });
  };

  const goToNextDiscipline = () => {
    if (activeIndex === null) return;
    setNavDirection(1);
    setActiveIndex((prev) => {
      if (prev === null) return 0;
      return prev === totalDisciplines - 1 ? 0 : prev + 1;
    });
  };

  const openRelatedRoute = () => {
    if (!activeDiscipline?.targetRoute || !go) return;
    go(activeDiscipline.targetRoute);
    closeDisciplineModal();
  };

  useEffect(() => {
    if (!isModalOpen) return;
    const currentOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 20);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = currentOverflow;
    };
  }, [isModalOpen]);

  useEffect(() => {
    if (!isModalOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsModalOpen(false);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setNavDirection(-1);
        setActiveIndex((prev) => {
          if (prev === null) return 0;
          return prev === 0 ? totalDisciplines - 1 : prev - 1;
        });
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setNavDirection(1);
        setActiveIndex((prev) => {
          if (prev === null) return 0;
          return prev === totalDisciplines - 1 ? 0 : prev + 1;
        });
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isModalOpen, totalDisciplines]);

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

      <div
        className="card"
        style={{
          background: "linear-gradient(135deg, oklch(0.18 0.03 238), oklch(0.14 0.02 238))",
          border: "1px solid var(--border-soft)",
          padding: 20,
          marginBottom: 18,
          position: "relative",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: 300,
            height: 300,
            background: "radial-gradient(circle, var(--cyan-soft) 0%, transparent 70%)",
            opacity: 0.6,
            pointerEvents: "none"
          }}
        />
        <div className="row" style={{ gap: 10, marginBottom: 10 }}>
          <span style={{ color: "var(--cyan)", display: "flex", alignItems: "center" }}>
            <Sparkles size={17} />
          </span>
          <div className="card-title" style={{ fontSize: 17, fontWeight: 600 }}>
            Integração Geral do Projeto
          </div>
        </div>
        <p style={{ fontSize: 13.5, color: "var(--text-2)", lineHeight: 1.55, margin: 0 }}>
          O HidroIA foi desenvolvido como um artefato prático que materializa e consolida as competências exigidas no Desafio de Articulação de Competências (DAC) da Ciência da Computação. O projeto vai além do código bruto: ele conecta sensores eletrônicos simulados, engenharia de algoritmos de alta eficiência, paralelização em grande escala, rigoroso controle de projeto e autonomia intelectual para criar um painel dinâmico que atende a diretrizes de sustentabilidade e análise didática de cenários no Brasil.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 14,
          marginBottom: 20
        }}
      >
        {DISCIPLINES.map((discipline, index) => (
          <motion.button
            key={discipline.id}
            type="button"
            className="card"
            onClick={() => openDisciplineModal(index)}
            style={{
              textAlign: "left",
              padding: 14,
              borderRadius: 12,
              border: "1px solid var(--border-soft)",
              background: "linear-gradient(180deg, oklch(0.22 0.03 238 / 0.8), oklch(0.18 0.02 240 / 0.8))",
              boxShadow: "0 1px 0 oklch(1 0 0 / 0.03) inset",
              cursor: "pointer",
              color: "var(--text)",
              WebkitTextFillColor: "var(--text)",
              fontFamily: "inherit",
              display: "flex",
              flexDirection: "column",
              gap: 10,
              minHeight: 140
            }}
            whileHover={{
              y: -2,
              borderColor: discipline.badgeColor,
              boxShadow: `0 0 16px ${discipline.badgeColor}33, 0 10px 26px oklch(0 0 0 / 0.25)`
            }}
            whileTap={{ scale: 0.995 }}
            transition={{ duration: 0.24, ease: smoothEase }}
          >
            <div className="row" style={{ justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
              <span className="mono" style={{ fontSize: 22, fontWeight: 700, opacity: 0.55, color: "var(--text-3)", lineHeight: 1 }}>
                {formatIndex(index)}
              </span>
              <span
                className="chip"
                style={{
                  padding: "2px 8px",
                  fontSize: 10,
                  fontWeight: 600,
                  background: `${discipline.badgeColor}1a`,
                  color: discipline.badgeColor,
                  border: `1px solid ${discipline.badgeColor}44`
                }}
              >
                {discipline.badge}
              </span>
            </div>

            <div className="row" style={{ gap: 8, alignItems: "center" }}>
              <span style={{ color: discipline.badgeColor, display: "flex", alignItems: "center" }}>
                {iconMap[discipline.iconName] || <Cpu size={17} />}
              </span>
              <h3 style={{ fontSize: 15, fontWeight: 600, margin: 0, lineHeight: 1.35, color: "var(--text)" }}>{discipline.name}</h3>
            </div>

            <div className="row" style={{ justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
              <span style={{ fontSize: 11, color: "var(--text-2)", fontWeight: 500 }}>Ver articulação</span>
              <ArrowRight size={14} style={{ color: "var(--cyan)" }} />
            </div>
          </motion.button>
        ))}
      </div>

      <div
        className="card"
        style={{
          background: "linear-gradient(180deg, var(--cyan-soft) 0%, transparent 100%)",
          border: "1px solid var(--cyan-soft)",
          padding: 20
        }}
      >
        <div className="row" style={{ gap: 8, marginBottom: 8 }}>
          <span style={{ color: "var(--cyan)", display: "flex", alignItems: "center" }}>
            <Check size={16} />
          </span>
          <div className="card-title" style={{ fontSize: 16, fontWeight: 600 }}>
            Síntese da Articulação
          </div>
        </div>
        <p style={{ fontSize: 13.5, color: "var(--text)", lineHeight: 1.55, margin: 0 }}>
          O HidroIA integra as competências do semestre ao transformar dados ambientais brutos em uma solução tecnológica de análise, visualização e apoio à decisão. A proposta une ciência de dados, algoritmos, estruturas de dados, eletrônica digital, paralelismo, gestão de projetos e autonomia intelectual em um cenário-base acadêmico voltado à sustentabilidade e ao impacto social.
        </p>
      </div>

      <AnimatePresence>
        {isModalOpen && activeDiscipline && activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.26, ease: smoothEase }}
            onClick={closeDisciplineModal}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 220,
              background: "oklch(0 0 0 / 0.62)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              display: "grid",
              placeItems: "center",
              padding: 24
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="dac-discipline-modal-title"
              aria-describedby="dac-discipline-modal-description"
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.32, ease: smoothEase }}
              onClick={(event) => event.stopPropagation()}
              style={{
                width: "min(1040px, 100%)",
                maxHeight: "calc(100vh - 48px)",
                overflow: "auto",
                borderRadius: 16,
                border: `1px solid ${activeDiscipline.badgeColor}`,
                boxShadow: `0 0 0 1px ${activeDiscipline.badgeColor}55, 0 24px 60px oklch(0 0 0 / 0.60), 0 0 28px ${activeDiscipline.badgeColor}33`,
                background: "linear-gradient(180deg, oklch(0.215 0.030 235 / 0.98), oklch(0.16 0.02 240 / 0.98))",
                padding: 18
              }}
            >
              <div className="row" style={{ justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 14 }}>
                <div className="row" style={{ gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                  <span className="mono small" style={{ color: "var(--cyan)" }}>
                    {activeIndex + 1} de {totalDisciplines}
                  </span>
                  <span
                    className="chip"
                    style={{
                      padding: "2px 8px",
                      fontSize: 10,
                      fontWeight: 600,
                      background: `${activeDiscipline.badgeColor}1a`,
                      color: activeDiscipline.badgeColor,
                      border: `1px solid ${activeDiscipline.badgeColor}44`
                    }}
                  >
                    {activeDiscipline.badge}
                  </span>
                </div>
                <div className="row" style={{ gap: 8 }}>
                  <button
                    className="btn btn-sm btn-ghost"
                    type="button"
                    onClick={goToPreviousDiscipline}
                    aria-label="Disciplina anterior"
                  >
                    <ChevronLeft size={14} />
                    Anterior
                  </button>
                  <button
                    className="btn btn-sm btn-ghost"
                    type="button"
                    onClick={goToNextDiscipline}
                    aria-label="Próxima disciplina"
                  >
                    Próxima
                    <ChevronRight size={14} />
                  </button>
                  <button
                    ref={closeButtonRef}
                    className="btn btn-sm btn-ghost"
                    type="button"
                    onClick={closeDisciplineModal}
                    aria-label="Fechar popup de articulação"
                  >
                    <X size={14} />
                    Fechar
                  </button>
                </div>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeDiscipline.id}
                  initial={{ opacity: 0, x: navDirection > 0 ? 48 : -48 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: navDirection > 0 ? -48 : 48 }}
                  transition={{ duration: 0.31, ease: smoothEase }}
                  style={{ willChange: "opacity, transform" }}
                >
                  <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 16 }} className="two-col-responsive-grid">
                    <div
                      className="card"
                      style={{
                        minHeight: 380,
                        borderColor: `${activeDiscipline.badgeColor}66`,
                        background: `linear-gradient(180deg, ${activeDiscipline.badgeColor}12, oklch(0.215 0.030 235 / 0.72))`,
                        display: "flex",
                        flexDirection: "column",
                        gap: 12
                      }}
                    >
                      <div className="row" style={{ justifyContent: "space-between", gap: 10, alignItems: "center" }}>
                        <span className="mono" style={{ fontSize: 12, color: activeDiscipline.badgeColor, fontWeight: 600 }}>
                          DISCIPLINA {formatIndex(activeIndex)}
                        </span>
                        <span style={{ color: activeDiscipline.badgeColor, display: "flex", alignItems: "center" }}>
                          {iconMap[activeDiscipline.iconName] || <Cpu size={17} />}
                        </span>
                      </div>

                      <h2 id="dac-discipline-modal-title" style={{ margin: 0, fontSize: 21, fontWeight: 600, lineHeight: 1.3 }}>
                        {activeDiscipline.name}
                      </h2>

                      <div>
                        <div className="card-eyebrow" style={{ fontSize: 10, marginBottom: 6 }}>
                          COMO USAMOS
                        </div>
                        <p
                          id="dac-discipline-modal-description"
                          style={{ margin: 0, fontSize: 13.2, color: "var(--text-2)", lineHeight: 1.55 }}
                        >
                          {activeDiscipline.applicationText || activeDiscipline.summary}
                        </p>
                      </div>
                    </div>

                    <div className="card" style={{ minHeight: 380, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 12 }}>
                      <div>
                        <div className="card-head" style={{ marginBottom: 10 }}>
                          <div className="card-title">Tópicos articulados</div>
                        </div>
                        <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 6 }}>
                          {activeDiscipline.topics.map((topic) => (
                            <li key={`${activeDiscipline.id}-${topic}`} style={{ fontSize: 12.2, color: "var(--text-2)", lineHeight: 1.4 }}>
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid var(--border-soft)" }}>
                        {activeDiscipline.targetRoute && go ? (
                          <button
                            type="button"
                            className="btn btn-primary btn-sm"
                            onClick={openRelatedRoute}
                            style={{ width: "100%", justifyContent: "space-between" }}
                          >
                            <span>{activeDiscipline.visualIndication || "Abrir página relacionada"}</span>
                            <ArrowUpRight size={14} />
                          </button>
                        ) : (
                          <div className="row" style={{ justifyContent: "space-between", alignItems: "center", color: "var(--text-3)" }}>
                            <span style={{ fontSize: 11.5 }}>{activeDiscipline.visualIndication || "Aplicação transversal"}</span>
                            <span
                              style={{
                                fontSize: 10,
                                padding: "2px 6px",
                                borderRadius: 4,
                                border: "1px solid var(--border-soft)",
                                background: "oklch(1 0 0 / 0.03)"
                              }}
                            >
                              Conceitual
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
