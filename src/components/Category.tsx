"use client";
import * as React from "react";
import Icon from "react-icons-kit";
import { stop } from "react-icons-kit/fa/stop";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card,CardContent } from "./ui/card";

interface Category {
  id: number;
  name: string;
  description: string;
}

export default function Category() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("/dummyCategory.json");
        const data: { category: Category[] } = await response.json();
        setCategories(data.category);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

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
    <>
      <div className="container mb-10 mx-auto border-y">
        <div className="flex flex-col items-start gap-4 w-120 h-40  ml-40 mt-20">
          <div className="font-poppins font-semibold text-xl leading-5 text-left text-red-600">
            <Icon icon={stop} size={24} className="text-red" /> Categories
          </div>
          <div className="font-inter font-semibold text-3xl leading-12 tracking-wide text-left ">
            Categories
          </div>
        </div>
        <div className="mx-32">
          <Slider {...settings}>
            {categories.map((category) => (
              <div key={category.id}>
                <Card className="border-none shadow-none">
                  <CardContent>
                    <div className="flex flex-col items-center">
                      <div className="text-center">
                        <h3 className="text-lg font-semibold">{category.name}</h3>
                        <p className="text-gray-500">{category.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </Slider>
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
