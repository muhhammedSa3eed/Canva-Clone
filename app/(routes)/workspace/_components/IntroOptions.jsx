"use client";
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import { canvasSizeOptions } from "@/services/Options";
import { useMutation } from "convex/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { toast } from "sonner";

function IntroOptions() {
  const router = useRouter();
  const createDesignRecord = useMutation(api.designs.createNewDesign);
  const { userDetail } = useContext(UserDetailContext);
  const OnCanvasOptionSelect = async (curr) => {
    toast("Loading....");
    // * used to create new design and save to db
    const result = await createDesignRecord({
      name: curr.name,
      width: curr.width,
      height: curr.height,
      uid: userDetail?._id,
    });
    console.log(result);
    // & Navigate to editor screen
    router.push("/design/" + result);
  };
  return (
    <div>
      <div className="relative">
        <Image
          src={"/banner-home.png"}
          alt="this is the banner for the home page"
          width={1800}
          height={300}
          className="w-full h-[200px] object-cover rounded-2xl"
        />
        <h2 className="absolute bottom-5 left-10 text-white text-2xl font-bold">
          Workspace
        </h2>
      </div>
      <div className="flex justify-center gap-6 items-center mt-10">
        {canvasSizeOptions.map((curr, index) => (
          <div
            key={index}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => OnCanvasOptionSelect(curr)}
          >
            <Image
              src={curr.icon}
              alt={curr.name}
              width={60}
              height={60}
              className="hover:scale-105 transition-all"
            />
            <h2 className="text-xs mt-2 font-medium">{curr.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IntroOptions;
