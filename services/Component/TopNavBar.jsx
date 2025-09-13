import React, { useEffect, useState } from "react";
import ShapesSettings from "../Sharable/ShapesSettings";
import { useCanvasHook } from "@/app/(routes)/design/[designId]/page";
import TextSettingNav from "./TextSettingNav";

function TopNavBar() {
  const [showShapeSettings, setShowShapeSettings] = useState(false);
  const [enableTextSetting, setEnableTextSetting] = useState(false);
  const { canvasEditor } = useCanvasHook();
  useEffect(() => {
    if (canvasEditor) {
      const activeObject = canvasEditor.getActiveObject();
      console.log({
        "active Object": activeObject,
      });
    }
  }, [canvasEditor]);
  if (canvasEditor) {
    canvasEditor.on("selection:created", function (e) {
      const activeObject = canvasEditor.getActiveObject();
      if (!activeObject.text) {
        setEnableTextSetting(false);
        setShowShapeSettings(true);
      }
      if (activeObject.text) {
        setShowShapeSettings(false);
        setEnableTextSetting(true);
      }
    });
    canvasEditor.on("selection:updated", function () {
      const activeObject = canvasEditor.getActiveObject();
      if (!activeObject.text) {
        setEnableTextSetting(false);
        setShowShapeSettings(true);
      }
      if (activeObject.text) {
        setShowShapeSettings(false);
        setEnableTextSetting(true);
      }
    });
    canvasEditor.on("selection:cleared", function () {
      setShowShapeSettings(false);
      setEnableTextSetting(false);
    });
  }
  return (
    <div className="p-3 bg-white">
      {showShapeSettings && <ShapesSettings />}
      {enableTextSetting && <TextSettingNav />}
    </div>
  );
}

export default TopNavBar;
