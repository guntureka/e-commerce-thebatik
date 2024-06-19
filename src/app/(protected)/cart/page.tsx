"use client";
import React, { useEffect, useState } from "react";
import CartCard from "@/components/CartCard";
import { useSession } from "next-auth/react";
import { getCartByUserId } from "@/lib/actions/cart";
import { getProductById } from "@/lib/actions/product";

export default function Cart() {
  const session = useSession();
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await getCartByUserId(session.data?.user.id!);

      const products = await Promise.all(
        response?.map(async (res) => {
          const response = await getProductById(res.productId);

          return {
            id: res.id,
            name: response?.name,
            price: response?.price,
            images: response?.images,
            quantity: res.quantity,
          };
        }) || []
      );

      console.log(products);
      setCartItems(products);
    }
    fetchData();
  }, []);

  const handleUpdate = async (id: any, quantity: any) => {
    try {
      const response = await fetch(` `, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity }),
      });
      const updatedItem = await response.json();
      setCartItems((items: any[]) =>
        items.map((item) =>
          item.id === id ? { ...item, quantity: updatedItem.quantity } : item
        )
      );
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

  const handleRemove = async (id: any) => {
    try {
      await fetch(` `, {
        method: "DELETE",
      });
      setCartItems((items) => items.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error removing cart item:", error);
    }
  };

  return (
    <>
      <div className="mx-24 mt-10 mb-10">
        <h1>Home/Cart</h1>
      </div>
      <div className="container">
        <div className="flex justify-evenly border-2 rounded-lg py-4">
          <div>Products</div>
          <div>Price</div>
          <div>Quantity</div>
          <div>Subtotal</div>
        </div>
      </div>
      <div>
        {cartItems.map((cartItem, index) => (
          <div key={index} className="px-2">
            <CartCard
              cartItem={cartItem}
              onUpdate={handleUpdate}
              onRemove={handleRemove}
            />
          </div>
        ))}
      </div>
    </>
  );
}
