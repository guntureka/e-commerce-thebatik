import AboutPath from "@/components/about-us/aboutPath";
import { AboutProduct } from "@/components/about-us/aboutProduct";
import { Executive } from "@/components/about-us/executive";
import { OurClient } from "@/components/about-us/ourClient";
import Profile from "@/components/about-us/profile";
import { Service } from "@/components/about-us/service";


export default function AboutUsPage() {
  return (
    <main className=" bg-white">
      <AboutPath />
      <Profile />
      <AboutProduct />
      <Executive />
      <Service />
      <OurClient />
    </main>
  );
}