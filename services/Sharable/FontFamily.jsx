import React from "react";
import { FontFamilyList } from "../Options";
import { useCanvasHook } from "@/app/(routes)/design/[designId]/page";

function FontFamily() {
  const { canvasEditor } = useCanvasHook();
  const onFontFamilyChange = (font) => {
    const activeObject = canvasEditor.getActiveObject();
    if (activeObject) {
      activeObject.set({
        fontFamily: font,
      });
      canvasEditor.renderAll();
    }
  };
  return (
    <div className="h-[200px] overflow-auto">
      {FontFamilyList.map((curr, index) => (
        <div
          onClick={() => onFontFamilyChange(curr)}
          key={index}
          className="bg-secondary rounded-lg text-lg p-2 my-1"
          style={{
            fontFamily: curr,
          }}
        >
          {curr}
        </div>
      ))}
    </div>
  );
}

export default FontFamily;
