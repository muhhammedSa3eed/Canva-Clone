import React, { useState, useEffect } from "react";
import ColorPickerEditor from "./ColorPickerEditor";
import { useCanvasHook } from "@/app/(routes)/design/[designId]/page";

function FillColor() {
  const [color, setColor] = useState("#000");
  const { canvasEditor } = useCanvasHook();

  // Update color state when a different object is selected
  useEffect(() => {
    if (canvasEditor) {
      const updateColorFromSelection = () => {
        const activeObject = canvasEditor.getActiveObject();
        if (activeObject && activeObject.fill) {
          setColor(activeObject.fill);
        }
      };

      // Listen for selection changes
      canvasEditor.on("selection:created", updateColorFromSelection);
      canvasEditor.on("selection:updated", updateColorFromSelection);

      return () => {
        canvasEditor.off("selection:created", updateColorFromSelection);
        canvasEditor.off("selection:updated", updateColorFromSelection);
      };
    }
  }, [canvasEditor]);

  const onColorChange = (newColor) => {
    setColor(newColor);
    const activeObject = canvasEditor?.getActiveObject();

    if (activeObject) {
      // Just update the fill property, don't add the object again
      activeObject.set({
        fill: newColor,
      });

      // Use requestRenderAll instead of renderAll for better performance
      canvasEditor.requestRenderAll();
    }
  };

  return (
    <div>
      <ColorPickerEditor
        onColorChange={(v) => onColorChange(v)}
        value={color}
      />
    </div>
  );
}

export default FillColor;
