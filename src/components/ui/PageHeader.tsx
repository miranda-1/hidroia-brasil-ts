import React from "react";

interface PageHeaderProps {
  category?: string;
  title: string;
  subtitle?: string;
  rightElement?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  category,
  title,
  subtitle,
  rightElement
}) => {
  return (
    <div className="page-head">
      <div>
        {category && (
          <div className="mono small" style={{ letterSpacing: "0.08em", marginBottom: 8, color: "var(--cyan)" }}>
            {category.toUpperCase()}
          </div>
        )}
        <h1 className="page-title">{title}</h1>
        {subtitle && <p className="page-sub">{subtitle}</p>}
      </div>
      {rightElement && <div>{rightElement}</div>}
    </div>
  );
};
