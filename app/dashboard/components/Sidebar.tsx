import React from "react";
import MainNav from "./main-nav";

const Sidebar = () => {
  return (
    <div className="h-screen w-full">
      {/* logo */}
      <h1 className="h-14 flex px-6 items-center text-lg font-semibold border-b">
        Dashlight x
      </h1>
      {/* main-nav */}
      <MainNav />
    </div>
  );
};

export default Sidebar;
