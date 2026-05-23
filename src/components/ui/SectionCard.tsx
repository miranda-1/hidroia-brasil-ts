import React from "react";

interface SectionCardProps {
  title?: string;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  children: React.ReactNode;
}

export const SectionCard: React.FC<SectionCardProps> = ({
  title,
  icon,
  rightElement,
  style,
  className = "",
  children
}) => {
  return (
    <div className={`card ${className}`} style={style}>
      {(title || icon || rightElement) && (
        <div className="card-head">
          <div className="card-title">
            {icon && <span style={{ marginRight: 6 }}>{icon}</span>}
            {title}
          </div>
          {rightElement && <div>{rightElement}</div>}
        </div>
      )}
      {children}
    </div>
  );
};
