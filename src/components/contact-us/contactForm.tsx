import * as React from "react";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ContactForm() {
  return (
    <div className="flex flex-col lg:flex-row w-full gap-20">
      <div>
        <Card className="shadow-none rounded-none bg-white border-b-black border-[1px] border-l-0 border-t-0 border-r-0">
          <CardHeader className="">
            <CardTitle className="flex flex-row gap-4">
              <div>
                <Image
                  src="/contact-us/call.png"
                  width={40}
                  height={40}
                  alt={"call"}
                />
              </div>
              <div className="text-[16px] text-black content-center">
                Call To Us
              </div>
            </CardTitle>
          </CardHeader>
          <CardFooter className="text-[14px]">
            We are available 24/7, 7 days a week.
            <br />
            <br />
            Phone: +8801611112222
          </CardFooter>
        </Card>
        <Card className="shadow-none rounded-none bg-white border-none">
          <CardHeader className="">
            <CardTitle className="flex flex-row gap-4">
              <div>
                <Image
                  src="/contact-us/envelope.png"
                  width={40}
                  height={40}
                  alt={"envelope"}
                />
              </div>
              <div className="text-[16px] text-black content-center">
                Write To Us
              </div>
            </CardTitle>
          </CardHeader>
          <CardFooter className="text-[14px]">
            Fill out our form and we will contact you within 24 hours.
            <br />
            <br />
            Emails: customer@exclusive.com
            <br />
            <br />
            Emails: support@exclusive.com
          </CardFooter>
        </Card>
      </div>
      <div className="w-full">
        <Card className="border-white shadow-none">
          <CardContent className="flex flex-col gap-5">
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <input
                type="text"
                placeholder="Your Name"
                className="input p-2 bg-[#F5F5F5] rounded-none w-full"
              />
              <input
                type="text"
                placeholder="Your Email"
                className="input p-2 bg-[#F5F5F5] rounded-none w-full"
              />
              <input
                type="text"
                placeholder="Your Phone"
                className="input p-2 bg-[#F5F5F5] rounded-none w-full"
              />
            </div>
            <div className="flex justify-start items-start">
              <textarea
                placeholder="Your Message"
                className="input p-2 bg-[#F5F5F5] rounded-none w-full h-[207px] "
              />
            </div>
          </CardContent>
          <CardFooter className=" justify-end">
            <input
              type="submit"
              value="Send a Message"
              className="btn w-[143px] h-[46px] p-2 bg-[#DB4444] border-none rounded-[4px] text-[#FAFAFA] text-[16px] "
            />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
