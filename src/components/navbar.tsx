import exp from "constants";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { Card, CardTitle, CardContent, CardHeader } from "./ui/card";
import { Icon } from "react-icons-kit";
import { heartO } from "react-icons-kit/fa/heartO";
import { shoppingCart } from "react-icons-kit/fa/shoppingCart";
export default function Navbar() {
  return (
    <div className="flex justify-center items-center mt-10 border-b-2 pb-4">
      <div className="flex items-center justify-items-center	">
        <div className="flex items-center gap-10 mx-20">
          <img src="/thebatik-coid.svg" alt="logo" className="mx-10" />
          <div className="flex gap-10">
            <div className="flex flex-col items-center">
              <div className="font-poppins font-normal text-[16px] leading-[24px] text-black">
                <a href="/Home">Home</a>
              </div>
            </div>
            <div className="font-poppins font-normal text-[16px] leading-[24px] text-black">
            <a href="/Contact">Contact</a>
            </div>
            <div className="font-poppins font-normal text-[16px] leading-[24px] text-black">
            <a href="/About">About</a>
            </div>
            <div className="font-poppins font-normal text-[16px] leading-[24px] text-black">
            <a href="/Signup">Sign Up</a>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center px-5 py-2 gap-10 bg-gray-200 rounded-md w-50">
          <div className="relative w-full">
            <input
              type="search"
              name="product"
              id="product"
              placeholder="What are you looking for?"
              className="w-full h-full bg-transparent outline-none text-black placeholder-opacity-50 pl-10 pr-10"
            />
            <button
              type="submit"
              className="absolute inset-y-0 right-0 flex items-center px-2"
            >
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35m-3.65 0A7 7 0 1114 7a7 7 0 01-2.6 10.65z"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <div className="flex gap-3 mx-4">
            <a href="/wishlist">
              <Icon icon={heartO} size={24} className="text-gray-600" />
            </a>

            <a href="/cart">
              <Icon icon={shoppingCart} size={24} className="text-gray-600" />
            </a>
        </div>
      </div>
    </div>
  );
}
