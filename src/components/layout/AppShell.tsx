import React from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

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
        <main style={{ flex: 1, minHeight: 0 }}>
          {children}
        </main>
      </div>
    </div>
  );
};
