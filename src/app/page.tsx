import Image from "next/image";
import Navbar from "@/components/navigational-bar";
import FlashSale from "@/components/landing-page/FlashSale";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import Category from "@/components/landing-page/Category";
import Footer from "@/components/Footer";
import NewArrival from "@/components/landing-page/NewArrival";
import { Ban } from "lucide-react";
import BestSelling from "@/components/landing-page/BestSelling";
import Banner from "@/components/landing-page/Banner";
import OurProducts from "@/components/landing-page/OurProducts";
import Enhance from "@/components/landing-page/Enhance";
import { getAllProducts } from "@/lib/actions/product";
export default async function Home() {
  const products = await getAllProducts();

  return (
    <>
      <Banner />
      <FlashSale products={products} />
      <Category />
      <BestSelling />
      <Enhance />
      <OurProducts />
      <NewArrival />
    </>
  );
}
