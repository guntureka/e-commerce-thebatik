"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex flex-col justify-center items-center md:px-24 px-10 py-10 bg-black">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 w-full">
        <div>
          <Image src={"/logo-header.png"} alt="logo" width={150} height={40} />
        </div>
        <div className="flex flex-col justify-start items-start text-white gap-2">
          <h1 className="text-xl font-bold">Support</h1>
          <p className="text-sm">
            Jl. Raya Bandung Sumedang KM.21, Hegarmanah, Kec. Jatinangor,
            Kabupaten Sumedang, Jawa Barat 45363
          </p>
        </div>
        <div className="flex flex-col justify-start items-start text-white gap-2">
          <h1 className="text-xl font-bold">Link</h1>
          <Link href={"/"} className="text-sm">
            Home
          </Link>
          <Link href={"/"} className="text-sm">
            Login
          </Link>
          <Link href={"/contact-us"} className="text-sm">
            Contact Us
          </Link>
          <Link href={"/about-us"} className="text-sm">
            About Us
          </Link>
        </div>
      </div>
      <div className=" flex flex-row justify-center mt-10">
        <div className="text-white text-center">
          <p className="text-sm">© 2024 SCDB. All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
}
