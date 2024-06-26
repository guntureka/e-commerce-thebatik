"use client";
// import ProductsCard from "../product/ProductsCard";
import { stop } from "react-icons-kit/fa/stop";
import React, { useEffect, useState } from "react";
import Icon from "react-icons-kit";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
// import { getAllProducts } from "@/lib/actions/product";
import { Prisma, Product } from "@prisma/client";
import Timer from "./timer";
import ProductCard from "../product/product-card";
import { useSearchParams } from "next/navigation";

type productWithMany = Prisma.ProductGetPayload<{
  include: {
    category: true;
  };
}>;

interface FlashsaleProps {
  products: productWithMany[] | undefined;
}

export default function AllProducts({ products }: FlashsaleProps) {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  let filteredProducts: productWithMany[] | undefined;

  if (category && products) {
    filteredProducts = products.filter(
      (product) => product.category.slug === category
    );
  } else {
    filteredProducts = products || undefined;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div className="font-poppins font-semibold text-xl  text-left text-red-600 flex items-center gap-2">
          <Icon icon={stop} size={24} className="text-red" />
          <span>Our Product&apos;s</span>
        </div>
        <div className="font-inter font-semibold text-3xl tracking-wide text-left ">
          <span>Check Our Product&apos;s</span>
        </div>
      </div>
      <div className="px-10 m- grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts && filteredProducts.length > 0
          ? filteredProducts.map((product, index) => (
              <ProductCard product={product} key={index} />
            ))
          : null}
      </div>
    </div>
  );
}
