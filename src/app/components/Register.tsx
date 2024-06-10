import * as React from "react";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import Link from "next/link";

export function Register() {
  return (
    <div className="flex flex-row ">
      <div>
        <Image src="/logreg.png" width={1200} height={0} alt={"logreg"} />
      </div>
      <div>
        <Card className="border-white ml-[130px] mt-[50px]">
          <CardHeader>
            <CardTitle>Create an Account</CardTitle>
            <CardDescription>Enter your details below</CardDescription>
          </CardHeader>
          <CardContent>
            <input
              type="text"
              placeholder="Name"
              className="input mb-2 bg-white text-black border-b-1 border-b-black rounded-none p-0 w-full max-w-xs"
            />
            <input
              type="text"
              placeholder="Email or Phone Number"
              className="input mb-2 bg-white text-black border-b-1 border-b-black rounded-none p-0 w-full max-w-xs"
            />
            <input
              type="password"
              placeholder="Password"
              className="input mb-2 bg-white text-black border-b-1 border-b-black rounded-none p-0 w-full max-w-xs"
            />
          </CardContent>
          <CardFooter className="flex flex-col mr-[120px]">
            <input
              type="submit"
              value="Create Account"
              className="btn w-[300px] h-[46px] mb-2 bg-[#DB4444] text-[#FAFAFA] text-[16px]"
            />
            <button
              type="button"
              className="text-black w-[300px] h-[46px] border-[1px] border-black bg-white hover:bg-[#4285F4]/90 hover:text-white text-[16px] font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center mb-2"
            >
              <svg
                className="mr-2 -ml-1 w-4 h-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              Sign up with Google<div></div>
            </button>
            <div
              className="flex text-center justify-center "
              style={{ backgroundColor: "white" }}
            >
              <span className="flex text-center justify-center text-[##000000]">
                Already have account?
              </span>
              <Link
                className="flex text-center justify-center text-[##000000] hover:underline "
                href={"./login"}
              >
                {" "}Log in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
