import { useCanvasHook } from "@/app/(routes)/design/[designId]/page";
import { FabricImage } from "fabric";
import ImageKit from "imagekit";
import { Loader2Icon } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import UploadSVG from "./UploadSvg";

function UploadImage() {
  const { designId } = useParams();
  const [loading, setLoading] = useState(false);

  const { canvasEditor } = useCanvasHook();

  var imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
  });
  const onFileUpload = async (event) => {
    setLoading(true);
    const file = event.target.files[0];
    const imageRef = await imagekit.upload({
      file: file,
      fileName: designId + ".png",
      isPublished: true,
    });
    console.log(imageRef?.url);
    const canvasImageRef = await FabricImage.fromURL(imageRef?.url, {
      crossOrigin: "anonymous",
    });

    canvasEditor.add(canvasImageRef);
    canvasEditor.renderAll();

    setLoading(false);
  };
  return (
    <div>
      <div>
        <label htmlFor="uploadImage">
          <h2
            className={`cursor-pointer text-center text-white text-sm bg-primary p-2 rounded-md ${loading && "flex justify-center"}`}
          >
            {loading ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              "Upload Image"
            )}
          </h2>
        </label>
        <label>
          <UploadSVG />
        </label>
      </div>
      <input
        type="file"
        id="uploadImage"
        className="hidden"
        multiple={false}
        onChange={onFileUpload}
      />
    </div>
  );
}

export default UploadImage;
