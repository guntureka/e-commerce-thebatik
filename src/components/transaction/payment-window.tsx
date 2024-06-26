"use client";

import { notFound, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { snap } from "@/utils/midtrans"; // Assuming a snap function
import { updateTransactionStatusById } from "@/actions/transaction";
import { TransactionStatus } from "@prisma/client";

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
              console.log(result);
            },
            onPending: function (result) {
              alert("waiting for your payment!");
              console.log(result);
            },
            onError: function (result) {
              alert("payment failed!");
              console.log(result);
            },
            onClose: function () {
              alert("you closed the popup without finishing the payment");
            },
          });
        }
      };
    } else {
      // If the script already exists, directly call the snap embed function
      if (window.snap) {
        window.snap.embed(token, {
          embedId: "snap-container",
          onSuccess: function (result) {
            alert("payment success!");
            console.log(result);
          },
          onPending: function (result) {
            alert("waiting for your payment!");
            console.log(result);
          },
          onError: function (result) {
            alert("payment failed!");
            console.log(result);
          },
          onClose: function () {
            alert("you closed the popup without finishing the payment");
          },
        });
      }
    }

    return () => {
      if (existingScript) {
        existingScript.removeEventListener("load", () => {});
      }
    };
  }, [clientKey, token]);

  return <div id="snap-container"></div>;
};

export default PaymentWindow;
