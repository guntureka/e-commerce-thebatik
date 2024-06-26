"use client";

import Timer from "./timer";

export default function Enhance() {
  return (
    <>
      <div className="container bg-black w-[1170px] h-[500px] text-white">
        <div className="grid grid-cols-2">
          <div className="font-poppins font-semibold text-xl  text-[#00FF66] mx-32 mt-24">
            Categories
            <div className="text-white text-4xl font-light mt-5 mb-4">
              Enhance Your Fashion Experience
            </div>
            <div className="text-white">
              <Timer deadline="2024-12-31T23:59:59" />
            </div>
          </div>
          <div className="mx-10 mt-10">
            <img src="https://picsum.photos/473/292" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
