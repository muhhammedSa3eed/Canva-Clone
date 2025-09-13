"use client";
import React, { useContext, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
function CustomCanvasDialog({ children }) {
  const router = useRouter();
  const [name, setName] = useState();
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const [loading, setLoading] = useState(false);
  const { userDetail } = useContext(UserDetailContext);
  const createDesignRecord = useMutation(api.designs.createNewDesign);
  const onCreate = async () => {
    toast("Loading....");
    setLoading(true);
    // * used to create new design and save to db
    const result = await createDesignRecord({
      name: name,
      width: Number(width),
      height: Number(height),
      uid: userDetail?._id,
    });
    console.log(result);
    setLoading(false);
    // & Navigate to editor screen
    router.push("/design/" + result);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Custom Canvas</DialogTitle>
          <DialogDescription asChild>
            <div>
              <h2 className="text-sm">Provide Canvas Width And Height</h2>
              <div className="my-4">
                <label>Design Name</label>
                <Input
                  className="mt-2"
                  placeholder="Design Name"
                  onChange={(e) => setName(e.target.value)}
                />
                <div className="mt-1 flex  gap-4">
                  <div className="w-full">
                    <label>Width</label>
                    <Input
                      className="mt-3"
                      placeholder={500}
                      onChange={(e) => setWidth(e.target.value)}
                      type={"number"}
                    />
                  </div>
                  <div className="w-full">
                    <label>Height</label>
                    <Input
                      className="mt-3"
                      placeholder={500}
                      onChange={(e) => setHeight(e.target.value)}
                      type={"number"}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <Button
                  className="w-full"
                  disabled={loading || !name || !width || !height}
                  onClick={onCreate}
                >
                  {loading ? (
                    <Loader2Icon className="animate-spin" />
                  ) : (
                    " Create"
                  )}
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default CustomCanvasDialog;
