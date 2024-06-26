"use client";
import * as React from "react";
import Icon from "react-icons-kit";
import { stop } from "react-icons-kit/fa/stop";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card, CardContent } from "@/components/ui/card";
import { Category } from "@prisma/client";
import Link from "next/link";

interface CategoryProps {
  categories: Category[] | undefined;
}

export default function CategoryComponent({ categories }: CategoryProps) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
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
    <div className="">
      <div className="flex flex-col gap-4">
        <div className="font-poppins font-semibold text-xl  text-left text-red-600">
          <Icon icon={stop} size={24} className="text-red" />
          <span>Categories</span>
        </div>
        <div className="font-inter font-semibold text-3xl tracking-wide text-left ">
          Categories
        </div>
      </div>
      <div className="px-10 m-0">
        <Slider {...settings}>
          {categories &&
            categories.map((category) => (
              <Card className="border-none shadow-none" key={category.id}>
                <CardContent className="h-20 flex flex-col justify-center  m-0 p-0">
                  <Link
                    href={`?category=${category.slug!}`}
                    className="flex justify-center"
                  >
                    {category.name}
                    <p>{category.description}</p>
                  </Link>
                </CardContent>
              </Card>
            ))}
        </Slider>
      </div>
    </div>
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
