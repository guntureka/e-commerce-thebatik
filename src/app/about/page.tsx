import Profile from "@/app/components/Profile";
import AboutPath from "../components/AboutPath";
import { AboutProduct } from "../components/AboutProduct";
import { Service } from "../components/Service";
import { Executive } from "../components/Executive";
import { OurClient } from "../components/OurClient";

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
