import { Button } from "@/components/ui/button";
import { UserButton } from "@stackframe/stack";
import {
  Download,
  FileJson,
  ImageIcon,
  ImagePlayIcon,
  Save,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useCanvasHook } from "../[designId]/page";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function DesignHeader({ DesignInfo }) {
  const { canvasEditor } = useCanvasHook();
  const saveDesign = useMutation(api.designs.SaveDesign);
  const { designId } = useParams();
  const [show, setShow] = useState(false);

  const onSave = async () => {
    if (canvasEditor) {
      const jsonDesign = canvasEditor.toJSON();
      console.log(jsonDesign);
      const result = await saveDesign({
        id: designId,
        jsonDesign: jsonDesign,
      });
      console.log(result);
      toast("Canvas Saved Successfully✅");
    }
  };

  //  & Export Canve As a Image
  const onExportImage = () => {
    const dateUrl = canvasEditor?.toDataURL({
      format: "png",
      quality: 1,
    });
    const link = document.createElement("a");
    link.href = dateUrl;
    link.download = DesignInfo?.name;
    link.click();
    setShow(false);

    toast("Image Exported Successfully ✅");
  };

  // & Export Canva as a SVG
  const onExportSVG = () => {
    if (!canvasEditor) return;
    const objects = canvasEditor.getObjects();
    const promises = objects.map((obj) => {
      return new Promise((resolve) => {
        if (obj.type === "image" && obj._originalElement) {
          const img = obj._originalElement;

          // نتأكد إن الصورة اتعملها تحميل كامل
          if (img.complete && img.naturalWidth > 0) {
            const canvasEl = document.createElement("canvas");
            canvasEl.width = img.naturalWidth;
            canvasEl.height = img.naturalHeight;
            const ctx = canvasEl.getContext("2d");
            ctx.drawImage(img, 0, 0);
            const dataURL = canvasEl.toDataURL("image/png");

            obj.set({ src: dataURL });
            if (obj._element) obj._element.src = dataURL;
          }
          resolve();
        } else {
          resolve();
        }
      });
    });

    Promise.all(promises).then(() => {
      const svgData = canvasEditor.toSVG({
        suppressPreamble: false,
        viewBox: {
          x: 0,
          y: 0,
          width: canvasEditor.width,
          height: canvasEditor.height,
        },
      });

      const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = DesignInfo?.name
        ? `${DesignInfo.name}.svg`
        : "design.svg";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setShow(false);

      toast("SVG Exported Successfully ✅ ");
    });
  };

  const onExportJSON = () => {
    if (!canvasEditor) return;

    const jsonDesign = canvasEditor.toJSON();

    const blob = new Blob([JSON.stringify(jsonDesign, null, 2)], {
      type: "application/json",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = DesignInfo?.name
      ? `${DesignInfo.name}.json`
      : "design.json";
    link.click();
    setShow(false);
    toast("JSON Exported Successfully ✅ ");
  };

  return (
    <div className="p-3 px-5 flex items-center justify-between bg-gradient-to-r from-sky-500 via-blue-400 to-purple-600">
      <Image
        src={"/logo-white.png"}
        alt="The logo Of Canva"
        width={100}
        height={60}
      />

      <h2 className="text-white border-none outline-none">
        {DesignInfo?.name}
      </h2>
      <div className="flex items-center gap-5">
        <Button onClick={onSave} className="cursor-pointer ">
          <Save /> Save
        </Button>
        {/*  */}

        <Popover>
          <PopoverTrigger>
            <div
              className="flex items-center gap-2 text-sm text-white bg-primary p-2 rounded-sm cursor-pointer"
              onClick={() => setShow(true)}
            >
              <Download size={18} /> Export
            </div>
          </PopoverTrigger>
          {show && (
            <PopoverContent className="flex flex-col gap-3 w-[150px]">
              <Button className="cursor-pointer" onClick={onExportImage}>
                <ImageIcon /> Picture
              </Button>
              <Button className="cursor-pointer" onClick={onExportSVG}>
                <ImagePlayIcon /> SVG
              </Button>
              <Button className="cursor-pointer" onClick={onExportJSON}>
                <FileJson /> JSON
              </Button>
            </PopoverContent>
          )}
        </Popover>

        {/*  */}

        <UserButton />
      </div>
    </div>
  );
}

export default DesignHeader;
