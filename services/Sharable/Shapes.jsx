import React from "react";
import { ShapeList } from "../Options";
import Image from "next/image";
import { Circle, Line, Rect, Triangle } from "fabric";
import { useCanvasHook } from "@/app/(routes)/design/[designId]/page";

function Shapes() {
  const { canvasEditor } = useCanvasHook();
  const onShapeSelect = (shape) => {
    const property = {
      left: 100,
      top: 100,
      width: 100,
      height: 100,
      radius: 50,
      fill: "black",
      stroke: "black",
      strokeWidth: 1,
    };
    if (shape.name === "Circle") {
      const circleRef = new Circle({
        ...property,
      });
      canvasEditor.add(circleRef);
    } else if (shape.name === "Line") {
      const lineRef = new Line([50, 50, 200, 200], {
        stroke: "black",
        strokeWidth: 5,
      });
      canvasEditor.add(lineRef);
    } else if (shape.name == "Square") {
      const squareRef = new Rect({
        ...property,
      });
      canvasEditor.add(squareRef);
    } else if (shape.name == "Triangle") {
      const trangleRef = new Triangle({
        ...property,
      });
      canvasEditor.add(trangleRef);
    } else {
      const lineeRef = new Line({
        ...property,
      });
      canvasEditor.add(lineeRef);
    }

    canvasEditor.renderAll();
  };
  return (
    <div>
      <div className="grid grid-cols-3 gap-3 ">
        {ShapeList.map((curr, index) => (
          <div key={index} className="p-2 rounded-xl border">
            <Image
              src={curr.icon}
              alt={curr.name}
              width={100}
              height={100}
              onClick={() => onShapeSelect(curr)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shapes;
