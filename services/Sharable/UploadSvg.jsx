"use client";

import React, { useState, useEffect } from "react";
import { Loader2Icon } from "lucide-react";
import { useCanvasHook } from "@/app/(routes)/design/[designId]/page";
import { loadSVGFromString, Group } from "fabric";

// ✅ shadcn/ui components
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function UploadSVG() {
  const { canvasEditor } = useCanvasHook();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [tags, setTags] = useState([]);
  const [activeObj, setActiveObj] = useState(null);

  // Minimal attributes to exclude → keep all useful ones
  const exclude = ["xmlns", "xmlns:xlink", "version"];

  // Handle file upload
  const onFileUpload = async (event) => {
    setLoading(true);
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const svgString = e.target.result;

      try {
        // Load SVG inside Fabric
        const { objects, options } = await loadSVGFromString(svgString);
        const group = new Group(objects, {
          ...options,
          left: 100,
          top: 100,
        });

        // Store parsed DOM for later editing
        const parser = new DOMParser();
        group.svgDoc = parser.parseFromString(svgString, "image/svg+xml");

        canvasEditor.add(group);
        canvasEditor.requestRenderAll();
      } catch (err) {
        console.error("Error loading SVG:", err);
      }

      setLoading(false);
    };

    reader.readAsText(file);
  };

  // Handle selection and double click
  useEffect(() => {
    if (!canvasEditor) return;

    const handleSelect = (e) => {
      const active = e.selected?.[0];
      if (!active) return;
      setActiveObj(active);
      setTags([]);
      setOpen(false);
    };

    const handleDoubleClick = (e) => {
      const target = canvasEditor.findTarget(e.e);
      if (target && target.svgDoc) {
        setActiveObj(target);

        const allNodes = Array.from(target.svgDoc.getElementsByTagName("*"));
        const parsedTags = allNodes.map((node) => {
          const attrs = {};
          for (let attr of node.attributes) {
            if (!exclude.includes(attr.name)) {
              attrs[attr.name] = attr.value;
            }
          }
          return { tag: node.tagName, element: node, attributes: attrs };
        });

        setTags(parsedTags.filter((t) => Object.keys(t.attributes).length > 0));
        setOpen(true);
      }
    };

    canvasEditor.on("selection:created", handleSelect);
    canvasEditor.on("selection:updated", handleSelect);
    canvasEditor.on("mouse:dblclick", handleDoubleClick);

    return () => {
      canvasEditor.off("selection:created", handleSelect);
      canvasEditor.off("selection:updated", handleSelect);
      canvasEditor.off("mouse:dblclick", handleDoubleClick);
    };
  }, [canvasEditor]);

  // Clear selection when Sheet closes
  useEffect(() => {
    if (!canvasEditor) return;

    if (!open && canvasEditor.getActiveObject()) {
      canvasEditor.discardActiveObject();
      canvasEditor.requestRenderAll();
      setTags([]);
      setActiveObj(null);
    }
  }, [open, canvasEditor]);

  // Update attribute dynamically in state + DOM + Fabric object (live update)
  const handleAttrChange = (tagIndex, attrKey, newValue) => {
    setTags((prev) => {
      const updated = [...prev];
      updated[tagIndex].attributes[attrKey] = newValue;

      // Update DOM element attribute
      updated[tagIndex].element.setAttribute(attrKey, newValue);

      // Live update in Fabric objects if possible
      if (activeObj && activeObj._objects) {
        activeObj._objects.forEach((obj) => {
          if (attrKey in obj) {
            obj.set(attrKey, isNaN(newValue) ? newValue : Number(newValue));
          }
        });
        canvasEditor.requestRenderAll();
      }

      return updated;
    });
  };

  return (
    <div className="my-3">
      {/* Upload button */}
      <label htmlFor="uploadSVG">
        <h2
          className={`cursor-pointer text-center text-white text-sm bg-primary p-2 rounded-md ${
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

      {/* Right side sheet for editing SVG attributes */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-[400px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Editable SVG Attributes</SheetTitle>
          </SheetHeader>

          <div className="mt-4 space-y-4">
            {tags.map((t, i) => (
              <div
                key={i}
                className="border rounded-md p-3 bg-gray-50 text-sm space-y-3"
              >
                <p className="font-semibold">&lt;{t.tag}&gt;</p>

                {Object.entries(t.attributes).map(([key, value]) => (
                  <div key={key} className="space-y-1">
                    <Label htmlFor={`${t.tag}-${i}-${key}`}>{key}</Label>
                    <Input
                      id={`${t.tag}-${i}-${key}`}
                      value={value}
                      onChange={(e) => handleAttrChange(i, key, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default UploadSVG;
