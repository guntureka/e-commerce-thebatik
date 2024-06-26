import { getTransactionByUserId } from "@/actions/transaction";
import { auth } from "@/auth";
import TransactionAccountTable from "@/components/account/transaction-account-table";
import { redirect } from "next/navigation";
import React from "react";

const TransactionUserPage = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in");
  }

  const transactions = await getTransactionByUserId(session.user.id!);

  return (
    <div className="min-h-screen flex flex-col gap-4 p-4">
      <div>
        <h1 className="text-center text-4xl font-extrabold">Transactions</h1>
      </div>
      <div className="overflow-auto h-96">
        <TransactionAccountTable transactions={transactions} />
      </div>
    </div>
  );
};

export default TransactionUserPage;
