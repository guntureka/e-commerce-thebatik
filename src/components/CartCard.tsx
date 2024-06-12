"use client";
import * as React from "react";

export default function CartCard({ cartItem, onUpdate, onRemove }: { cartItem: any, onUpdate: any, onRemove: any }) {
  const { id, name, price, images, quantity } = cartItem;
  const [currentQuantity, setCurrentQuantity] = React.useState(quantity);

  const subtotal = price * currentQuantity;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    setCurrentQuantity(newQuantity);
    onUpdate(id, newQuantity);
  };

  return (
    <div className="container ">
      <div className="flex justify-evenly border-2 rounded-lg py-4 ">
        <div><img src={images} alt={name} className="w-20 h-20 object-cover" /></div>
        <div><span className="text-gray-500 ml-2">{`$${price}`}</span></div>
        <div className="flex items-center">
          <button onClick={() => handleQuantityChange(currentQuantity - 1)}>-</button>
          <span className="mx-2">{currentQuantity}</span>
          <button onClick={() => handleQuantityChange(currentQuantity + 1)}>+</button>
        </div>
        <div><span className="text-gray-500 ml-2">{`$${subtotal.toFixed(2)}`}</span></div>
        <div><button onClick={() => onRemove(id)}>Remove</button></div>
      </div>
    </div>
  );
}
