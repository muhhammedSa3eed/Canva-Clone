// "use client";

// import React, { useState, useEffect } from "react";
// import { Loader2Icon } from "lucide-react";
// import { useCanvasHook } from "@/app/(routes)/design/[designId]/page";
// import { loadSVGFromString, Group } from "fabric";

// // ✅ shadcn/ui components
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
// } from "@/components/ui/sheet";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// function UploadSVG() {
//   const { canvasEditor } = useCanvasHook();
//   const [loading, setLoading] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [tags, setTags] = useState([]);
//   const [activeObj, setActiveObj] = useState(null);

//   // Minimal attributes to exclude → keep all useful ones
//   const exclude = ["xmlns", "xmlns:xlink", "version"];

//   // Handle file upload
//   const onFileUpload = async (event) => {
//     setLoading(true);
//     const file = event.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = async (e) => {
//       const svgString = e.target.result;

//       try {
//         // Load SVG inside Fabric
//         const { objects, options } = await loadSVGFromString(svgString);
//         const group = new Group(objects, {
//           ...options,
//           left: 100,
//           top: 100,
//         });

//         // Store parsed DOM for later editing
//         const parser = new DOMParser();
//         group.svgDoc = parser.parseFromString(svgString, "image/svg+xml");

//         canvasEditor.add(group);
//         canvasEditor.requestRenderAll();
//       } catch (err) {
//         console.error("Error loading SVG:", err);
//       }

//       setLoading(false);
//     };

//     reader.readAsText(file);
//   };

//   // Handle selection and double click
//   useEffect(() => {
//     if (!canvasEditor) return;

//     const handleSelect = (e) => {
//       const active = e.selected?.[0];
//       if (!active) return;
//       setActiveObj(active);
//       setTags([]);
//       setOpen(false);
//     };

//     const handleDoubleClick = (e) => {
//       const target = canvasEditor.findTarget(e.e);
//       if (target && target.svgDoc) {
//         setActiveObj(target);

//         const allNodes = Array.from(target.svgDoc.getElementsByTagName("*"));
//         const parsedTags = allNodes.map((node) => {
//           const attrs = {};
//           for (let attr of node.attributes) {
//             if (!exclude.includes(attr.name)) {
//               attrs[attr.name] = attr.value;
//             }
//           }
//           return { tag: node.tagName, element: node, attributes: attrs };
//         });

//         setTags(parsedTags.filter((t) => Object.keys(t.attributes).length > 0));
//         setOpen(true);
//       }
//     };

//     canvasEditor.on("selection:created", handleSelect);
//     canvasEditor.on("selection:updated", handleSelect);
//     canvasEditor.on("mouse:dblclick", handleDoubleClick);

//     return () => {
//       canvasEditor.off("selection:created", handleSelect);
//       canvasEditor.off("selection:updated", handleSelect);
//       canvasEditor.off("mouse:dblclick", handleDoubleClick);
//     };
//   }, [canvasEditor]);

//   // Clear selection when Sheet closes
//   useEffect(() => {
//     if (!canvasEditor) return;

//     if (!open && canvasEditor.getActiveObject()) {
//       canvasEditor.discardActiveObject();
//       canvasEditor.requestRenderAll();
//       setTags([]);
//       setActiveObj(null);
//     }
//   }, [open, canvasEditor]);

//   // Update attribute dynamically in state + DOM + Fabric object (live update)
//   const handleAttrChange = (tagIndex, attrKey, newValue) => {
//     setTags((prev) => {
//       const updated = [...prev];
//       updated[tagIndex].attributes[attrKey] = newValue;

//       // Update DOM element attribute
//       updated[tagIndex].element.setAttribute(attrKey, newValue);

//       // Live update in Fabric objects if possible
//       if (activeObj && activeObj._objects) {
//         activeObj._objects.forEach((obj) => {
//           if (attrKey in obj) {
//             obj.set(attrKey, isNaN(newValue) ? newValue : Number(newValue));
//           }
//         });
//         canvasEditor.requestRenderAll();
//       }

//       return updated;
//     });
//   };

//   return (
//     <div className="my-3">
//       {/* Upload button */}
//       <label htmlFor="uploadSVG">
//         <h2
//           className={`cursor-pointer text-center text-white text-sm bg-primary p-2 rounded-md ${
//             loading && "flex justify-center"
//           }`}
//         >
//           {loading ? <Loader2Icon className="animate-spin" /> : "Upload SVG"}
//         </h2>
//       </label>
//       <input
//         type="file"
//         id="uploadSVG"
//         className="hidden"
//         accept=".svg"
//         onChange={onFileUpload}
//       />

//       {/* Right side sheet for editing SVG attributes */}
//       <Sheet open={open} onOpenChange={setOpen}>
//         <SheetContent side="right" className="w-[400px] overflow-y-auto">
//           <SheetHeader>
//             <SheetTitle>Editable SVG Attributes</SheetTitle>
//           </SheetHeader>

//           <div className="mt-4 space-y-4">
//             {tags.map((t, i) => (
//               <div
//                 key={i}
//                 className="border rounded-md p-3 bg-gray-50 text-sm space-y-3"
//               >
//                 <p className="font-semibold">&lt;{t.tag}&gt;</p>

//                 {Object.entries(t.attributes).map(([key, value]) => (
//                   <div key={key} className="space-y-1">
//                     <Label htmlFor={`${t.tag}-${i}-${key}`}>{key}</Label>
//                     <Input
//                       id={`${t.tag}-${i}-${key}`}
//                       value={value}
//                       onChange={(e) => handleAttrChange(i, key, e.target.value)}
//                     />
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </div>
//         </SheetContent>
//       </Sheet>
//     </div>
//   );
// }

// export default UploadSVG;

// & Without Group

"use client";

import React, { useState, useEffect } from "react";
import { Loader2Icon } from "lucide-react";
import { useCanvasHook } from "@/app/(routes)/design/[designId]/page";
import { loadSVGFromString } from "fabric";

// ✅ shadcn/ui components
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function UploadSVG() {
  const { canvasEditor } = useCanvasHook();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [tags, setTags] = useState([]);
  const [activeObj, setActiveObj] = useState(null);
  const [pendingChanges, setPendingChanges] = useState({});

  const exclude = ["xmlns", "xmlns:xlink", "version"];

  // Helper to ensure valid dimensions and reasonable size
  const ensureValidDimensions = (obj) => {
    const rect = obj.getBoundingRect();

    // Set reasonable max dimensions for canvas display
    const maxWidth = 300;
    const maxHeight = 300;
    const minWidth = 50;
    const minHeight = 50;

    let width = rect.width || obj.width || minWidth;
    let height = rect.height || obj.height || minHeight;

    // Ensure dimensions are at least minimum values
    width = Math.max(width, minWidth);
    height = Math.max(height, minHeight);

    // Scale down if too large
    let scaleX = obj.scaleX || 1;
    let scaleY = obj.scaleY || 1;

    if (width > maxWidth) {
      scaleX = maxWidth / width;
    }
    if (height > maxHeight) {
      scaleY = maxHeight / height;
    }

    // Use the smaller scale to maintain aspect ratio
    const finalScale = Math.min(scaleX, scaleY);

    obj.set({
      width: width,
      height: height,
      scaleX: finalScale,
      scaleY: finalScale,
    });

    return obj;
  };

  // Helper to wait for all images inside an object to load
  const waitForImages = (obj) => {
    if (!obj._objects) return Promise.resolve();
    const promises = obj._objects.map((child) => {
      if (child.getElement && child.getElement().tagName === "image") {
        const imgEl = child.getElement();
        if (!imgEl.complete) {
          return new Promise((resolve, reject) => {
            imgEl.onload = resolve;
            imgEl.onerror = resolve; // Continue even if image fails to load
            // Timeout fallback
            setTimeout(resolve, 5000);
          });
        }
      }
      return Promise.resolve();
    });
    return Promise.all(promises);
  };

  // Handle file upload
  const onFileUpload = async (event) => {
    setLoading(true);
    const file = event.target.files[0];
    if (!file) {
      setLoading(false);
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const svgString = e.target.result;

      try {
        // Parse SVG to check/set viewBox and dimensions
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgString, "image/svg+xml");
        const svgElement = svgDoc.querySelector("svg");

        // Normalize SVG dimensions for reasonable display
        const viewBox = svgElement.getAttribute("viewBox");
        let normalizedWidth = 200; // Default reasonable size
        let normalizedHeight = 200;

        if (viewBox) {
          const [x, y, w, h] = viewBox.split(" ").map(Number);
          if (w && h) {
            // Maintain aspect ratio but limit size
            const aspectRatio = w / h;
            if (aspectRatio > 1) {
              normalizedWidth = Math.min(w, 300);
              normalizedHeight = normalizedWidth / aspectRatio;
            } else {
              normalizedHeight = Math.min(h, 300);
              normalizedWidth = normalizedHeight * aspectRatio;
            }
          }
        }

        // Set normalized dimensions
        svgElement.setAttribute("width", normalizedWidth.toString());
        svgElement.setAttribute("height", normalizedHeight.toString());

        // Ensure viewBox exists
        if (!viewBox) {
          svgElement.setAttribute(
            "viewBox",
            `0 0 ${normalizedWidth} ${normalizedHeight}`
          );
        }

        const updatedSvgString = new XMLSerializer().serializeToString(svgDoc);
        const { objects } = await loadSVGFromString(updatedSvgString);

        for (let obj of objects) {
          obj.left = 100;
          obj.top = 100;

          // Ensure valid dimensions before adding to canvas
          ensureValidDimensions(obj);

          // Store DOM for editing attributes later
          if (!obj.svgDoc) {
            obj.svgDoc = svgDoc;
          }

          // Wait for images to load
          await waitForImages(obj);

          // Double-check dimensions before adding
          if (obj.width > 0 && obj.height > 0) {
            canvasEditor.add(obj);
          } else {
            console.warn("Skipping object with invalid dimensions:", obj);
          }
        }

        canvasEditor.requestRenderAll();
      } catch (err) {
        console.error("Error loading SVG:", err);
      }

      setLoading(false);
    };

    reader.onerror = () => {
      console.error("Error reading file");
      setLoading(false);
    };

    reader.readAsText(file);
  };

  // Handle selection (single click) & double click
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
        setPendingChanges({}); // Reset pending changes when opening
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
      setPendingChanges({}); // Clear pending changes when closing
    }
  }, [open, canvasEditor]);

  // Store attribute changes temporarily without applying immediately
  const handleAttrChange = (tagIndex, attrKey, newValue) => {
    // Store in pending changes
    const changeKey = `${tagIndex}-${attrKey}`;
    setPendingChanges((prev) => ({
      ...prev,
      [changeKey]: { tagIndex, attrKey, newValue },
    }));

    // Update the display value in tags state
    setTags((prev) => {
      const updated = [...prev];
      updated[tagIndex].attributes[attrKey] = newValue;
      return updated;
    });
  };

  // Apply all pending changes to the canvas object and SVG DOM
  const applyChanges = () => {
    if (!activeObj || Object.keys(pendingChanges).length === 0) return;

    // Apply changes to DOM elements and canvas object
    Object.values(pendingChanges).forEach(({ tagIndex, attrKey, newValue }) => {
      // Update DOM element
      if (tags[tagIndex] && tags[tagIndex].element) {
        tags[tagIndex].element.setAttribute(attrKey, newValue);
      }

      const numValue = Number(newValue);

      if (attrKey === "width" && !isNaN(numValue) && numValue > 0) {
        const currentWidth = activeObj.width || 100;
        activeObj.scaleX = numValue / currentWidth;
      } else if (attrKey === "height" && !isNaN(numValue) && numValue > 0) {
        const currentHeight = activeObj.height || 100;
        activeObj.scaleY = numValue / currentHeight;
      } else if (attrKey in activeObj) {
        activeObj.set(attrKey, isNaN(numValue) ? newValue : numValue);
      }
    });

    // Ensure object still has valid dimensions after changes
    ensureValidDimensions(activeObj);
    canvasEditor.requestRenderAll();

    // Clear pending changes after applying
    setPendingChanges({});
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

            {/* Apply Changes Button */}
            {Object.keys(pendingChanges).length > 0 && (
              <div className="sticky bottom-0 bg-white border-t pt-4 mt-6">
                <Button
                  onClick={applyChanges}
                  className="w-full"
                  variant="default"
                >
                  Apply Changes ({Object.keys(pendingChanges).length})
                </Button>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default UploadSVG;
