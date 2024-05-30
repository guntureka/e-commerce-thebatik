import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import Image from "next/image";

export function AboutProduct() {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-[34px] mb-[140px] w-[1170px] mx-auto">
        <div>
          <Card className="w-[270px] h-[230px] rounded-none bg-white border-[1px] border-black">
            <div className=" pl-[25px] pt-[10px] pr-[30px]">
              <div className="pl-[70px]">
                <Image
                  src="/bag.png"
                  width={80}
                  height={80}
                  alt={"bag"}
                />
              </div>
              <CardHeader className="pt-[10px]">
                <CardTitle className="text-[32px] text-[#000000] font-bold text-center my-[5px]">
                  1k Meter
                </CardTitle>
                <CardDescription className="text-[#000000] text-[16px] font-medium text-center">
                  hand-printed batik cloth/month
                </CardDescription>
              </CardHeader>
            </div>
          </Card>
        </div>
        <div>
          <Card className="w-[270px] h-[230px] rounded-none bg-white border-[1px] border-black">
            <div className=" pl-[25px] pt-[10px] pr-[30px]">
              <div className="pl-[70px]">
                <Image
                  src="/bag.png"
                  width={80}
                  height={80}
                  alt={"bag"}
                />
              </div>
              <CardHeader className="pt-[10px]">
                <CardTitle className="text-[32px] text-[#000000] font-bold text-center my-[5px]">
                  300
                </CardTitle>
                <CardDescription className="text-[#000000] text-[16px] font-medium text-center">
                  stamped batik cloth/month
                </CardDescription>
              </CardHeader>
            </div>
          </Card>
        </div>
        <div>
          <Card className="w-[270px] h-[230px] rounded-none bg-white border-[1px] border-black">
            <div className=" pl-[25px] pt-[10px] pr-[30px]">
              <div className="pl-[70px]">
                <Image
                  src="/bag.png"
                  width={80}
                  height={80}
                  alt={"bag"}
                />
              </div>
              <CardHeader className="pt-[10px]">
                <CardTitle className="text-[32px] text-[#000000] font-bold text-center my-[5px]">
                  50
                </CardTitle>
                <CardDescription className="text-[#000000] text-[16px] font-medium text-center">
                  written batik cloth/month
                </CardDescription>
              </CardHeader>
            </div>
          </Card>
        </div>
        <div>
          <Card className="w-[270px] h-[230px] rounded-none bg-white border-[1px] border-black">
            <div className=" pl-[25px] pt-[10px] pr-[30px]">
              <div className="pl-[70px]">
                <Image
                  src="/bag.png"
                  width={80}
                  height={80}
                  alt={"bag"}
                />
              </div>
              <CardHeader className="pt-[10px]">
                <CardTitle className="text-[32px] text-[#000000] font-bold text-center my-[5px]">
                  100
                </CardTitle>
                <CardDescription className="text-[#000000] text-[16px] font-medium text-center">
                  boutique-quality batik clothes/month
                </CardDescription>
              </CardHeader>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
