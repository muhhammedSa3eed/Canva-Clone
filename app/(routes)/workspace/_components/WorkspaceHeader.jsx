import { UserButton } from "@stackframe/stack";
import Image from "next/image";
import React from "react";

function WorkspaceHeader() {
  return (
    <div className="flex justify-between items-center p-2 px-5 shadow-sm">
      <Image
        src="/logo.png"
        alt="this is logo for our website called canva"
        width={100}
        height={100}
        className="w-[100px] h-[50px]"
      />
      <UserButton />
    </div>
  );
}

export default WorkspaceHeader;
