"use client";
import { sideBarMenu } from "@/services/Options";
import React, { useState } from "react";
import SidebarSettings from "./SidebarSettings";

function Sidebar() {
  const [selectedOption, setSelectedOption] = useState();
  return (
    <div className="flex">
      <div className="p-2 w-[100px] border-r h-screen">
        {sideBarMenu.map((curr, index) => (
          <div
            key={index}
            className={`p-2 mb-3 flex items-center flex-col hover:bg-secondary cursor-pointer rounded-sm duration-150 transition-all ${curr?.name == selectedOption?.name && "bg-secondary"}`}
            onClick={() => setSelectedOption(curr)}
          >
            <curr.icon />
            <h2 className="text-sm mt-1"> {curr.name} </h2>
          </div>
        ))}
      </div>
      <SidebarSettings selectedOption={selectedOption} />
    </div>
  );
}

export default Sidebar;
