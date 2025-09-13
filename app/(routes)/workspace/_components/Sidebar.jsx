"use client";
import { WorkspaceMenu } from "@/services/Options";
import { CirclePlus } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import CustomCanvasDialog from "./CustomCanvasDialog";

function Sidebar() {
  const path = usePathname();
  return (
    <div className="h-screen p-2 shadow-sm bg-purple-50 ">
      <CustomCanvasDialog>
        <div className="flex flex-col items-center hover:cursor-pointer p-2 mb-5">
          <CirclePlus className="bg-purple-600 text-white rounded-full  size-8" />
          <h2 className="text-purple-600 text-sm">Create</h2>
        </div>
      </CustomCanvasDialog>
      {WorkspaceMenu.map((curr, index) => (
        <div
          key={index}
          className={`group flex items-center flex-col mb-4 p-2 hover:bg-purple-100 rounded-xl transition-all duration-300 cursor-pointer ${curr.path === path && "bg-purple-100"}`}
        >
          <curr.icon
            className={`group-hover:text-purple-800  ${curr.path === path && "bg-purple-100"}`}
          />
          <h2
            className={`text-sm group-hover:text-purple-800  ${curr.path === path && "bg-purple-100"}`}
          >
            {curr.name}
          </h2>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
