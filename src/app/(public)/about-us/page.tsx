import Profile from "@/components/about-us/profile";
import Image from "next/image";
import React from "react";

const AboutusPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between lg:p-24 p-10">
      <Profile />
      <Image
        src={
          "https://nefugoazkvksizyotlwa.supabase.co/storage/v1/object/public/assets/2019_04_01%2009.53%20Office%20Lens.jpg"
        }
        alt=""
        width={300}
        height={300}
      />
    </main>
  );
};

export default AboutusPage;
