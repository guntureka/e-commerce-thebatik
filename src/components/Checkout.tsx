"use client";

import { CreateTransaction } from "@/utils/midtrans";
import React, { useEffect } from "react";

type products = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

const Checkout = ({ products }: { products: products[] }) => {
  let total_price = 0;

  products.map((product, index) => {
    total_price += product.price * product.quantity;
  });

  const data = {
    total_price: total_price,
    products: products,
  };

  const handleCheckout = async () => {
    const res = await fetch("/api/midtrans", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const req = await res.json();

    (window as any).snap.pay(req.token, {
      onSuccess: (result: any) => {
        alert("payment success!");
        console.log(result);
      },
    });
  };

  console.log(total_price);
  return (
    <div>
      <button
        onClick={() => {
          handleCheckout();
        }}
      >
        Checkout
      </button>
    </div>
  );
};

export default Checkout;
