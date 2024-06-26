import { AboutProduct } from "@/components/about-us/aboutProduct";
import { Executive } from "@/components/about-us/executive";
import { OurClient } from "@/components/about-us/ourClient";
import Profile from "@/components/about-us/profile";
import { Service } from "@/components/about-us/service";
import Image from "next/image";
import React from "react";

const AboutusPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between gap-40 lg:p-24 p-10">
      <Profile />
      <AboutProduct />
      <Executive />
      <Service />
      <OurClient />
    </main>
  );
};

export default AboutusPage;
