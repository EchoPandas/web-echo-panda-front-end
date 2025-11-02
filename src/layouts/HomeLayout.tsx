import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../pages/SideBar";
import  NavBar  from '../pages/NavBar';

const HomeLayout: React.FC = () => {
  const [isLightMode, setIsLightMode] = useState(false);

  const mainBg = isLightMode ? "bg-gray-50" : "bg-black";
  const textColor = isLightMode ? "text-gray-900" : "text-white";

 return (
    <div className="flex flex-col h-screen">
      {/* NavBar at the top */}
      <NavBar isLightMode={isLightMode} setIsLightMode={setIsLightMode} />

      {/* Content area with sidebar */}
      <div className={`flex flex-1 ${mainBg} ${textColor} overflow-hidden`}>
        <SideBar isLightMode={isLightMode} />

        <main className="flex-1 overflow-auto p-6 space-y-12">
          <Outlet />
        </main>

        
      </div>
    </div>
  );
};

export default HomeLayout;
