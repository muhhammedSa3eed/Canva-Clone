import { useCanvasHook } from "@/app/(routes)/design/[designId]/page";
import { IText } from "fabric";
import React from "react";

function TextSettings() {
  const { canvasEditor } = useCanvasHook();
  const onAddTextClick = (type) => {
    if (canvasEditor) {
      if (type === "Heading") {
        const textRef = new IText("Add Heading", {
          fontFamily: "Arial",
          fontSize: 30,
          fontWeight: "900",
          fill: "black",
          left: 100,
          top: 100,
        });
        canvasEditor.add(textRef);
      } else if (type === "Sub") {
        const textRef = new IText("Add Sub Heading", {
          fontFamily: "Arial",
          fontSize: 20,
          fontWeight: "400",
          fill: "black",
          left: 100,
          top: 100,
        });
        canvasEditor.add(textRef);
      } else {
        const textRef = new IText("Add Paragraph", {
          fontFamily: "Arial",
          fontSize: 14,
          fontWeight: "normal",
          fill: "black",
          left: 100,
          top: 100,
        });
        canvasEditor.add(textRef);
      }
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <h2
        onClick={() => onAddTextClick("Heading")}
        className="font-bold bg-secondary p-3 text-2xl rounded-xl cursor-pointer"
      >
        Add Heading
      </h2>
      <h2
        onClick={() => onAddTextClick("Sub")}
        className="font-medium bg-secondary p-3 text-xl rounded-xl cursor-pointer"
      >
        Add Subheading
      </h2>
      <h2
        onClick={() => onAddTextClick("Para")}
        className=" bg-secondary p-3 text-sm rounded-xl cursor-pointer"
      >
        Paragraph
      </h2>
    </div>
  );
}

export default TextSettings;
