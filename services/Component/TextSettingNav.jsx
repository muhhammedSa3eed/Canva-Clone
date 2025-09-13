import React, { useState } from "react";
import { TextSettingsList } from "../Options";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCanvasHook } from "@/app/(routes)/design/[designId]/page";
import { Trash } from "lucide-react";
import FontStyle from "../Sharable/FontStyle";

function TextSettingNav() {
  const { canvasEditor } = useCanvasHook();
  const [show, setShow] = useState(false);
  const onDelete = () => {
    const activeObject = canvasEditor.getActiveObject();
    if (activeObject) {
      canvasEditor.remove(activeObject);
      setShow(true);
    }
  };
  return (
    <div className="flex items-center gap-6 justify-center">
      {TextSettingsList.map((curr, index) => (
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
      <FontStyle />
      <Trash
        className="hover:scale-105 cursor-pointer transition-all "
        onClick={onDelete}
      />
    </div>
  );
}

export default TextSettingNav;
