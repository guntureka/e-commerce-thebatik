import midtransClient from "midtrans-client";
import { NextResponse } from "next/server";

// let coreApi = new midtransClient.CoreApi({
//   isProduction: false,
//   serverKey: process.env.MIDTRANS_SECRET,
//   clientKey: process.env.NEXT_MIDTRANS_CLIENT,
// });

let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SECRET,
  clientKey: process.env.NEXT_MIDTRANS_CLIENT,
});

export const POST = async (request) => {
  const { total_price, products } = await request.json();

  // return console.log(total_price);

  let parameter = {
    item_details: products,
    transaction_details: {
      order_id: "order-5",
      gross_amount: Number(total_price),
    },
  };

  // console.log(parameter);

  const token = await snap.createTransactionToken(parameter);
  console.log(token);
  return NextResponse.json({ token });
};
