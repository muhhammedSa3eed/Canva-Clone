import { useCanvasHook } from "@/app/(routes)/design/[designId]/page";
import React from "react";

function SendBackwards() {
    const {canvasEditor} = useCanvasHook()
    
  return (
    <div className="text-2xl text-red-600">
      This For Sending The Element To Back
    </div>
  );
}

export default SendBackwards;
