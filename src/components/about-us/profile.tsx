import Image from "next/image";
import * as React from "react";

export default function Profile() {
  return (
    <>
      <div className="grid grid-col-1 md:grid-cols-2 justify-center gap-10">
        {/* <div className="flex flex-col-reverse md:flex-row justify-center gap-10"> */}
        <div className="">
          <h2 className="text-[#1F204C] font-bold text-[30px]">Our Story</h2>
          <br />
          <p className="text-justify text-[#666666] text-[20px]">
            THEBATIK - Yogyakarta, or Nageri Ngayogyakarta Hadiningrat, cannot
            be separated from the long history of batik development in
            Indonesia. As one of the centers of civilization on the island of
            Java, Yogyakarta not only gave birth to a generation of thinkers,
            cultural figures and artists, but also batik culture as a cultural
            identity. Various symbols, philosophies, and mythologies that are
            reflected in the richness of Yogyakarta batik motifs have inspired
            the birth of various other batik motifs in Indonesia.
            <br />
            <br />
            This is also what inspired us to present to you classic Yogyakarta
            batik, not only as the root of batik culture in Indonesia, but also
            as a living art form.
          </p>
        </div>
        <div className="h-full">
          <Image
            src="/profile.png"
            width={705}
            height={609}
            alt={"profile"}
            className="object-cover h-full"
          />
        </div>
      </div>
    </>
  );
}
