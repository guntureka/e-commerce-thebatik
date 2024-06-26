import { getTransactionById } from "@/actions/transaction";
import PaymentWindow from "@/components/transaction/payment-window";
import TransactionView from "@/components/transaction/transaction-view";
import { notFound } from "next/navigation";
import React from "react";

const CheckoutPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  console.log(params);
  const transaction = await getTransactionById(id);

  if (!transaction) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col lg:px-24 px-10 py-10">
      <div className="flex gap-5 flex-col sm:flex-row  justify-evenly items-center w-full">
        <TransactionView transactionItem={transaction.transactionItems} />
        <PaymentWindow />
      </div>
    </div>
  );
};

export default CheckoutPage;
