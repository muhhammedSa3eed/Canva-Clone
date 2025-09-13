import React from "react";
import { Bold, Italic, Underline } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useCanvasHook } from "@/app/(routes)/design/[designId]/page";
function FontStyle() {
  const { canvasEditor } = useCanvasHook();
  const activeObject = canvasEditor.getActiveObject();

  const onSettingClick = (type) => {
    const activeObject = canvasEditor.getActiveObject();
    if (activeObject) {
      if (type === "bold") {
        activeObject.set({
          fontWeight: activeObject?.fontWeight === "bold" ? "normal" : "bold",
        });
      }
      if (type === "italic") {
        activeObject.set({
          fontStyle: activeObject?.fontStyle === "italic" ? "normal" : "italic",
        });
      }
      if (type === "underline") {
        activeObject.set({
          underline: activeObject?.underline ? false : true,
        });
      }
      canvasEditor.add(activeObject);
    }
  };

  return (
    <div>
      <Toggle
        aria-label="Toggle"
        defaultPressed={activeObject?.fontWeight === "bold"}
        onClick={() => onSettingClick("bold")}
      >
        <Bold className="h-4 w-4" size={"lg"} />
      </Toggle>
      <Toggle
        aria-label="Toggle"
        defaultPressed={activeObject?.fontStyle === "italic"}
        onClick={() => onSettingClick("italic")}
      >
        <Italic className="h-4 w-4" size={"lg"} />
      </Toggle>
      <Toggle
        aria-label="Toggle"
        defaultPressed={activeObject?.underline}
        onClick={() => onSettingClick("underline")}
      >
        <Underline className="h-4 w-4" size={"lg"} />
      </Toggle>
    </div>
  );
}

export default FontStyle;
