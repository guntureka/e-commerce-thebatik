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

type productWithMany = Prisma.ProductGetPayload<{
  include: {
    category: true;
  };
}>;

interface FlashsaleProps {
  products: productWithMany[] | undefined;
}

export default function FlashSale({ products }: FlashsaleProps) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: (
      <SampleNextArrow
        className={undefined}
        style={undefined}
        onClick={undefined}
      />
    ),
    prevArrow: (
      <SamplePrevArrow
        className={undefined}
        style={undefined}
        onClick={undefined}
      />
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          // initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div className="font-poppins font-semibold text-xl  text-left text-red-600 flex items-center gap-2">
          <Icon icon={stop} size={24} className="text-red" />
          <span>Today&apos;s</span>
        </div>
        <div className="font-inter font-semibold text-3xl tracking-wide text-left ">
          <span>Flash Sale</span>
        </div>
      </div>
      <div className="px-10 m-0">
        <Slider {...settings}>
          {products &&
            products.map((product, index) => (
              <ProductCard product={product} key={index} />
            ))}
        </Slider>
      </div>

      {/* <div className="flex justify-center">
          <Link href="/product">
            <button className="mt-2 bg-red-500 text-white px-4 py-2 rounded">
              View All Products
            </button>
          </Link>
        </div> */}
    </div>
  );

  function SampleNextArrow(props: {
    className: string | undefined;
    style: React.CSSProperties | undefined;
    onClick: React.MouseEventHandler | undefined;
  }) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "gray",
          borderRadius: "50%",
        }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props: {
    className: string | undefined;
    style: React.CSSProperties | undefined;
    onClick: React.MouseEventHandler | undefined;
  }) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "gray",
          borderRadius: "50%",
        }}
        onClick={onClick}
      />
    );
  }
}
