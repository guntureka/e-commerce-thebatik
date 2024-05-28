import Image from "next/image";
import Navbar from "@/components/Navbar";
import FlashSale from "@/components/FlashSale";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import Category from "@/components/Category";
import Footer from "@/components/Footer";
import NewArrival from "@/components/NewArrival";
import { Ban } from "lucide-react";
import BestSelling from "@/components/BestSelling";
import Banner from "@/components/Banner";
import OurProducts from "@/components/OurProducts";
import Enhance from "@/components/Enhance";
export default function Home() {
  return (
    <>
      <div className="relative">
        <div className="bg-black w-full h-12 flex items-center justify-between px-4">
          <div className="flex items-center gap-4 mx-auto">
            <div className="text-white font-poppins text-sm">
              Summer Sale For All Batik Suits And Free Express Delivery - OFF
              50%!
            </div>
            <div className="text-white font-poppins font-semibold text-sm underline">
              ShopNow
            </div>
          </div>
        </div>
      </div>
      <Navbar />
      <Banner />
      <FlashSale />
      <Category />
      <BestSelling />
      <Enhance />
      <OurProducts />
      <NewArrival />
      <Footer />
    
    </>
  );
}
