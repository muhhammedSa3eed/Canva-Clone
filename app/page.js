import { Button } from "@/components/ui/button";
import { UserButton } from "@stackframe/stack";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h2>Welcome Everyone In My Website</h2>
      <Button>Subscribe</Button>
      <UserButton/>
    </div>
  );
}
