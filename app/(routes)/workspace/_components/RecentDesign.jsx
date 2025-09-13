"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";
import CustomCanvasDialog from "./CustomCanvasDialog";

function RecentDesign() {
  const [designList, setDesignList] = useState([]);
  return (
    <div className="mt-7">
      <h2 className="font-bold text-2xl">Recent Designs</h2>
      {designList.length == 0 ? (
        <div className="flex flex-col items-center gap-4 mt-5">
          <Image
            src={"/edittool.png"}
            alt="edit tool"
            width={100}
            height={100}
          />
          <h2 className="text-center">
            {" "}
            You don't have any design created , create new one
          </h2>
          <CustomCanvasDialog>
            <Button>Create New</Button>
          </CustomCanvasDialog>
        </div>
      ) : null}
    </div>
  );
}

export default RecentDesign;
