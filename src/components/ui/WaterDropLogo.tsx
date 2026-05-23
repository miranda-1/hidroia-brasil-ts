import React from "react";

interface WaterDropLogoProps {
  size?: number;
}

export const WaterDropLogo: React.FC<WaterDropLogoProps> = ({ size = 34 }) => {
  return (
    <div 
      className="brand-mark" 
      style={{ 
        width: size, 
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <svg 
        width={size * 0.55} 
        height={size * 0.55} 
        viewBox="0 0 24 24" 
        fill="oklch(1 0 0 / 0.95)" 
        stroke="oklch(1 0 0)" 
        strokeWidth="1.2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        style={{ 
          filter: "drop-shadow(0 2px 4px oklch(0.78 0.13 210 / 0.5))"
        }}
      >
        <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-13-7-13S5 10.7 5 15a7 7 0 0 0 7 7z" />
      </svg>
    </div>
  );
};
