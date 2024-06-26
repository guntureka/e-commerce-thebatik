import midtransClient from "midtrans-client";

export const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SECRET_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});
