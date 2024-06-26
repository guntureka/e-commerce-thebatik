import { getAllCartByUserId } from "@/actions/cart";
import { auth } from "@/auth";
import CartView from "@/components/cart/cart-view";
import React from "react";

const CartPage = async () => {
  const session = await auth();
  const carts = await getAllCartByUserId(session?.user.id!);
  return (
    <div className="flex min-h-screen flex-col lg:px-24 px-10 py-10">
      <CartView carts={carts} />
    </div>
  );
};

export default CartPage;
