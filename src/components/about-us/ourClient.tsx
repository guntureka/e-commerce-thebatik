"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";

export function OurClient() {
  return (
    <div className="">
      <div className="text-[54px]  text-black font-semibold text-center">
        Our Client
      </div>
      <div className="h-[20rem] rounded-md flex flex-col antialiased bg-white items-center justify-center relative ">
        <InfiniteMovingCards items={items} direction="right" speed="slow" />
      </div>
    </div>
  );
}

const items = [
  { imageUrl: "./about/udjo.png" },
  { imageUrl: "./about/akademikebidanan.png" },
  { imageUrl: "./about/poltekkessemarang.png" },
  { imageUrl: "./about/rssentosa.png" },
  { imageUrl: "./about/ppks.png" },
  { imageUrl: "./about/toshiba.png" },
  { imageUrl: "./about/sminkasal.png" },
  // ... add more objects for each card
];
