// import AppLogo from "@/@crema/components/AppLayout/components/AppLogo";
import React from "react";

import warehousebg from "@/assets/warehousebg.jpg";

interface IProps {
  children: React.ReactNode;
}

export default function AuthWrapper({ children }: IProps) {
  return (
    <div className="flex flex-col md:flex-row h-[100vh]">
      <div className="flex h-full w-full items-center justify-center p-8 md:w-1/2 bg-white">
        <div className="w-full max-w-md">{children}</div>
      </div>
      <div
        className="hidden w-full bg-cover bg-center md:block md:w-1/2"
        style={{
          backgroundImage: `url(${warehousebg})`,
        }}
      ></div>
    </div>
  );
}
