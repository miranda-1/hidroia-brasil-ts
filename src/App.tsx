import { useState } from "react";
import { Landing } from "./pages/Landing";
import { Dashboard } from "./pages/Dashboard";
import { Clustering } from "./pages/Clustering";
import { Anomalies } from "./pages/Anomalies";
import { Methodology } from "./pages/Methodology";
import { Recommendations } from "./pages/Recommendations";
import { Database } from "./pages/Database";
import { DacArticulation } from "./pages/DacArticulation";
import { AppShell } from "./components/layout/AppShell";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [route, setRoute] = useState<string>("landing");

  // Determine active crumb for metadata or other uses
  const getScreenLabel = (r: string): string => {
    switch (r) {
      case "landing": return "Página Inicial";
      case "dashboard": return "Dashboard";
      case "clustering": return "Clustering";
      case "anomalies": return "Anomalias";
      case "ai": return "Metodologia de IA";
      case "rec": return "Recomendações";
      case "dac": return "Articulação com o DAC";
      case "data": return "Base de dados";
      default: return "Plataforma";
    }
  };

  const renderActiveScreen = () => {
    switch (route) {
      case "landing":
        return <Landing go={setRoute} />;
      case "dashboard":
        return (
          <AppShell route={route} go={setRoute} screenLabel={getScreenLabel(route)}>
            <Dashboard go={setRoute} />
          </AppShell>
        );
      case "clustering":
        return (
          <AppShell route={route} go={setRoute} screenLabel={getScreenLabel(route)}>
            <Clustering go={setRoute} />
          </AppShell>
        );
      case "anomalies":
        return (
          <AppShell route={route} go={setRoute} screenLabel={getScreenLabel(route)}>
            <Anomalies go={setRoute} />
          </AppShell>
        );
      case "ai":
        return (
          <AppShell route={route} go={setRoute} screenLabel={getScreenLabel(route)}>
            <Methodology go={setRoute} />
          </AppShell>
        );
      case "rec":
        return (
          <AppShell route={route} go={setRoute} screenLabel={getScreenLabel(route)}>
            <Recommendations />
          </AppShell>
        );
      case "dac":
        return (
          <AppShell route={route} go={setRoute} screenLabel={getScreenLabel(route)}>
            <DacArticulation go={setRoute} />
          </AppShell>
        );
      case "data":
        return (
          <AppShell route={route} go={setRoute} screenLabel={getScreenLabel(route)}>
            <Database />
          </AppShell>
        );
      default:
        return <Landing go={setRoute} />;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={route === "landing" ? "landing" : "app-platform"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        style={{ width: "100%", minHeight: "100vh" }}
      >
        {renderActiveScreen()}
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
