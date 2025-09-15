import React, { useState } from "react";
import { shapesSettingsList } from "../Options";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ArrowDown, ArrowUp, Trash } from "lucide-react";
import { useCanvasHook } from "@/app/(routes)/design/[designId]/page";

function ShapesSettings() {
  const { canvasEditor } = useCanvasHook();
  const [show, setShow] = useState(false);

  const onDelete = () => {
    const activeObject = canvasEditor?.getActiveObject?.();
    if (activeObject) {
      canvasEditor.remove(activeObject);
      setShow(true);
      canvasEditor.requestRenderAll();
    }
  };

  // & Arrow Down
  const onArrowDownPress = () => {
    const activeObject = canvasEditor?.getActiveObject();
    if (activeObject) {
      canvasEditor.sendObjectBackwards(activeObject);
      canvasEditor.requestRenderAll();
    }
  };

  // & Arrow Up
  const onArrowUpPress = () => {
    const activeObject = canvasEditor?.getActiveObject();
    if (activeObject) {
      canvasEditor.bringObjectForward(activeObject);
      canvasEditor.requestRenderAll();
    }
  };

  return (
    <div className="flex items-center gap-6 justify-center">
      {shapesSettingsList.map((curr, index) => (
        <div
          key={index}
          className="hover:scale-105 cursor-pointer transition-all "
        >
          <Popover>
            <PopoverTrigger>
              <curr.icon />
            </PopoverTrigger>
            <PopoverContent>{curr.component}</PopoverContent>
          </Popover>
        </div>
      ))}
      <ArrowDown
        className="hover:scale-105 cursor-pointer transition-all "
        onClick={onArrowDownPress}
      />
      <ArrowUp
        className="hover:scale-105 cursor-pointer transition-all "
        onClick={onArrowUpPress}
      />
      <Trash
        className="hover:scale-105 cursor-pointer transition-all "
        onClick={onDelete}
      />
    </div>
  );
}

export default ShapesSettings;
