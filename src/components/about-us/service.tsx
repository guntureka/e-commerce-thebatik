import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export function Service() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto gap-10 items-center">
      <Card className="shadow-none rounded-none bg-white border-none">
        <div className="">
          <div className="pl-[115px]">
            <Image
              src="/about/delivery.png"
              width={80}
              height={80}
              alt={"delivery"}
            />
          </div>
          <CardHeader className="pt-[20px]">
            <CardTitle className="text-[20px] text-[#000000] font-bold text-center">
              FREE AND FAST DELIVERY
            </CardTitle>
            <CardDescription className="text-[#000000] text-[14px] font-medium text-center">
              Free delivery for all orders over $140
            </CardDescription>
          </CardHeader>
        </div>
      </Card>
      <Card className="shadow-none rounded-none bg-white border-none">
        <div className="">
          <div className="pl-[115px]">
            <Image src="/about/cs.png" width={80} height={80} alt={"cs"} />
          </div>
          <CardHeader className="pt-[20px]">
            <CardTitle className="text-[20px] text-[#000000] font-bold text-center">
              24/7 CUSTOMER SERVICE
            </CardTitle>
            <CardDescription className="text-[#000000] text-[14px] font-medium text-center">
              Friendly 24/7 customer support
            </CardDescription>
          </CardHeader>
        </div>
      </Card>
      <Card className="shadow-none rounded-none bg-white border-none">
        <div className="">
          <div className="pl-[115px]">
            <Image
              src="/about/moneyback.png"
              width={80}
              height={80}
              alt={"moneyback"}
            />
          </div>
          <CardHeader className="pt-[20px]">
            <CardTitle className="text-[20px] text-[#000000] font-bold text-center">
              MONEY BACK GUARANTEE
            </CardTitle>
            <CardDescription className="text-[#000000] text-[14px] font-medium text-center">
              We return money within 30 days
            </CardDescription>
          </CardHeader>
        </div>
      </Card>
    </div>
  );
}
