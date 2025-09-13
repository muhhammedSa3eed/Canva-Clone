"use client";
import { useParams } from "next/navigation";
import React, { useContext, useState } from "react";
import DesignHeader from "../_components/DesignHeader";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Sidebar from "../_components/Sidebar";
import CanvasEditor from "../_components/CanvasEditor";
import { CanvasContext } from "@/context/CanvasContext";

function DesignEditor() {
  const { designId } = useParams();
  const DesignInfo = useQuery(api.designs.GetDesign, {
    id: designId,
  });
  const [canvasEditor, setCanvasEditor] = useState();
  //   const GetDesignRecord = async () => {};
  return (
    <CanvasContext.Provider value={{ canvasEditor, setCanvasEditor }}>
      <div>
        <DesignHeader DesignInfo={DesignInfo} />
        <div className="flex">
          <Sidebar />
          <CanvasEditor DesignInfo={DesignInfo} />
        </div>
      </div>
    </CanvasContext.Provider>
  );
}

export default DesignEditor;

// & Custom Hook
export const useCanvasHook = () => {
  const context = useContext(CanvasContext);
  if (!context) {
    throw new Error("Error !");
  }
  return context;
};
