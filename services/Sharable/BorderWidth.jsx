import { useCanvasHook } from "@/app/(routes)/design/[designId]/page";
import { Slider } from "@/components/ui/slider";
import React, { useState, useEffect } from "react";

function BorderWidth() {
  const { canvasEditor } = useCanvasHook();
  const [currentWidth, setCurrentWidth] = useState(0);

  // Update slider value when a different object is selected
  useEffect(() => {
    if (canvasEditor) {
      const updateWidthFromSelection = () => {
        const activeObject = canvasEditor.getActiveObject();
        if (activeObject && typeof activeObject.strokeWidth !== "undefined") {
          setCurrentWidth(activeObject.strokeWidth || 0);
        }
      };

      // Listen for selection changes
      canvasEditor.on("selection:created", updateWidthFromSelection);
      canvasEditor.on("selection:updated", updateWidthFromSelection);

      // Update on initial load if there's already a selected object
      updateWidthFromSelection();

      return () => {
        canvasEditor.off("selection:created", updateWidthFromSelection);
        canvasEditor.off("selection:updated", updateWidthFromSelection);
      };
    }
  }, [canvasEditor]);

  const onWidthChange = (width) => {
    const activeObject = canvasEditor?.getActiveObject();
    if (activeObject) {
      // Just update the strokeWidth property, don't add the object again
      activeObject.set({
        strokeWidth: width,
        strokeUniform: true,
        // strokePosition: "outside",
        strokeLinejoin: "miter",
      });

      // Update local state
      setCurrentWidth(width);

      // Use requestRenderAll instead of renderAll for better performance
      canvasEditor.requestRenderAll();
    }
  };

  return (
    <div>
      <h2 className="my-2">Border Width</h2>
      <Slider
        value={[currentWidth]}
        max={10}
        step={1}
        onValueChange={(v) => onWidthChange(v[0])}
      />
    </div>
  );
}

export default BorderWidth;
