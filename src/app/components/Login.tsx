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

export function Login() {
  return (
    <div className="flex flex-row ">
      <div>
        <Image src="/logreg.png" width={919} height={0} alt={"logreg"} />
      </div>
      <div>
        <Card className="border-white ml-[130px] mt-[100px]">
          <CardHeader>
            <CardTitle>Log in to Exclusive</CardTitle>
            <CardDescription>Enter your details below</CardDescription>
          </CardHeader>
          <CardContent className="">
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
          <CardFooter className="flex flex-row">
            <input
              type="submit"
              value="Log in"
              className="btn w-[143px] h-[46px] mb-2 bg-[#DB4444] text-[#FAFAFA] text-[16px]"
            />
            <div
              className="flex text-right justify-end ml-7"
              style={{ backgroundColor: "white" }}
            >
              <a
                className="flex text-right justify-end text-[#DB4444] hover:underline "
                href="#"
              >
                Forget Password?
              </a>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
