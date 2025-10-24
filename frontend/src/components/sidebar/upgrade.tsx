"use client";

import { authClient } from "~/lib/auth-client";
import { Button } from "../ui/button";

export default function Upgrade() {
  const upgrade = async () => {
    await authClient.checkout({
      products: ["466bb2ca-a9f3-4749-8e2f-bfbe0b53ee10"],
    });
  };
  return (
    <Button
      size="sm"
      className="font-bricolage ml-2 cursor-pointer"
      onClick={upgrade}
    >
      Upgrade
    </Button>
  );
}
