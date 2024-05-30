import Image from "next/image";
import Link from "next/link";
import * as React from "react";

export default function Navbar() {
  return (
    <>
      <div className="sticky top-0">
        <div
          className="flex text-center justify-center "
          style={{ backgroundColor: "black" }}
        >
          <span className="flex text-center justify-center text-white">
            Summer Sale For All Batik Suits And Free Express Delivery - OFF 50%!
          </span>
          <a className="flex text-center justify-center text-white " href="#">
            Shop Now
          </a>
                
        </div>
        <div className="navbar bg-white">
          <div className="navbar-start pl-[135px]">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a>Home</a>
                </li>
                <li>
                  <Link href={"./about"}>About</Link>
                </li>
                <li>
                  <a>Contact</a>
                </li>
                <li>
                  <Link href={"./register"}>Sign Up</Link>
                </li>
              </ul>
            </div>
            <Image src="/logo.png" width={130} height={24} alt={"logo"} />
          </div>
          <div className="navbar-center hidden lg:flex ">
            <ul className="menu menu-horizontal px-1 text-[16px]">
              <li>
                <a>Home</a>
              </li>
              <li>
                <Link href={"./about"}>About</Link>
              </li>
              <li>
                <a>Contact</a>
              </li>
              <li>
                <Link href={"./register"}>Sign Up</Link>
              </li>
            </ul>
          </div>
          <div className="navbar-end">
            <label className="input input-bordered flex items-center gap-2 mr-[120px] bg-white border-white text-[12px]">
              <input
                type="text"
                className="grow text-[#000000]"
                placeholder="What are you looking for?"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="black"
                className="w-4 h-4 opacity-70 "
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
