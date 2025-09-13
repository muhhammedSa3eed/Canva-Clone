"use client";
import { Canvas } from "fabric";
import React, { useEffect, useRef, useState } from "react";
import { useCanvasHook } from "../[designId]/page";
import TopNavBar from "@/services/Component/TopNavBar";

function CanvasEditor({ DesignInfo }) {
  const canvasRef = useRef();
  const [canvas, setCanvas] = useState(null);
  const { CanvasEditor, setCanvasEditor } = useCanvasHook();

  //   * used to define canvas with default values width , height
  useEffect(() => {
    if (canvasRef.current && DesignInfo) {
      const initCanvas = new Canvas(canvasRef.current, {
        width: DesignInfo?.width / 0.9,
        height: DesignInfo?.height / 0.9,
        backgroundColor: "#fff",
        preserveObjectStacking: true,
      });
      // & Set High Resolution Canvas
      const scaleFactor = window.devicePixelRatio || 1;
      initCanvas.set({
        width: DesignInfo?.width * scaleFactor,
        height: DesignInfo?.height * scaleFactor,
        zoom: 1 / scaleFactor,
      });
      if (DesignInfo?.jsonTemplate) {
        initCanvas.loadFromJSON(DesignInfo?.jsonTemplate, () => {
          initCanvas?.requestRenderAll();
        });
      }

      // setCanvas(initCanvas);
      setCanvasEditor(initCanvas);
      return () => {
        initCanvas.dispose();
      };
    }
  }, [DesignInfo]);

  // ! for Deleting But Not Working
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key == "Delete" || event.key == "Backspace") {
        console.log(event);
        if (CanvasEditor) {
          const activeObject = CanvasEditor.getActiveObject();
          console.log("active object:", CanvasEditor.getActiveObject());

          if (activeObject) {
            CanvasEditor.remove(activeObject);
            CanvasEditor.renderAll();
          }
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [CanvasEditor]);

  return (
    <div className="bg-secondary w-full h-screen">
      <TopNavBar />
      <div className=" flex flex-col items-center justify-center relative mt-10">
        <canvas id="canvas" ref={canvasRef} />
      </div>
    </div>
  );
}

export default CanvasEditor;
