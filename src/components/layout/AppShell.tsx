import React from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { motion, AnimatePresence } from "framer-motion";

interface AppShellProps {
  route: string;
  go: (k: string) => void;
  screenLabel: string;
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({
  route,
  go,
  screenLabel,
  children
}) => {
  return (
    <div className="app" data-screen-label={screenLabel}>
      <Sidebar route={route} go={go} />
      <div className="main">
        <Topbar route={route} />
        <main style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={route}
              initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(3px)" }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};
