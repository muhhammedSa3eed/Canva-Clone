"use client";
import * as fabric from "fabric";
import React, { useEffect, useRef } from "react";
import { useCanvasHook } from "../[designId]/page";
import TopNavBar from "@/services/Component/TopNavBar";

function CanvasEditor({ DesignInfo }) {
  const canvasRef = useRef();
  const { CanvasEditor, setCanvasEditor } = useCanvasHook();

  useEffect(() => {
    if (canvasRef.current && DesignInfo) {
      const initCanvas = new fabric.Canvas(canvasRef.current, {
        width: DesignInfo?.width,
        height: DesignInfo?.height,
        backgroundColor: "#fff",
        preserveObjectStacking: true,
      });

      // ✅ تحميل التصميم القديم لو موجود
      if (DesignInfo?.jsonTemplate) {
        initCanvas.loadFromJSON(DesignInfo?.jsonTemplate, () => {
          initCanvas.renderAll();
        });
      } else {
        initCanvas.renderAll();
      }

      setCanvasEditor(initCanvas);

      return () => {
        initCanvas.dispose();
      };
    }
  }, [DesignInfo]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Delete" || event.key === "Backspace") {
        if (CanvasEditor) {
          const activeObject = CanvasEditor.getActiveObject();
          if (activeObject) {
            CanvasEditor.remove(activeObject);
            CanvasEditor.renderAll();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [CanvasEditor]);

  return (
    <div className="bg-secondary w-full h-screen">
      <TopNavBar />
      <div className="flex flex-col items-center justify-center relative mt-10">
        <canvas id="canvas" ref={canvasRef} />
      </div>
    </div>
  );
}

export default CanvasEditor;
