import React from "react";
import { AITransformationSettings } from "../Options";
import Image from "next/image";
import CustomImageUpload from "../Sharable/CustomImageUpload";

function AiTransformSetting() {
  return (
    <div>
      <CustomImageUpload />
      <div className="grid grid-cols-2 gap-3">
        {AITransformationSettings.map((curr, index) => (
          <div key={index} className="cursor-pointer">
            <Image
              src={curr.image}
              alt={curr.name}
              width={500}
              height={500}
              className="w-full h-[70px] object-cover rounded-sm"
            />
            <h2 className="text-xs text-center my-1">{curr.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AiTransformSetting;
