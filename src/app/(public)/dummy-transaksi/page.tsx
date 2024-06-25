"use client";

import Checkout from "@/components/Checkout";
import { products } from "@/utils/data";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const snapUrl = "https://app.sandbox.midtrans.com/snap/snap.js";

    const clientKey = process.env.NEXT_MIDTRANS_CLIENT!;

    const script = document.createElement("script");
    script.src = snapUrl;

    script.setAttribute("data-client-key", clientKey);

    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Homepage</h1>
      {products.map((product, index) => (
        <div key={index}>
          <p>{product.id}</p>
          <p>{product.name}</p>
          <p>{product.price}</p>
          <p>{product.quantity}</p>
        </div>
      ))}
      <Checkout products={products} />
    </main>
  );
}
