"use client";
import React, { useEffect, useState } from "react";
import ProductsCard from "@/components/ProductsCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Icon from "react-icons-kit";
import { stop } from "react-icons-kit/fa/stop";
export default function wishlist() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/dummyProducts.json");
      const data = await response.json();
      setProducts(data.products);
    }
    fetchData();
  }, []);

  const settings = {
    className: "center",
    dots: true,
    infinite: true,
    centerPadding: "60px",
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    rows: 1,
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
        <div className="flex flex-col gap-4 w-120 h-24  ml-40 mt-20 mx-auto">
          <div className="font-poppins font-semibold text-xl leading-5 text-left text-black">
            Wishlist
          </div>
          <div className="flex flex-row-reverse mx-20">
            <button className="mt-2 bg-white text-black px-4 py-2 rounded-md border-2">
              View All Products
            </button>
          </div>
        </div>
        <div className="mx-32">
          <Slider {...settings}>
            {products.map((product, index) => (
              <div key={index} className="px-2">
                <ProductsCard product={product} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div className="container mt-10 mb-10 mx-auto">
        <div className="flex flex-col gap-4 w-120 h-24  ml-40 mt-20 mx-auto">
          <div className="font-poppins font-semibold text-xl leading-5 text-left text-red-600">
            <Icon icon={stop} size={24} className="text-red" /> Just For You
          </div>
          <div className="flex flex-row-reverse mx-20">
            <button className="mt-2 bg-white text-black px-4 py-2 rounded-md border-2">
              See All
            </button>
          </div>
        </div>
        <div className="mx-32">
          <Slider {...settings}>
            {products.map((product, index) => (
              <div key={index} className="px-2">
                <ProductsCard product={product} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}

function SampleNextArrow(props: { className: any; style: any; onClick: any }) {
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

function SamplePrevArrow(props: { className: any; style: any; onClick: any }) {
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
