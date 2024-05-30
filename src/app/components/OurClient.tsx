"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

export function OurClient() {
  return (
    <div className="pb-[200px]">
      <div className="text-[54px] p-[55px] text-black font-semibold text-center">
        Our Client
      </div>
      <div className="h-[20rem] rounded-md flex flex-col antialiased bg-white items-center justify-center relative ">
        <InfiniteMovingCards items={items} direction="right" speed="slow" />
      </div>
    </div>
  );
}

const items = [
  { imageUrl: "./udjo.png" },
  { imageUrl: "./akademikebidanan.png" },
  { imageUrl: "./poltekkessemarang.png" },
  { imageUrl: "./rssentosa.png" },
  { imageUrl: "./ppks.png" },
  { imageUrl: "./toshiba.png" },
  { imageUrl: "./sminkasal.png" },
  // ... add more objects for each card
];
