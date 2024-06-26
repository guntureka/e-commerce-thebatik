import { stop } from "react-icons-kit/fa/stop";
import React from "react";
import Icon from "react-icons-kit";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Prisma, Product } from "@prisma/client";
import ProductsCard from "./product-card";

type productWithMany = Prisma.ProductGetPayload<{
  include: {
    category: true;
  };
}>;

interface ProductsViewProps {
  products: productWithMany[] | undefined;
}

export default function ProductsView({ products }: ProductsViewProps) {
  const settings = {
    className: "center",
    dots: true,
    infinite: true,
    centerPadding: "60px",
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    rows: 2,
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
        <div className="flex flex-col items-start gap-4 w-120 h-24  ml-40 mt-20 mx-auto">
          <div className="font-poppins font-semibold text-xl leading-5 text-left text-red-600">
            <Icon icon={stop} size={24} className="text-red" /> Our Products
          </div>
          <div className="font-inter font-semibold text-3xl tracking-wide text-left ">
            Explore Our Products
          </div>
        </div>
        <div className="mx-32">
          <Slider {...settings}>
            {products &&
              products.map((product, index) => (
                <div key={index} className="px-2">
                  <ProductsCard product={product} />
                </div>
              ))}
          </Slider>
        </div>
        <div className="flex justify-center"></div>
      </div>
    </>
  );

  function SampleNextArrow(props: {
    className: string | undefined;
    style: React.CSSProperties | undefined;
    onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
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
    onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
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
