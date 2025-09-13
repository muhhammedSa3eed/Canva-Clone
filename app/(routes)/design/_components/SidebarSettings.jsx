import React from "react";

function SidebarSettings({ selectedOption }) {
  return (
    <div className="w-[280px] p-5 h-screen border-r">
      <h2 className="font-bold">{selectedOption?.name}</h2>
      <p className="text-sm text-gray-500">{selectedOption?.desc}</p>
      <div className="mt-5">{selectedOption?.component}</div>
    </div>
  );
}

export default SidebarSettings;
