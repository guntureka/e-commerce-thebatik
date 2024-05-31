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

export function ContactForm() {
  return (
    <>
      <div className="flex flex-row pb-[140px] pt-[80px]">
        <div className="ml-[170px]">
          <Card className="w-[300px] h-[200px] rounded-none bg-white border-b-black border-[1px] border-l-0 border-t-0 border-r-0 pb-[32px]">
            <CardHeader className="">
              <CardTitle className="flex flex-row gap-4">
                <div>
                  <Image src="/call.png" width={40} height={40} alt={"call"} />
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
          <Card className="w-[300px] h-[130px] rounded-none bg-white border-none">
            <CardHeader className="">
              <CardTitle className="flex flex-row gap-4">
                <div>
                  <Image
                    src="/envelope.png"
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
        <div>
          <Card className="border-white ml-[30px] w-[830px] pt-[40px] ">
            <CardContent className="flex flex-col gap-5">
              <div className="flex flex-row gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="input mb-2 bg-[#F5F5F5] rounded-none w[235px] h-[50px]"
                />
                <input
                  type="text"
                  placeholder="Your Email"
                  className="input mb-2 bg-[#F5F5F5] rounded-none w[235px] h-[50px]"
                />
                <input
                  type="text"
                  placeholder="Your Phone"
                  className="input mb-2 bg-[#F5F5F5] rounded-none w[235px] h-[50px]"
                />
              </div>
              <div className="flex justify-start items-start">
                <textarea
                  placeholder="Your Message"
                  className="input mb-2 bg-[#F5F5F5] rounded-none w-full h-[207px] "
                />
              </div>
            </CardContent>
            <CardFooter className=" justify-end">
              <input
                type="submit"
                value="Send a Message"
                className="btn w-[143px] h-[46px] mb-2 bg-[#DB4444] border-none rounded-[4px] text-[#FAFAFA] text-[16px] "
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
