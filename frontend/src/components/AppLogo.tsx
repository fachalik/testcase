import React from "react";

import StorixLogo from "@/assets/Logo.png";

interface IAppLogo {
  height?: number;
}

export const AppLogo: React.FC<IAppLogo> = ({ height = 45 }) => {
  return (
    <div className="flex items-center space-x-2" style={{ height }}>
      <img
        src={StorixLogo}
        alt="Storix Logo"
        className="h-full object-contain"
      />
    </div>
  );
};
