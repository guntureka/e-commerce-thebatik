"use client";

import { notFound, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { snap } from "@/utils/midtrans"; // Assuming a snap function
import { updateTransactionStatusById } from "@/actions/transaction";
import { TransactionStatus } from "@prisma/client";
import { useToast } from "../ui/use-toast";

declare global {
  interface Window {
    snap: {
      embed: (
        token: string,
        options: {
          embedId: string;
          onSuccess: (result: any) => void;
          onPending: (result: any) => void;
          onError: (result: any) => void;
          onClose: () => void;
        }
      ) => void;
    };
  }
}

const PaymentWindow = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const { toast } = useToast();

  console.log(token);

  if (!token) {
    notFound();
  }

  const snapUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
  const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!;

  useEffect(() => {
    const existingScript = document.querySelector(`script[src="${snapUrl}"]`);
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = snapUrl;
      script.setAttribute("data-client-key", clientKey);
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        if (window.snap) {
          window.snap.embed(token, {
            embedId: "snap-container",
            onSuccess: function (result) {
              toast({
                title: "Success!",
                description: "Transaction Success",
                variant: "success",
              });
              router.push("/");
              console.log(result);
            },
            onPending: function (result) {
              toast({
                title: "Pending!",
                description: "Transaction Pending",
                variant: "destructive",
              });
            },
            onError: function (result) {
              toast({
                title: "Error!",
                description: "Transaction Error",
                variant: "destructive",
              });
            },
            onClose: function () {
              toast({
                title: "Close!",
                description: "Transaction close",
                variant: "destructive",
              });
            },
          });
        }
      };
    }
    return () => {
      if (existingScript) {
        existingScript.removeEventListener("load", () => {});
      }
    };
  }, [clientKey, token, router, toast]);

  return <div id="snap-container"></div>;
};

export default PaymentWindow;
