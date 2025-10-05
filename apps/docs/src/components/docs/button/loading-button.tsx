"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function LoadingButtonBase() {
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.success("Content removed!", { position: "top-center" });
    }, 2500);
  };

  return (
    <Button variant="destructive" onPress={handleClick} isLoading={loading}>
      {loading ? (
        "Loading..."
      ) : (
        <>
          <Trash2 />
          Remove
        </>
      )}
    </Button>
  );
}

export const LoadingButtonCode = `"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function LoadingButton() {
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.success("Content removed!", { position: "top-center" })
    }, 1000);
  };

  return (
    <Button variant="destructive" onPress={handleClick} isLoading={loading}>
      {loading ? (
        "Loading..."
      ) : (
        <>
          <Trash2 />
          Remove
        </>
      )}
    </Button>
  );
}
`;
