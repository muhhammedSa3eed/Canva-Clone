import { useCanvasHook } from "@/app/(routes)/design/[designId]/page";
import { Slider } from "@/components/ui/slider";
import React from "react";

function BorderRadius() {
  const { canvasEditor } = useCanvasHook();
  const onRadiusChange = (radius) => {
    const activeObject = canvasEditor.getActiveObject();
    if (activeObject) {
      activeObject.set({
        rx: radius,
        ry: radius,
      });
      canvasEditor.renderAll();
    }
  };
  return (
    <div>
      <h2 className="my-2">Radius</h2>
      <Slider
        defaultValue={[0]}
        max={50}
        step={1}
        onValueChange={(v) => onRadiusChange(v[0])}
      />
    </div>
  );
}

export default BorderRadius;
