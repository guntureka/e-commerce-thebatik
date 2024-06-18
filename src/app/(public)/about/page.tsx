import AboutPath from "@/components/about/aboutPath";
import { AboutProduct } from "@/components/about/aboutProduct";
import { Executive } from "@/components/about/executive";
import { OurClient } from "@/components/about/ourClient";
import Profile from "@/components/about/profile";
import { Service } from "@/components/about/service";


export default function LoginPage() {
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