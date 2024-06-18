import midtransClient from "midtrans-client";

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

export const CreateTransaction = async (params) => {
  const { total_price, products } = params;

  let parameter = {
    item_details: products,
    transaction_details: {
      order_id: "order-1",
      gross_ammount: total_price,
    },
  };

  console.log(parameter);

  const token = await snap.createTransactionToken(parameter);
};
