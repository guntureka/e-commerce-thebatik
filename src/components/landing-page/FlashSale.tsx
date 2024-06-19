"use client";
import ProductsCard from "../product/ProductsCard";
import { stop } from "react-icons-kit/fa/stop";
import React, { useEffect, useState } from "react";
import Icon from "react-icons-kit";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Timer from "./Timer";
import Link from "next/link";
import { getAllProducts } from "@/lib/actions/product";
import { Product } from "@prisma/client";

interface FlashsaleProps {
  products: Product[] | null | undefined;
}

export default function FlashSale({ products }: FlashsaleProps) {
  // const [products, setProducts] = React.useState([]);
  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await fetch("/dummyProducts.json");
  //     const data = await response.json();
  //     setProducts(data.products);
  //   }
  //   fetchData();
  // }, []);

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
          initialSlide: 2,
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
    <>
      <div className="container mt-10 mb-10 mx-auto">
        <div className="flex flex-col items-start gap-4 w-120 h-40  ml-40 mt-40">
          <div className="font-poppins font-semibold text-xl leading-5 text-left text-red-600">
            <Icon icon={stop} size={24} className="text-red" /> Today
          </div>
          <div className="font-inter font-semibold text-3xl leading-12 tracking-wide text-left ">
            <div className="flex gap-10">
              Flash Sales
              <Timer deadline="2025-12-31T23:59:59" />
            </div>
          </div>
        </div>
        <div className="mx-32">
          <Slider {...settings}>
            {products &&
              products?.map((product, index) => (
                <div key={index} className="px-2">
                  <ProductsCard product={product} />
                </div>
              ))}
          </Slider>
        </div>

        <div className="mt-24 flex justify-center">
          <Link href="/product">
            <button className="mt-2 bg-red-500 text-white px-4 py-2 rounded">
              View All Products
            </button>
          </Link>
        </div>
      </div>
    </>
  );

  function SampleNextArrow(props: {
    className: any;
    style: any;
    onClick: any;
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
    className: any;
    style: any;
    onClick: any;
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
