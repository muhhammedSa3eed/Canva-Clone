import { useCanvasHook } from "@/app/(routes)/design/[designId]/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { FabricImage } from "fabric";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function SearchImages() {
  const [imageList, setImageList] = useState([]);
  const [searchInput, setSearchInput] = useState();
  const { canvasEditor } = useCanvasHook();

  useEffect(() => {
    GetImageList("Gradient");
  }, []);
  const GetImageList = async (searchInput) => {
    // https://api.unsplash.com/search/photos
    const result = await axios.get("https://api.unsplash.com/search/photos", {
      params: {
        query: searchInput,
        page: 1,
        per_page: 20,
      },
      headers: {
        Authorization:
          `Client-ID ` + process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
      },
    });
    console.log(result);
    setImageList(result?.data?.results);
  };
  //   * To Selected Image To Canvas
  const AddImageToCanvas = async (imageurl) => {
    const canvasImageRef = await FabricImage.fromURL(imageurl, {
      crossOrigin: "anonymous",
    });
    canvasEditor.add(canvasImageRef);
    canvasEditor.renderAll();
  };
  return (
    <div className="mt-5">
      <h2 className="text-sm font-bold">Search Images</h2>
      <div className="flex items-center gap-4 my-3">
        <Input
          placeholder="Mountain"
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <Button onClick={() => GetImageList(searchInput)}>
          {" "}
          <SearchIcon />{" "}
        </Button>
      </div>
      <div className=" h-[75vh] overflow-x-auto grid gap-2 grid-cols-2">
        {imageList.map((curr, index) => (
          <div
            key={index}
            onClick={() => AddImageToCanvas(curr?.urls?.small)}
            className="cursor-pointer"
          >
            <Image
              src={curr?.urls?.thumb}
              alt="Gradient Image"
              width={100}
              height={60}
              className="w-full h-[80px] rounded-sm object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchImages;
