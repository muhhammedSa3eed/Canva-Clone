import React, { useState } from "react";
import { fabric } from "fabric";
import { Loader2Icon } from "lucide-react";
import { useCanvasHook } from "@/app/(routes)/design/[designId]/page";

// ✅ استيراد الدالة الجديدة للـ SVG
import { loadSVGFromString } from "fabric";

function UploadSVG() {
  const { canvasEditor } = useCanvasHook();
  const [loading, setLoading] = useState(false);

  const onFileUpload = async (event) => {
    setLoading(true);
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const svgString = e.target.result;

      try {
        // ✅ v6 بيرجع array من objects + options
        const { objects } = await loadSVGFromString(svgString);

        // لو عايز تضيف كل Object على حدة
        objects.forEach((obj) => {
          obj.set({ left: 100, top: 100, scaleX: 1, scaleY: 1 });
          canvasEditor.add(obj);
        });

        canvasEditor.requestRenderAll();
      } catch (err) {
        console.error("Error loading SVG:", err);
      }

      setLoading(false);
    };

    reader.readAsText(file);
  };

  return (
    <div className="my-3">
      <label htmlFor="uploadSVG">
        <h2
          className={`text-center text-white text-sm bg-primary p-2 rounded-md ${
            loading && "flex justify-center"
          }`}
        >
          {loading ? <Loader2Icon className="animate-spin" /> : "Upload SVG"}
        </h2>
      </label>
      <input
        type="file"
        id="uploadSVG"
        className="hidden"
        accept=".svg"
        onChange={onFileUpload}
      />
    </div>
  );
}

export default UploadSVG;
