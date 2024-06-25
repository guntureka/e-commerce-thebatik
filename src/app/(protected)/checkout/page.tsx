"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CartCard from "@/components/CartCard";
import Image from "next/image";

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First Name must be at least 2 characters.",
  }),
  streetAddress: z.string().min(2, {
    message: "Street Address must be at least 2 characters.",
  }),
  apartment: z.string().optional(),
  city: z.string().min(2, {
    message: "Town/City must be at least 2 characters.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Phone Number must be at least 10 digits.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
});

export default function Checkout() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      streetAddress: "",
      apartment: "",
      city: "",
      phoneNumber: "",
      email: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(" "); //
      const data = await response.json();
      setCartItems(data);
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
      <div className="mx-24">
        <div className="font-[14px] my-10">
          <h1>
            Account / My Account / Product / View Cart /{" "}
            <span className="font-semibold">CheckOut</span>
          </h1>
        </div>
        <div className="pb-[140px] grid grid-cols-2 mx-auto justify-center">
          <div className="mt-20">
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
          </div>
          <div className="w-100 mt-[160px] mx-24">
            <div className="flex flex-row justify-between py-4 border-b-[1px] border-b-black">
              <p>Subtotal: </p>
              <p>$1750</p>
            </div>
            <div className="flex flex-row justify-between py-4 border-b-[1px] border-b-black">
              <p>Shipping: </p>
              <p>Free</p>
            </div>
            <div className="flex flex-row justify-between py-4">
              <p>Total:</p>
              <p>$1750</p>
            </div>
            <RadioGroup defaultValue="comfortable" className="gap-8 mb-8">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="default" id="r1" />
                <Label htmlFor="r1">Bank</Label>
                <div className="grid grid-cols-2 mx-auto items-center gap-2">
                  <Image
                    src={"/checkout/visa.png"}
                    alt="visa"
                    width={30}
                    height={0}
                    className="w-full"
                  />
                  <Image
                    src={"/checkout/mastercard.png"}
                    alt="mastercard"
                    width={30}
                    height={0}
                    className="w-full"
                  />
                </div>
              </div>
            </RadioGroup>
            <Button
              type="submit"
              variant={"destructive"}
              // disabled={isPending}
              className={"w-full"}
            >
              Place Order
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
