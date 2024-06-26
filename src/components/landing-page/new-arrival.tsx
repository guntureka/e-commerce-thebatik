"use client";
import ProductsCard from "@/components/ProductsCard";
import { stop } from "react-icons-kit/fa/stop";
import React, { useEffect, useState } from "react";
import Icon from "react-icons-kit";
import Slider from "react-slick";
import { Card } from "@/components/ui/card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Car } from "lucide-react";
export default function OurProducts() {
  const [products, setProducts] = React.useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/dummyProducts.json");
        const data = await response.json();
        setProducts(data.products);
        // Accessing the first product by default
        setSelectedProduct(data.products[0]);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchData();
  }, []);

  const handleProductSelect = (index: number) => {
    setSelectedProduct(products[index]);
  };

  return (
    <>
      <div className="container mt-10 mb-10 mx-auto">
        <div className="flex flex-col items-start gap-4 w-120 h-24  ml-40 mt-20 mx-auto">
          <div className="font-poppins font-semibold text-xl leading-5 text-left text-red-600">
            <Icon icon={stop} size={24} className="text-red" /> Featured
          </div>
          <div className="font-inter font-semibold text-3xl tracking-wide text-left ">
            New Arrivals
          </div>
        </div>
        <div className="container grid grid-cols-2 mb-4 mx-0">
          <div className="container w-96 text-white mx-40 px-24 mr-0 ml-20">
            <Card className="bg-black w-96 h-[360px] ">
              <img src="https://picsum.photos/300/202" className="mx-10" alt="" />
            </Card>
          </div>
          <div className="container text-white">
            <Card className="bg-gradient-to-r from-black to-[#d4d4d8] h-44 mb-2">
              <img src="https://picsum.photos/500/150"className="mx-10"  alt="" />
            </Card>
            <div className="grid grid-cols-2 gap-2">
              <Card className="bg-black w-70 h-44">
                <img src="https://picsum.photos/250/150" className="mx-5"  alt="" />
              </Card>
              <Card className="bg-gradient-to-br from-black to-[#d4d4d8]  w-70  h-44">
                <img src="https://picsum.photos/250/150" className="mx-5"  alt="" />
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
