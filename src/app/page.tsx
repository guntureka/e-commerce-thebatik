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
      <Banner />
      <FlashSale />
      <Category />
      <BestSelling />
      <Enhance />
      <OurProducts />
      <NewArrival />
      
    
    </>
  );
}
