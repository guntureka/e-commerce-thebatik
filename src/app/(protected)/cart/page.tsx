"use client"
import CartCard from "@/components/CartCard";
import React, { useEffect, useState } from "react";

export default function Cart() {
  const [cart_item, setCart_item] = React.useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/dummyProducts.json");
      const data = await response.json();
      setCart_item(data.cart_item);
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="mx-24 mt-10 mb-10">
        <h1>Home/Cart</h1>
      </div>
      <div className="container ">
        <div className="flex justify-evenly border-2 rounded-lg py-4 ">
          <div>Products</div>
          <div>Price</div>
          <div>Quantity</div>
          <div>Subtotal</div>
        </div>
      </div>
      <div className="">
            {cart_item.map((cart_item, index) => (
              <div key={index} className="px-2">
                <CartCard cart_item={cart_item} />
              </div>
            ))}
        </div>
    </>
  );
}
