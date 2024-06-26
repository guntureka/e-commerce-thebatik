import { handleAfterPayment } from "@/actions/midtrans";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  try {
    const data = await handleAfterPayment(body);

    return NextResponse.json({
      status: 201,
      message: "Transaction success",
      data: data,
    });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Transaction Failed" });
  }
};
